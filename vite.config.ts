import { defineConfig } from "vite";

export default defineConfig({
  root: "./src", // 打包入口
  build: {
    outDir: "../dist", // 输出目录设为项目根目录下的 dist 文件夹
    minify: false, // 禁用代码压缩和混淆
    sourcemap: true, // 依然生成 Source Maps
    rollupOptions: {
      input: "./src/index.ts", // 设置打包的入口文件
      external: ["lit"], // 如果有外部依赖，可以在这里声明
      output: {
        globals: {
          lit: "lit",
        },
      },
    },
  },
});
