import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), viteReact()],
	server: {
		port: 3001,
		proxy: {
			// Proxy API requests to backend server
			// changeOrigin: false preserves the original Host header (e.g., pampas.localhost:3001)
			// so the backend can resolve the correct tenant from the subdomain
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: false,
			},
			"/rpc": {
				target: "http://localhost:3000",
				changeOrigin: false,
			},
		},
	},
});
