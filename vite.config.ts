import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import svgr from "vite-plugin-svgr";
// import EnvironmentPlugin from "vite-plugin-environment";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    // EnvironmentPlugin("all")
  ],
  optimizeDeps: {
    include: ["react-redux", "react-dom"],
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@/*": "./*",
      "src/": "/src",
    },
  },
});
