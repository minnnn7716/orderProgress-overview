/**
 * @file CacheTime.tsx
 * @description 資料時間顯示元件，用於顯示訂單資料的快取時間
 * @module components/VirtualizedTable/components/CacheTime
 * @returns {React.ReactElement} 回傳顯示資料更新時間的文字元件
 * @example
 * <CacheTime className="text-gray-500 text-sm" />
 */

/**
 * 型別定義
 * CacheTimeProps: 資料時間元件傳入參數
 * @typedef CacheTimeProps
 * @property {string} className - 傳入用於設置元件樣式的 ClassName
 */

import { useMemo, memo } from 'react';
import { useOrderCacheTime } from 'src/features/order';
import { formatDate } from 'src/utils/formatDate';

export const CacheTime = memo(({
  className
}: {
  className: string
}) => {
  const { data: cacheTimeData } = useOrderCacheTime();

  const formattedCacheTime = useMemo(() => formatDate(cacheTimeData ?? '', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }), [cacheTimeData])

  return (<p className={`mb-0 ${className}`}>
    資料時間： {formattedCacheTime}
  </p>)
});