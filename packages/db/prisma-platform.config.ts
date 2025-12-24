import path from "node:path";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({
	path: "../../apps/server/.env",
});

// Platform database config (separate from store databases)
// Default to local file if PLATFORM_DATABASE_URL is not set
const platformDbUrl =
	process.env.PLATFORM_DATABASE_URL ||
	`file:${path.resolve("../../data/platform.db")}`;

export default defineConfig({
	schema: path.join("prisma-platform", "schema.prisma"),
	datasource: {
		url: platformDbUrl,
	},
});
