import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    })
  ],
  // 配置前端服务器
  server: {
    port: 3018
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
  // build: {
  //   rollupOptions: {
  //     external: ["react"]
  //   }
  // }
});
