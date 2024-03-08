import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import http from "https";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api/v1' : 'http://localhost:3000'
    }

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
