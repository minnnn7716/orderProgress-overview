import { useState, useEffect, memo, useCallback } from 'react'

import style from './style.module.scss'

export const DebouncedInput = memo(({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  const handleResetFilter = useCallback(() => {
    setValue(prev => prev === '' ? prev : '')
  }, []);

  return (<div className={style['filter']}>
    <input className={style['filter_input']} {...props} value={value} onChange={e => setValue(e.target.value)} />
    <button className={style['filter_cancelBtn']}
      style={{
        backgroundColor: 'transparent'
      }}>
      <i className='pi pi-times' onClick={handleResetFilter} />
    </button>
  </div>
  )
}, (oldProps, newProps) => {
  return oldProps.value === newProps.value
})