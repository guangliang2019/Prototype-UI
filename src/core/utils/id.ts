/**
 * 生成一个基于时间戳和随机数的简单唯一ID
 * @returns {string} 唯一ID
 */
export function generateSimpleId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 生成一个符合 UUID v4 标准的唯一ID
 * @returns {string} UUID字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 用于高性能场景的ID生成器
let lastTimestamp = Date.now();
let sequence = 0;

/**
 * 生成一个高性能的唯一ID，适用于短时间内大量生成ID的场景
 * 使用时间戳+序列号的方式，确保在同一毫秒内生成的ID也是唯一的
 * @returns {string} 唯一ID
 */
export function generateFastId(): FastId {
  const timestamp = Date.now();
  if (timestamp === lastTimestamp) {
    sequence++;
  } else {
    sequence = 0;
    lastTimestamp = timestamp;
  }
  return `${timestamp}_${sequence}`;
}

export type FastId = `${number}_${number}`;
