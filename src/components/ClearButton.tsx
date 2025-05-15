/**
 * @file ClearButton.tsx
 * @description 清除按鈕元件，用於提供使用者重置或清除功能
 * @module components/ClearButton
 * @returns {React.ReactElement | null} 回傳清除按鈕或當 isShow 為 false 時回傳 null
 * @example
 * <ClearButton
 *   label="清除篩選"
 *   isShow={hasFilters}
 *   clearHandler={clearAllFilters}
 *   className="ml-2"
 * />
 */

/**
 * 型別定義
 * ClearButtonProps: 清除按鈕元件傳入參數
 * @typedef ClearButtonProps
 * @property {string} label - 按鈕顯示的文字
 * @property {boolean} isShow - 控制按鈕是否顯示
 * @property {function} clearHandler - 點擊按鈕時執行的清除函數
 * @property {string} [className] - 可選的額外 CSS 類別名稱
 */

import { memo, type ReactNode } from 'react';

// Components
import { Button } from 'primereact/button';

type ClearButtonProps = {
  label: string;
  isShow: boolean;
  clearHandler: () => void;
  className?: string;
}

export const ClearButton = memo(({
  label,
  isShow,
  clearHandler,
  className,
}: ClearButtonProps): ReactNode => {
  if (!isShow) {
    return null
  }

  return (<Button
    rounded
    label={label}
    severity="warning"
    icon="pi pi-times"
    onClick={clearHandler}
    pt={buttonPt}
    className={className ?? ''}
  />)
});

const buttonPt = {
  root: {
    className: 'py-0 px-2 outline-none transition-all transition-duration-200 transition-ease-in',
  },
  label: {
    className: 'text-sm font-normal'
  }
};