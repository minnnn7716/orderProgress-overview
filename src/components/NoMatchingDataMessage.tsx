import { memo } from 'react'

type NoMatchingDataMessageProps = {
  isPendingOrError: boolean
  hasData: boolean
}

export const NoMatchingDataMessage = memo(({
  isPendingOrError,
  hasData,
}: NoMatchingDataMessageProps) => (
  !isPendingOrError && !hasData
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