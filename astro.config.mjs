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
    plugins: [tailwindcss()],
  },
});
