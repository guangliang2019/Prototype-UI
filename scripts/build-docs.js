#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const rootDir = path.resolve(__dirname, '..');
const astroDir = path.resolve(rootDir, 'src/next-www');

console.log('🚀 开始构建 Prototype UI 文档站...');

try {
  // 1. 构建主项目
  console.log('📦 构建主项目...');
  execSync('npm run build', { 
    cwd: rootDir, 
    stdio: 'inherit' 
  });

  // 2. 构建 Astro 文档站
  console.log('📚 构建 Astro 文档站...');
  execSync('npm run build', { 
    cwd: astroDir, 
    stdio: 'inherit' 
  });

  // 3. 复制构建结果到统一输出目录
  const docsOutputDir = path.resolve(rootDir, 'docs-dist');
  const astroOutputDir = path.resolve(astroDir, 'dist');
  
  if (fs.existsSync(docsOutputDir)) {
    fs.rmSync(docsOutputDir, { recursive: true });
  }
  
  if (fs.existsSync(astroOutputDir)) {
    fs.cpSync(astroOutputDir, docsOutputDir, { recursive: true });
  }

  console.log('✅ 文档站构建完成！');
  console.log(`📁 输出目录: ${docsOutputDir}`);
  
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
} 