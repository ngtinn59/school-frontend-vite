import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
    host: '0.0.0.0', // Thay 'localhost' bằng '0.0.0.0' để expose ra mạng
    port: 5174 // Dùng cổng mà ứng dụng đang chạy
  },
});
