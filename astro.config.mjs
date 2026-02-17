// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  integrations: [react()],
  server: {
    port: 4350,
  },
  vite: {
    // @ts-ignore - Vite version mismatch between @tailwindcss/vite and Astro's bundled Vite
    plugins: [tailwindcss()],
  },
});
