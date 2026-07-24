import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    strictPort: false,
    watch: {
      usePolling: true,
      interval: 400,
      ignored: ["**/node_modules/**", "**/.git/**"],
    },
    hmr: { overlay: false },
  },
});
