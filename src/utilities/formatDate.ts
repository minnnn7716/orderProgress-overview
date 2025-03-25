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