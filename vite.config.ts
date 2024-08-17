import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // 打包入口
  build: {
    
    target: 'esnext', // 使用现代 JavaScript 语法
    minify: true,
    outDir: '../dist', // 输出目录设为项目根目录下的 dist 文件夹
    sourcemap: false, // 依然生成 Source Maps
    rollupOptions: {
      input: './index.html', // 设置打包的入口文件
    },
  },
});
