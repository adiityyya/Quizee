import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// Load environment variables from .env

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://quizee-backend-eight.vercel.app", // Use process.env
        // changeOrigin: true,
        // secure: false,
        // target: "http://localhost:5000",
        // target: process.env.VITE_REACT_APP_BACKEND_BASEURL,
        // target: import.meta.env.VITE_REACT_APP_BACKEND_BASEURL,
      },
    },
  },
});
