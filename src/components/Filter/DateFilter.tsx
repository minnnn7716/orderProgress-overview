import { useState, useCallback, memo } from 'react'

// Components
import { Calendar } from 'primereact/calendar';

// Types
import { Column } from '@tanstack/react-table'
import { ColumnDefinition, ColumnValueType, RowData } from 'src/types/dataTypes'
import { filterType } from 'src/config/columnMeta';
import { Nullable, FormEvent } from "primereact/ts-helpers";

export const DateFilter = memo(({ column }: { column: Column<RowData, ColumnValueType<ColumnDefinition>> }) => {
  const [, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const { filterVariant } = column.columnDef.meta ?? {};
  const { setFilterValue } = column;
  const columnFilterValue = column.getFilterValue();

  const handleChange = useCallback((e: FormEvent<Date[]>) => {
    setDates(e.target.value)
    setFilterValue(e.target.value)
  }, [setDates, setFilterValue]);

  const handleClear = useCallback(() => {
    setDates(null)
    setFilterValue('')
  }, [setDates, setFilterValue])

  return filterVariant === filterType.dateRange
    ? (
      <Calendar
        showButtonBar
        hideOnRangeSelection
        selectionMode="range"
        dateFormat="yy/mm/dd"
        placeholder="Date Range"
        value={columnFilterValue as Nullable<(Date | null)[]>}
        onChange={handleChange}
        onClearButtonClick={handleClear}
        pt={calendarPt}
      />
    )
    : <></>
}, (oldProps, newProps) => oldProps.column.getFilterValue() !== newProps.column.getFilterValue());

const calendarPt = {
  root: {
    className: "w-full lg:w-13rem"
  },
  input: {
    root: {
      className: "text-center",
      style: {
        fontSize: '.85rem',
        padding: '.55rem .2rem',
      }
    }
  },
}