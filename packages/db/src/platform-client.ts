import { PrismaClient } from "../prisma-platform/generated/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

console.log("[PlatformDB] Connecting to:", platformDbUrl);

// Create Prisma adapter with libSQL
const adapter = new PrismaLibSql({
	url: platformDbUrl,
	authToken: isCloud ? process.env.PLATFORM_DATABASE_TOKEN : undefined,
});

// Export singleton platform Prisma client
export const platformPrisma = new PrismaClient({ adapter });

// Re-export types
export type { Store, PlatformAdmin, StorePlatformAdmin } from "../prisma-platform/generated/client";
