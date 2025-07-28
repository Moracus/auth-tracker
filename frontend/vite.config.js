import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"), // for popup UI
        content: resolve(__dirname, "src/content/content.js"), // vanilla content script
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "content") return "content.js"; // output at root
          return "assets/[name].js"; // rest inside assets/
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
