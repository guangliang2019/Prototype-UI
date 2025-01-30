const fs = require('fs');
const path = require('path');

/**
 * @typedef {Object} CreateFileOptions
 * @property {string} filename - 文件名，例如 "example.ts"
 * @property {string} dir - 文件所在的目录路径，例如 "./src"
 * @property {string} content - 文件内容，例如 "const hello = 'world';"
 */

/**
 * 文件管理类
 */
class FileManager {
  // 创建文件
  static createFile(options) {
    const { filename, dir, content } = options;
    const filePath = path.join(dir, filename);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, 'utf-8');
  }

  // 更新文件
  static updateFile(options) {
    const { filename, dir, content } = options;
    const filePath = path.join(dir, filename);

    if (!fs.existsSync(filePath)) {
      console.info(`文件不存在: ${filePath}`);
      return;
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.info(`文件已更新: ${filePath}`);
  }

  // 删除文件
  static deleteFile(filename, dir) {
    const filePath = path.join(dir, filename);

    if (!fs.existsSync(filePath)) {
      console.info(`文件不存在: ${filePath}`);
      return;
    }

    fs.unlinkSync(filePath);
    console.info(`文件已删除: ${filePath}`);
  }

  // 只获取当前目录的文件和子目录
  static getCurrentLevelContents(dir) {
    let results = [];

    if (!fs.existsSync(dir)) {
      console.info(`目录不存在: ${dir}`);
      return results;
    }

    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() || stat.isFile()) {
        results.push(fullPath.replace(dir + '/', ''));
      }
    });

    return results;
  }

  // 递归获取当前目录及其所有子目录中的文件和子目录
  static getAllContentsRecursive(dir) {
    let results = [];

    if (!fs.existsSync(dir)) {
      console.info(`目录不存在: ${dir}`);
      return results;
    }

    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        results.push(fullPath);
        results = results.concat(FileManager.getAllContentsRecursive(fullPath)); // 递归读取子目录
      } else {
        results.push(fullPath);
      }
    });

    return results;
  }

  static getFileContent(filePath) {
    if (!fs.existsSync(filePath)) {
      console.info(`文件不存在: ${filePath}`);
      return null;
    }
  
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content;
    } catch (err) {
      console.error(`读取文件失败: ${filePath}`, err);
      return null;
    }
  }
}

module.exports = FileManager;
