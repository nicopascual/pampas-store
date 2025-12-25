import type { LoggerOptions } from "pino";

const isDevelopment = process.env.NODE_ENV === "development";
const logLevel = process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info");

export const pinoConfig: LoggerOptions = {
	level: logLevel,
	formatters: {
		level: (label) => {
			return { level: label };
		},
	},
	timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
	base: {
		service: "pampas-store",
		env: process.env.NODE_ENV || "development",
	},
	redact: {
		paths: [
			"password",
			"token",
			"authToken",
			"databaseToken",
			"sessionToken",
			"cookie",
			"authorization",
			"email",
			"*.password",
			"*.token",
			"*.authToken",
			"*.databaseToken",
			"*.sessionToken",
			"*.cookie",
			"*.authorization",
			"*.email",
		],
		remove: true,
	},
};
