import { PrismaClient } from "../prisma-platform/generated/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { getRootLogger } from "@pampas-store/logger";
import path from "node:path";
import { fileURLToPath } from "node:url";

const logger = getRootLogger();

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Support both local and cloud platform database
const isCloud = process.env.PLATFORM_DATABASE_URL?.startsWith("libsql://");
// Resolve to project root data directory (packages/db/src -> project root)
const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, "../../../data");

const platformDbUrl = isCloud
	? process.env.PLATFORM_DATABASE_URL!
	: `file:${path.join(DATA_DIR, "platform.db")}`;

logger.info(
	{
		category: "database",
		isCloud,
		url: isCloud ? "libsql://***" : platformDbUrl,
	},
	"Platform database connecting",
);

// Create Prisma adapter with libSQL
const adapter = new PrismaLibSql({
	url: platformDbUrl,
	authToken: isCloud ? process.env.PLATFORM_DATABASE_TOKEN : undefined,
});

// Export singleton platform Prisma client
export const platformPrisma = new PrismaClient({ adapter });

logger.info(
	{
		category: "database",
	},
	"Platform database client initialized",
);

// Re-export types
export type { Store, PlatformAdmin, StorePlatformAdmin } from "../prisma-platform/generated/client";
