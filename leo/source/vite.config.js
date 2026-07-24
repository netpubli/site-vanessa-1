import { defineConfig } from "vite";

export default defineConfig({
  base: "/lptemporaria/2/",
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
