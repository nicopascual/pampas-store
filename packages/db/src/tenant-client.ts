import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../prisma/generated/client";
import { getRootLogger } from "@pampas-store/logger";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const logger = getRootLogger();

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connection pool configuration
const MAX_POOL_SIZE = 100;
const IDLE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

// Data directory for local SQLite files (packages/db/src -> project root)
const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, "../../../data/stores");

interface TenantConnection {
	client: PrismaClient;
	lastAccess: number;
}

// Connection pool
const tenantClients = new Map<string, TenantConnection>();

export interface StoreConnectionInfo {
	storeId: string;
	slug: string;
	// For cloud (Turso)
	databaseUrl?: string | null;
	databaseToken?: string | null;
	// For local
	isLocal?: boolean;
}

/**
 * Get or create a Prisma client for a specific store.
 * Connections are pooled and reused for performance.
 */
export function getStorePrismaClient(info: StoreConnectionInfo): PrismaClient {
	const cached = tenantClients.get(info.storeId);
	if (cached) {
		cached.lastAccess = Date.now();
		logger.debug(
			{
				category: "database",
				storeId: info.storeId,
				storeSlug: info.slug,
				poolSize: tenantClients.size,
			},
			"Database connection pool cache hit",
		);
		return cached.client;
	}

	logger.info(
		{
			category: "database",
			storeId: info.storeId,
			storeSlug: info.slug,
			isLocal: info.isLocal,
			poolSize: tenantClients.size,
		},
		"Creating new tenant database connection",
	);

	// Evict oldest connection if at capacity
	if (tenantClients.size >= MAX_POOL_SIZE) {
		logger.warn(
			{
				category: "database",
				poolSize: tenantClients.size,
				maxSize: MAX_POOL_SIZE,
			},
			"Connection pool at capacity, evicting oldest connection",
		);
		evictOldestConnection();
	}

	let adapter: PrismaLibSql;

	if (info.isLocal || !info.databaseUrl) {
		// LOCAL: Use file-based SQLite
		const dbPath = path.join(DATA_DIR, `${info.slug}.db`);

		// Ensure directory exists
		fs.mkdirSync(DATA_DIR, { recursive: true });

		logger.debug(
			{
				category: "database",
				storeId: info.storeId,
				storeSlug: info.slug,
				dbPath,
			},
			"Using local SQLite database",
		);

		adapter = new PrismaLibSql({
			url: `file:${dbPath}`,
		});
	} else {
		// CLOUD: Use Turso/libSQL remote
		logger.debug(
			{
				category: "database",
				storeId: info.storeId,
				storeSlug: info.slug,
			},
			"Using Turso cloud database",
		);

		adapter = new PrismaLibSql({
			url: info.databaseUrl,
			authToken: info.databaseToken ?? undefined,
		});
	}

	const client = new PrismaClient({ adapter });

	tenantClients.set(info.storeId, {
		client,
		lastAccess: Date.now(),
	});

	logger.info(
		{
			category: "database",
			storeId: info.storeId,
			storeSlug: info.slug,
			poolSize: tenantClients.size,
		},
		"Tenant database connection created",
	);

	return client;
}

/**
 * Evict the least recently used connection from the pool.
 */
function evictOldestConnection(): void {
	let oldestKey: string | null = null;
	let oldestTime = Infinity;

	for (const [key, value] of tenantClients.entries()) {
		if (value.lastAccess < oldestTime) {
			oldestTime = value.lastAccess;
			oldestKey = key;
		}
	}

	if (oldestKey) {
		const entry = tenantClients.get(oldestKey);
		if (entry) {
			logger.info(
				{
					category: "database",
					storeId: oldestKey,
					idleMs: Date.now() - entry.lastAccess,
					poolSize: tenantClients.size - 1,
				},
				"Evicting LRU tenant database connection",
			);
			entry.client.$disconnect();
		}
		tenantClients.delete(oldestKey);
	}
}

/**
 * Disconnect all tenant clients (for graceful shutdown).
 */
export async function disconnectAllTenants(): Promise<void> {
	const disconnectPromises = Array.from(tenantClients.values()).map(
		async (entry) => {
			await entry.client.$disconnect();
		},
	);
	await Promise.all(disconnectPromises);
	tenantClients.clear();
}

/**
 * Get the number of active connections in the pool.
 */
export function getPoolSize(): number {
	return tenantClients.size;
}

// Cleanup idle connections every minute
const cleanupInterval = setInterval(() => {
	const now = Date.now();
	let evictedCount = 0;

	for (const [key, value] of tenantClients.entries()) {
		if (now - value.lastAccess > IDLE_TIMEOUT_MS) {
			logger.debug(
				{
					category: "database",
					storeId: key,
					idleMs: now - value.lastAccess,
				},
				"Cleaning up idle tenant connection",
			);
			value.client.$disconnect();
			tenantClients.delete(key);
			evictedCount++;
		}
	}

	if (evictedCount > 0) {
		logger.info(
			{
				category: "database",
				evictedCount,
				remainingConnections: tenantClients.size,
			},
			"Periodic cleanup completed",
		);
	}
}, 60000);

// Don't prevent process from exiting
cleanupInterval.unref?.();
