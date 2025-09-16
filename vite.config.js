import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // local dev runs on http://localhost:3000
  },
  build: {
    outDir: "dist", // Vercel will serve this folder
  },
});
