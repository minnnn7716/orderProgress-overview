/**
 * @file NoMatchingDataMessage.tsx
 * @description 無符合資料訊息元件，當沒有符合篩選條件的資料時顯示提示訊息
 * @module components/NoMatchingDataMessage
 * @returns {React.ReactElement | null} 當無資料且非載入或錯誤狀態時回傳提示訊息，否則回傳 null
 * @example
 * <NoMatchingDataMessage
 *   isPendingOrError={isLoading || error}
 *   hasData={data.length > 0}
 * />
 */

/**
 * 型別定義
 * NoMatchingDataMessageProps: 無符合資料訊息元件傳入參數
 * @typedef NoMatchingDataMessageProps
 * @property {boolean} isPendingOrError - 是否處於載入中或錯誤狀態
 * @property {boolean} hasMatchingData - 是否有符合的資料
 */

import { memo } from 'react'

type NoMatchingDataMessageProps = {
  isPendingOrError: boolean
  hasMatchingData: boolean
}

export const NoMatchingDataMessage = memo(({
  isPendingOrError,
  hasMatchingData,
}: NoMatchingDataMessageProps) => (
  !isPendingOrError && !hasMatchingData
    ? (
      <p
        className="absolute top-50 left-50"
        style={{
          transform: 'translateX(-50%)',
        }}
      >
        沒有符合的資料 <span className='text-xl'>🧐</span>
      </p>
    )
    : null)
)