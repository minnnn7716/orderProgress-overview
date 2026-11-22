/**
 * @file constants.ts
 * @description 定義 VirtualizedTable 的全域常數
 */

/**
 * Column, Cell 的預設與最小寬度
 * @constant
 * @type {number}
 */
export const DEFAULT_COLUMN_WIDTH = 200;
export const MIN_COLUMN_WIDTH = 150;
// 實際列高約 48px，首次量測前必須使用正值，避免一次渲染上千列。
export const ESTIMATED_ROW_HEIGHT = 50;

/**
 * Cell 警示樣式
 * @constant
 * @type {Object}
 * @property {Object} warning - 警告樣式，橙黃色背景與深橙色文字
 * @property {Object} error - 錯誤樣式，淺紅色背景與深紅色文字
 */
export const REMIND_STYLE = {
  warning: {
    fontWeight: "700",
    color: "#7d4e00",
    backgroundColor: "#fff7d5"
  },
  error: {
    fontWeight: "700",
    color: "#ad0055",
    backgroundColor: "#ffe4e8"
  }
}
