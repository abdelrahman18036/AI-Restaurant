import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
