import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    root: './src', // 打包入口
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(
            /<script defer src="\/_vercel\/insights\/script.js"><\/script>/,
            mode === 'production' ? '<script defer src="/_vercel/insights/script.js"></script>' : ''
          );
        },
      },
    ],
    build: {
      target: 'esnext', // 使用现代 JavaScript 语法
      minify: true,
      outDir: '../dist', // 输出目录设为项目根目录下的 dist 文件夹
      sourcemap: false, // 依然生成 Source Maps
      rollupOptions: {
        input: './src/index.html', // 设置打包的入口文件
      },
    },
    define: {
      'process.env': env,
    },
  };
});
