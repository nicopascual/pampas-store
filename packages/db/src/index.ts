import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PrismaClient } from "../prisma/generated/client";

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default store configuration
const DEFAULT_STORE_SLUG = "pampas";
// Resolve to project root data directory (packages/db/src -> project root)
const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, "../../../data");

// Determine database URL:
// 1. If DATABASE_URL is set (cloud or explicit), use it
// 2. Otherwise, use the default store's local database
const getDatabaseUrl = () => {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}
	// Default to the first store's database for local development
	return `file:${path.join(DATA_DIR, "stores", `${DEFAULT_STORE_SLUG}.db`)}`;
};

const dbUrl = getDatabaseUrl();
console.log("[StoreDB] Default store connecting to:", dbUrl);

const adapter = new PrismaLibSql({
	url: dbUrl,
	authToken: process.env.DATABASE_TOKEN,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
