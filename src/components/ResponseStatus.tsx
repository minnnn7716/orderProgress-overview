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