export const formatDate = (dateString: string, format?: Intl.DateTimeFormatOptions) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const formatConfig = format || {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString('zh-TW', formatConfig);
  } else {
    return String(dateString);
  }
};