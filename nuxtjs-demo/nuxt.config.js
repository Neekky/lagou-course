/**
 * nuxt 配置文件
 */

import path from "path";

export default defineNuxtConfig({
  // My Nuxt config
  // app: {
  //   baseURL: "/app",
  // },
  hooks: {
    'pages:extend' (routes) {
      routes.push({
        path: "/hello",
        name: "hello",
        file: path.resolve(__dirname, './pages/about.vue'),
      })
    }
  }
});
