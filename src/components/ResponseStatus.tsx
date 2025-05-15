/**
 * @file ResponseStatus.tsx
 * @description API 回傳狀態元件，用於顯示資料載入、錯誤和快取狀態
 * @module components/ResponseStatus
 * @returns {React.ReactElement} 回傳狀態訊息，半透明背景防止使用者操作 UI
 * @example
 * <ResponseStatus
 *   error={error}
 *   message="API 請求失敗"
 *   isLoading={isLoading}
 *   isCaching={isCaching}
 * />
 */

/**
 * 型別定義
 * ResponseStatusProps: API 回傳狀態元件傳入參數
 * @typedef ResponseStatusProps
 * @property {Error | null} error - 錯誤物件，若無錯誤則為 null
 * @property {string} message - 詳細錯誤訊息，僅在開發環境中顯示
 * @property {boolean} isLoading - 資料是否正在載入中
 * @property {boolean} isCaching - 資料是否正在快取中
 */

import { memo } from "react"
import { classNames } from "primereact/utils";

interface ResponseStatusProps {
  error: Error | null;
  message: string;
  isLoading: boolean;
  isCaching: boolean;
}

export const ResponseStatus = memo(({
  error,
  message,
  isLoading,
  isCaching
}: ResponseStatusProps) => {
  const content = error && import.meta.env.DEV
    ? <>{`${error}`} <span className='text-xl'>😵‍💫</span>{message}</>
    : error
      ? <>系統發生錯誤，請聯絡 IT，謝謝<span className='text-xl'>😵‍💫</span></>
      : isCaching
        ? <>資料更新中，請稍後 5 分鐘再重新整理頁面，謝謝<span className='text-xl'>🙌</span></>
        : isLoading
          ? <>Loading... <span className='text-xl'>😌</span></>
          : null

  return <div
    className={classNames(
      content ? "z-5 opacity-100 pointer-events-auto" : "z-0 opacity-0 pointer-events-none",
      "absolute w-full h-full flex align-items-center justify-content-center bg-white-alpha-30 transition-all transition-duration-500	transition-ease-in-out"
    )}
    style={{
      backdropFilter: 'blur(2px)',
    }}
  >
    <p className="text-600 font-medium">{content}</p>
  </div>
})