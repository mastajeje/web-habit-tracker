import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path-browserify";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: path.resolve("index.html"), // HTML entry point
        background: path.resolve("src/background.ts"), // Background script
        content: path.resolve("src/content.ts") // Content script
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]"
      }
    }
  },
  publicDir: "public" // Ensures manifest.json is copied
});
