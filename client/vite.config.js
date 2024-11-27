import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'https://mern-auth-api-mu.vercel.app/', // Your API server URL
        changeOrigin: true, // Handles virtual hosting in case of subdomains
        secure: false, // If the target is HTTPS and you have self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove `/api` prefix
      },
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
