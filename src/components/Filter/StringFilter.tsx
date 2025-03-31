import { useState, useEffect, memo, useMemo, useCallback } from 'react'

// Components
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

// Types
import { Column } from '@tanstack/react-table'
import { ColumnDefinition, ColumnValueType, RowData } from 'src/types/dataTypes'
import { filterType } from 'src/config/columnMeta';

// Styles
import style from './style.module.scss';
import { classNames } from 'primereact/utils';

export const StringFilter = memo(({ column }: { column: Column<RowData, ColumnValueType<ColumnDefinition>> }) => {
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnFilterValue = column.getFilterValue();

  const { getFacetedUniqueValues, setFilterValue } = column;
  const facetedUniqueKeys = Array.from(getFacetedUniqueValues().keys());

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === filterType.select || filterVariant === filterType.textSelect
        ? facetedUniqueKeys
          .sort()
          .slice(0, 500)
        : []
    , [facetedUniqueKeys, filterVariant])

  const handleSetDropdownValue = useCallback((e: DropdownChangeEvent) => setFilterValue(e.value), [setFilterValue]);
  const handleSetTextValue = useCallback((value: string) => setFilterValue(value), [setFilterValue]);
  const textValue = columnFilterValue?.toString();

  return filterVariant === filterType.select
    ? (
      <Dropdown
        showClear
        value={textValue}
        onChange={handleSetDropdownValue}
        options={sortedUniqueValues.map(value => value ?? '')}
        optionLabel="name"
        placeholder="Dropdown..."
        pt={dropdownPt}
      />
    )
    : filterVariant === filterType.textSelect
      ? (
        <Dropdown
          filter
          showClear
          showFilterClear
          value={textValue}
          onChange={handleSetDropdownValue}
          options={sortedUniqueValues.map(value => value ?? '')}
          optionLabel="name"
          placeholder="Dropdown..."
          pt={dropdownPt}
        />
      )
      : filterVariant === filterType.text
        ? (
          <DebouncedInput
            placeholder="Search..."
            value={textValue ?? ''}
            onChange={value => handleSetTextValue(String(value))}
            className="w-full text-sm border-1 border-round-md border-300 hover:border-blue-500 focus:border-blue-500 outline-none transition-all transition-duration-200 transition-ease-in"
            style={{
              padding: '.55rem'
            }}
          />
        )
        : <></>
}, (oldProps, newProps) => {
  const oldPropsKeys = oldProps.column.getFacetedUniqueValues().keys();
  const newPropsKeys = newProps.column.getFacetedUniqueValues().keys()

  return (oldPropsKeys === newPropsKeys) && oldProps.column.getFilterValue() === newProps.column.getFilterValue()
});

export const DebouncedInput = memo(({
  value: initialValue = '',
  onChange,
  debounce = 300,
  clearBtn = true,
  ...props
}: {
  value: string | number | undefined
  onChange: (value: string | number) => void
  debounce?: number,
  clearBtn?: boolean
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

  return (<div className={`${style['filter']} flex-1`}>
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      {...props}
    />
    {
      clearBtn ? (
        <button className={classNames(
          style['filter_cancelBtn'],
          value ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}>
          <i className='pi pi-times' onClick={handleResetFilter} />
        </button>)
        : ''
    }

  </div>
  )
}, (oldProps, newProps) => {
  return oldProps.value === newProps.value
})


const dropdownPt = {
  root: {
    className: "w-full"
  },
  input: {
    className: "py-2 text-sm text-left"
  },
  trigger: {
    style: {
      width: "2rem"
    }
  },
  clearIcon: {
    style: {
      right: "2.5rem",
    }
  },
  filterInput: {
    className: "py-2 text-sm"
  },
  itemLabel: {
    className: "text-sm"
  },

};