import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path-browserify";
import hotReloadExtension from "hot-reload-extension-vite";
export default defineConfig({
  plugins: [react(),
    hotReloadExtension({
        log: true,
        backgroundPath: 'src/background/index.ts',
    })
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: path.resolve("index.html"), // HTML entry point
        background: path.resolve("src/background/index.ts"), // Background script
        content: path.resolve("src/content/index.ts") // Content script
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]"
      }
    }
  },
  publicDir: "public" // Ensures manifest.json is copied
});
