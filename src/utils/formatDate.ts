/**
 * @file formatDate.ts
 * @description 日期格式化工具函式，將日期轉換為指定格式的字串
 * @module utils/formatDate
 * @returns {Function} 匯出日期格式化函式
 * @example
 * import { formatDate } from 'src/utils/formatDate';
 * 
 * // 基本用法 - 使用預設格式 (YYYY/MM/DD)
 * const formattedDate = formatDate('2023-05-15');  // '2023/05/15'
 * 
 * // 自訂格式
 * const dateWithTime = formatDate(new Date(), { 
 *   year: 'numeric',
 *   month: '2-digit', 
 *   day: '2-digit',
 *   hour: '2-digit',
 *   minute: '2-digit'
 * });  // '2023/05/15 14:30'
 * 
 * // 無效日期處理
 * const emptyResult = formatDate('');  // ''
 * const invalidResult = formatDate('not-a-date');  // ''
 */

/**
 * 型別定義
 * formatDate: 日期格式化函式
 * @function formatDate
 * @param {string | Date} date - 要格式化的日期，可為字串或 Date 物件
 * @param {Intl.DateTimeFormatOptions} [format=initialDateFormat] - 日期格式選項
 * @returns {string} 格式化後的日期字串，若輸入為空或無效則回傳空字串
 * 
 * initialDateFormat: 預設日期格式
 * @constant {Intl.DateTimeFormatOptions}
 * @description 預設日期格式為年/月/日 (YYYY/MM/DD)
 * @property {string} year - 年份格式，值為 'numeric'
 * @property {string} month - 月份格式，值為 '2-digit'
 * @property {string} day - 日期格式，值為 '2-digit'
 */

export const formatDate = (
  date: string | Date,
  format: Intl.DateTimeFormatOptions = initialDateFormat
): string => {

  // 排除空字串
  if (typeof date === 'string' && date.trim() === '') {
    return '';
  };
  
  // 如果 date 為 Date 型別直接使用，若為字串則轉換為 Date
  const parseDate = date instanceof Date ? date : new Date(date);
  
  // 排除無效日期
  if (isNaN(parseDate.getTime())) {
    return '';
  }

  // 依格式轉換日期，預設格式為 2025/12/31
  return parseDate.toLocaleDateString('zh-TW', format);
};

const initialDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};