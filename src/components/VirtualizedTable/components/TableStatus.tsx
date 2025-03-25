import { memo } from "react"
import style from '../style.module.scss'

interface TableStatusProps {
  tableLength: number;
  error: Error | null;
  message: string;
  isLoading: boolean;
  isCaching: boolean;
}

export const TableStatus = memo(({ tableLength, error, message, isLoading, isCaching }: TableStatusProps) => (
  error && import.meta.env.DEV
    ? (<p className={style.tableNoticeText}>
      {`${error}`} <span className='text-xl'>😵‍💫</span>
      {message}
    </p>)
    : error
      ? <p className={style.tableNoticeText}>系統發生錯誤，請聯絡 IT，謝謝<span className='text-xl'>😵‍💫</span></p>
      : isCaching
        ? <p className={style.tableNoticeText}>資料更新中，請稍後 5 分鐘再重新整理頁面，謝謝<span className='text-xl'>🙌</span></p>
        : isLoading
          ? <p className={style.tableNoticeText}>Loading... <span className='text-xl'>😌</span></p>
          : !tableLength
            ? <p className={style.tableNoticeText}>沒有符合的資料 <span className='text-xl'>🧐</span></p>
            : null
))