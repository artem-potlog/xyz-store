import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static SPA optimized for Render deployment.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    port: 5173,
    host: true,
  },
});
