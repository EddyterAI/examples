import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  // The editor ships as one large bundle (it includes its own renderer),
  // so silence Vite's default 500 kB chunk warning.
  build: { chunkSizeWarningLimit: 8000 },
});
