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