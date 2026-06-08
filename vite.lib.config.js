import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.glb"],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "FramerDsTest",
      formats: ["es"],
      fileName: () => "framer-ds-test.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: "style.css",
      },
    },
    cssCodeSplit: false,
    outDir: "dist",
    emptyOutDir: true,
  },
});
