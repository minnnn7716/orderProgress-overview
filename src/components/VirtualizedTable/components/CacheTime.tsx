import { useMemo, memo } from 'react';
import { useOrderCacheTime } from 'src/features/order';
import { formatDate } from 'src/utils/formatDate';

export const CacheTime = memo(({ className }: { className: string }) => {
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