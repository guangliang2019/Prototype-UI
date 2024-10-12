/**
 * 二分查找函数
 * @param array - 有序数组
 * @param target - 查找目标
 * @param compare - 比较函数，返回负数表示第一个参数小于第二个参数，0表示等于，正数表示大于
 * @returns 如果找到目标，则返回目标的索引；如果没有找到，则返回目标应该插入的位置
 */
export function binarySearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const comparison = compare(target, array[mid]);

    if (comparison === 0) {
      return mid; // 找到目标，返回索引
    } else if (comparison > 0) {
      low = mid + 1; // 目标大于中间值，搜索右半区
    } else {
      high = mid - 1; // 目标小于中间值，搜索左半区
    }
  }

  // 没有找到目标，返回应该插入的位置
  return low;
}
