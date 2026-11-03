import { defineConfig } from "vite";

export default defineConfig({
  // The editor ships as one large bundle (it includes its own renderer),
  // so silence Vite's default 500 kB chunk warning.
  build: { chunkSizeWarningLimit: 8000 },
});
