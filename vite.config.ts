import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), tailwindcss() ,react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": path.resolve(__dirname, "./src/features"),

      "@routes": path.resolve(__dirname, "./src/routes"),

      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),

    },
  },
  //  assetsInclude: ['**/*.html'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {

          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("react-router-dom")) return "vendor-router";
            if (id.includes("react-hook-form")) return "vendor-hook-form";
            if (id.includes("zod")) return "vendor-zod";
            if (id.includes("date-fns")) return "vendor-date-fns";
            return "vendor";
          }

        },
      },
    },
  },
});

