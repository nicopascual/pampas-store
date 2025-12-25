import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getRootLogger } from "@pampas-store/logger";
import path from "node:path";
import fs from "node:fs";

const execAsync = promisify(exec);
const DATA_DIR = process.env.DATA_DIR || path.resolve("./data/stores");
const logger = getRootLogger();

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
		const startTime = Date.now();
		const dbPath = path.join(DATA_DIR, `${slug}.db`);

		logger.info(
			{
				category: "business",
				storeSlug: slug,
				dbPath,
				type: "local",
			},
			"Starting local store provisioning",
		);

		// Ensure directory exists
		fs.mkdirSync(DATA_DIR, { recursive: true });

		// Apply Prisma schema to new database
		// Note: This runs from the server's working directory
		try {
			await execAsync(
				`DATABASE_URL="file:${dbPath}" bunx prisma db push --skip-generate`,
				{
					cwd: path.resolve("../packages/db"),
					env: { ...process.env, DATABASE_URL: `file:${dbPath}` },
				},
			);

			const latencyMs = Date.now() - startTime;
			logger.info(
				{
					category: "business",
					storeSlug: slug,
					latencyMs,
					type: "local",
				},
				"Local store provisioning completed",
			);

			return { isLocal: true };
		} catch (error) {
			logger.error(
				{
					category: "business",
					storeSlug: slug,
					err: error,
					type: "local",
				},
				"Local store provisioning failed",
			);
			throw error;
		}
	}

	/**
	 * Provision a Turso database for a new store (cloud deployment).
	 * Requires TURSO_API_TOKEN and TURSO_ORG environment variables.
	 */
	async provisionTursoStore(slug: string): Promise<ProvisionResult> {
		const startTime = Date.now();
		const dbName = `pampas-${slug}`;
		const tursoOrg = process.env.TURSO_ORG;
		const tursoApiToken = process.env.TURSO_API_TOKEN;

		logger.info(
			{
				category: "business",
				storeSlug: slug,
				dbName,
				type: "turso",
			},
			"Starting Turso store provisioning",
		);

		if (!tursoOrg || !tursoApiToken) {
			logger.error(
				{
					category: "business",
					storeSlug: slug,
					type: "turso",
				},
				"Turso provisioning failed: missing environment variables",
			);
			throw new Error(
				"Turso provisioning requires TURSO_ORG and TURSO_API_TOKEN environment variables",
			);
		}

		try {
			// Create database using Turso API
			logger.debug(
				{
					category: "business",
					storeSlug: slug,
					dbName,
				},
				"Creating Turso database",
			);

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
				logger.error(
					{
						category: "business",
						storeSlug: slug,
						status: createResponse.status,
						error,
					},
					"Turso database creation failed",
				);
				throw new Error(`Failed to create Turso database: ${error}`);
			}

			const dbInfo = (await createResponse.json()) as {
				database: { hostname: string };
			};

			logger.debug(
				{
					category: "business",
					storeSlug: slug,
					hostname: dbInfo.database.hostname,
				},
				"Turso database created, generating auth token",
			);

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
				logger.error(
					{
						category: "business",
						storeSlug: slug,
						status: tokenResponse.status,
						error,
					},
					"Turso auth token creation failed",
				);
				throw new Error(`Failed to create Turso auth token: ${error}`);
			}

			const tokenInfo = (await tokenResponse.json()) as { jwt: string };

			const latencyMs = Date.now() - startTime;
			logger.info(
				{
					category: "business",
					storeSlug: slug,
					latencyMs,
					type: "turso",
				},
				"Turso store provisioning completed",
			);

			return {
				isLocal: false,
				databaseUrl: `libsql://${dbInfo.database.hostname}`,
				databaseToken: tokenInfo.jwt,
			};
		} catch (error) {
			logger.error(
				{
					category: "business",
					storeSlug: slug,
					err: error,
					type: "turso",
				},
				"Turso store provisioning failed",
			);
			throw error;
		}
	}

	/**
	 * Delete a local store database.
	 */
	async deleteLocalStore(slug: string): Promise<void> {
		const dbPath = path.join(DATA_DIR, `${slug}.db`);
		const walPath = `${dbPath}-wal`;
		const shmPath = `${dbPath}-shm`;

		logger.info(
			{
				category: "business",
				storeSlug: slug,
				type: "local",
			},
			"Deleting local store database",
		);

		// Remove database file and WAL files if they exist
		let deletedFiles = 0;
		for (const file of [dbPath, walPath, shmPath]) {
			if (fs.existsSync(file)) {
				fs.unlinkSync(file);
				deletedFiles++;
			}
		}

		logger.info(
			{
				category: "business",
				storeSlug: slug,
				deletedFiles,
				type: "local",
			},
			"Local store database deleted",
		);
	}

	/**
	 * Delete a Turso store database.
	 */
	async deleteTursoStore(slug: string): Promise<void> {
		const dbName = `pampas-${slug}`;
		const tursoOrg = process.env.TURSO_ORG;
		const tursoApiToken = process.env.TURSO_API_TOKEN;

		logger.info(
			{
				category: "business",
				storeSlug: slug,
				dbName,
				type: "turso",
			},
			"Deleting Turso store database",
		);

		if (!tursoOrg || !tursoApiToken) {
			logger.error(
				{
					category: "business",
					storeSlug: slug,
					type: "turso",
				},
				"Turso deletion failed: missing environment variables",
			);
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
			logger.error(
				{
					category: "business",
					storeSlug: slug,
					status: response.status,
					error,
					type: "turso",
				},
				"Turso database deletion failed",
			);
			throw new Error(`Failed to delete Turso database: ${error}`);
		}

		logger.info(
			{
				category: "business",
				storeSlug: slug,
				status: response.status,
				type: "turso",
			},
			"Turso store database deleted",
		);
	}
}

// Singleton instance
export const storeProvisioning = new StoreProvisioningService();
