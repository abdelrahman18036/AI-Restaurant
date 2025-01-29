// frontend/vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy API requests to the Django backend
      "/api": {
        target: "http://localhost:8000", // Django server address
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // If you have https in Django, set to true
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Optional: adjust the path if needed
      },
    },
  },
});
