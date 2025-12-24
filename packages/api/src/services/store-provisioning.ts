import { exec } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";

const execAsync = promisify(exec);
const DATA_DIR = process.env.DATA_DIR || path.resolve("./data/stores");

export interface ProvisionResult {
	isLocal: boolean;
	databaseUrl?: string;
	databaseToken?: string;
}

export class StoreProvisioningService {
	/**
	 * Provision a local SQLite database for a new store.
	 * Creates the database file and applies the Prisma schema.
	 */
	async provisionLocalStore(slug: string): Promise<ProvisionResult> {
		const dbPath = path.join(DATA_DIR, `${slug}.db`);

		// Ensure directory exists
		fs.mkdirSync(DATA_DIR, { recursive: true });

		// Apply Prisma schema to new database
		// Note: This runs from the server's working directory
		await execAsync(
			`DATABASE_URL="file:${dbPath}" bunx prisma db push --skip-generate`,
			{
				cwd: path.resolve("../packages/db"),
				env: { ...process.env, DATABASE_URL: `file:${dbPath}` },
			},
		);

		return { isLocal: true };
	}

	/**
	 * Provision a Turso database for a new store (cloud deployment).
	 * Requires TURSO_API_TOKEN and TURSO_ORG environment variables.
	 */
	async provisionTursoStore(slug: string): Promise<ProvisionResult> {
		const dbName = `pampas-${slug}`;
		const tursoOrg = process.env.TURSO_ORG;
		const tursoApiToken = process.env.TURSO_API_TOKEN;

		if (!tursoOrg || !tursoApiToken) {
			throw new Error(
				"Turso provisioning requires TURSO_ORG and TURSO_API_TOKEN environment variables",
			);
		}

		// Create database using Turso API
		const createResponse = await fetch(
			`https://api.turso.tech/v1/organizations/${tursoOrg}/databases`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${tursoApiToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: dbName,
					schema: process.env.TURSO_SCHEMA_DB,
				}),
			},
		);

		if (!createResponse.ok) {
			const error = await createResponse.text();
			throw new Error(`Failed to create Turso database: ${error}`);
		}

		const dbInfo = (await createResponse.json()) as {
			database: { hostname: string };
		};

		// Create auth token for the database
		const tokenResponse = await fetch(
			`https://api.turso.tech/v1/organizations/${tursoOrg}/databases/${dbName}/auth/tokens`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${tursoApiToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					expiration: "never",
					authorization: "full-access",
				}),
			},
		);

		if (!tokenResponse.ok) {
			const error = await tokenResponse.text();
			throw new Error(`Failed to create Turso auth token: ${error}`);
		}

		const tokenInfo = (await tokenResponse.json()) as { jwt: string };

		return {
			isLocal: false,
			databaseUrl: `libsql://${dbInfo.database.hostname}`,
			databaseToken: tokenInfo.jwt,
		};
	}

	/**
	 * Delete a local store database.
	 */
	async deleteLocalStore(slug: string): Promise<void> {
		const dbPath = path.join(DATA_DIR, `${slug}.db`);
		const walPath = `${dbPath}-wal`;
		const shmPath = `${dbPath}-shm`;

		// Remove database file and WAL files if they exist
		for (const file of [dbPath, walPath, shmPath]) {
			if (fs.existsSync(file)) {
				fs.unlinkSync(file);
			}
		}
	}

	/**
	 * Delete a Turso store database.
	 */
	async deleteTursoStore(slug: string): Promise<void> {
		const dbName = `pampas-${slug}`;
		const tursoOrg = process.env.TURSO_ORG;
		const tursoApiToken = process.env.TURSO_API_TOKEN;

		if (!tursoOrg || !tursoApiToken) {
			throw new Error(
				"Turso deletion requires TURSO_ORG and TURSO_API_TOKEN environment variables",
			);
		}

		const response = await fetch(
			`https://api.turso.tech/v1/organizations/${tursoOrg}/databases/${dbName}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${tursoApiToken}`,
				},
			},
		);

		if (!response.ok && response.status !== 404) {
			const error = await response.text();
			throw new Error(`Failed to delete Turso database: ${error}`);
		}
	}
}

// Singleton instance
export const storeProvisioning = new StoreProvisioningService();
