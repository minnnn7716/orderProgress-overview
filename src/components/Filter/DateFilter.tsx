/**
 * @file DateFilter.tsx
 * @description 日期範圍篩選元件，用於表格 Column 中篩選日期範圍
 * @module components/Filter/DateFilter
 * @returns {React.ReactElement} 回傳 PrimeReact 的 Calendar 元件
 * @example
 * 傳入範例可見 src/components/VirtualizedTable/components/TableColumn.tsx
 * <DateFilter
 *   columnFilterValue={dateRange}
 *   setFilterValue={setDateRange}
 * />
 */

/**
 * 型別定義
 * DateFilterProps: 日期篩選器傳入參數
 * @typedef DateFilterProps
 * @property {DateRange | undefined} columnFilterValue - 傳入目前已選擇的日期範圍，若無則會傳入 undefined
 * @property {function} setFilterValue - 用於將新的篩選值設置到表格狀態的回呼函式

* DateRange
 * @typedef {Nullable<(Date | null)[]>} DateRange - 傳入的日期可能為 null, [Date, null], [null, Date], [null, null], [Date, Date] 幾種組合
 */

import { useState, useCallback, memo } from 'react'

// Components
import { Calendar } from 'primereact/calendar';

// Types
import { Nullable, FormEvent } from "primereact/ts-helpers";

export type DateRange = Nullable<(Date | null)[]>;

type DateFilterProps = {
  columnFilterValue: DateRange | undefined;
  setFilterValue: (updater: DateRange | '') => void;
}

export const DateFilter = memo(({
  columnFilterValue,
  setFilterValue
}: DateFilterProps) => {
  const [, setDates] = useState<DateRange>(null);

  const handleAction = useCallback((type: 'change' | 'clear', event?: FormEvent<DateRange>) => {
    if (type === 'change' && event) {
      const { value } = event.target;
      setDates(value)
      setFilterValue(value)
    } else if (type === 'clear') {
      setDates(null)
      setFilterValue('')
    }
  }, [setDates, setFilterValue]);

  return <Calendar
    showButtonBar
    hideOnRangeSelection
    selectionMode="range"
    dateFormat="yy/mm/dd"
    placeholder="Date Range"
    value={columnFilterValue as DateRange}
    onChange={e => handleAction('change', e)}
    onClearButtonClick={() => handleAction('clear')}
    pt={calendarPt}
  />
}, (oldProps, newProps) => JSON.stringify(oldProps.columnFilterValue) === JSON.stringify(newProps.columnFilterValue));

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