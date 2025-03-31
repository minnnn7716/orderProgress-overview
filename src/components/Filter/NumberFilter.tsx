import { useState, useEffect, memo, useCallback } from 'react'

// Types
import { Column } from '@tanstack/react-table'
import { ColumnDefinition, ColumnValueType, RowData } from 'src/types/dataTypes'
import { filterType } from 'src/config/columnMeta';


export const NumberFilter = memo(({ column }: { column: Column<RowData, ColumnValueType<ColumnDefinition>> }) => {
  const columnFilterValue = column.getFilterValue() as null | [string, string];
  const { setFilterValue, getFacetedMinMaxValues } = column;
  const { filterVariant } = column.columnDef.meta ?? {};

  const inputClassName = "w-full text-sm border-1 border-round-md border-300 hover:border-blue-500 focus:border-blue-500 outline-none transition-all transition-duration-200 transition-ease-in"

  const handleChange = useCallback((value: null | [string, string]) => {
    setFilterValue(value === null ? '' : value)
  }, [setFilterValue])

  return filterVariant === filterType.numberRange
    ? <div className='flex column-gap-2'>
      <NumbersInput
        min={Number(getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(getFacetedMinMaxValues()?.[1] ?? '')}
        value={
          Array.isArray(columnFilterValue) && columnFilterValue.length === 2
            ? columnFilterValue as [string, string]
            : null
        }
        onChange={(value) => handleChange(value)}
        className={inputClassName}
        style={{
          padding: '.55rem'
        }}
      />
    </div>
    : null
}, (oldProps, newProps) => {
  return oldProps.column.getFilterValue() !== newProps.column.getFilterValue()
});

export const NumbersInput = memo(({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: null | [string, string]
  onChange: (value: null | [string, string]) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) => {
  const [value, setValue] = useState<[string, string]>(!initialValue ? ['', ''] : initialValue )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    if (type === 'min') {
      setValue(prev => [e.target.value, prev?.[1] ?? ''])
    } else if (type === 'max') {
      setValue(prev => [prev?.[0] ?? '', e.target.value])
    }
  }, [])

  useEffect(() => {
    setValue(initialValue as [string, string])
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const v = Array.isArray(value) && value.every(v => v === '') ? null : value;
      onChange(v)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return (<div className='flex column-gap-2'>
    <input
      value={value?.[0] ?? ''}
      type="number"
      placeholder="Min"
      onChange={e => handleChange(e, 'min')}
      {...props}
    />
    <input
      value={value?.[1] ?? ''}
      type="number"
      placeholder="Max"
      onChange={e => handleChange(e, 'max')}
      {...props}
    />
  </div>
  )
}, (oldProps, newProps) => {
  const oldValue = oldProps.value;
  const newValue = newProps.value;

  if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    return oldValue[0] === newValue[0] && oldValue[1] === newValue[1]
  }

  return oldValue === newValue
})
