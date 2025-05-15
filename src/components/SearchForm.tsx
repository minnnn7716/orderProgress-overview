import { useState, useCallback, memo } from "react"

// Components
import { Calendar } from 'primereact/calendar';
import { Dropdown, type DropdownChangeEvent, type DropdownProps } from 'primereact/dropdown';

// Types
import { Dispatch, SetStateAction } from "react"
import { FormEvent, Nullable } from "primereact/ts-helpers";
import { custIDList, custIDType } from "src/config/custIDList";
import { ApiProps } from "src/features/order";

const today = new Date();
const pastYear = new Date(today.setFullYear(today.getFullYear() - 1));
const initialDateRange = [pastYear, new Date()];

export const SearchForm = memo(({
  setSearchParams
}: { setSearchParams: Dispatch<SetStateAction<ApiProps>> }) => {
  const [dateRange, setDateRange] = useState<Nullable<(Date | null)[]>>(initialDateRange);
  const [custID, setCustID] = useState<custIDType | null>(null);

  const handleCalendarRange = useCallback((e: FormEvent<Date[]>) => {
    if (!e.value) {
      return initialDateRange;
    }

    const [from, to] = e.value;
    let orderDate = initialDateRange;

    if (from && to) {
      orderDate = [from, to];
    } else if (from && !to) {
      orderDate = [from, from];
    } else if (!from && to) {
      orderDate = [to, to];
    }

    setDateRange(e.value);
    setSearchParams(pre => ({
      ...pre,
      orderDate
    }))
  }, [setSearchParams]);

  const handleCustId = useCallback((e: DropdownChangeEvent) => {
    setCustID(e.value);

    setSearchParams(prev => ({
      ...prev,
      custID: e.value && e.value.code ? e.value.code : ''
    }))
  }, [setSearchParams]);

  const custIDDropdownTemplate = (option: custIDType, props?: DropdownProps) => {
    if (option) {
      return <>{option.code}｜{option.name}</>
    }

    return <>{props?.placeholder}</>
  }

  return (
    <form className="flex column-gap-3">
      <label>
        <span className="mr-2 text-sm">下單日期</span>
        <Calendar
          value={dateRange}
          onChange={handleCalendarRange}
          hideOnRangeSelection
          selectionMode="range"
          dateFormat="yy/mm/dd"
          maxDate={new Date()}
          minDate={pastYear}
          pt={calendarPt}
        />
      </label>
      <label>
        <span className="mr-2 text-sm">客戶代碼</span>
        <Dropdown
          value={custID}
          filter
          showClear
          showFilterClear
          onChange={handleCustId}
          options={custIDList}
          optionLabel="code"
          placeholder="選填"
          itemTemplate={custIDDropdownTemplate}
          pt={dropdownPt}
        />
      </label>
    </form>)
})

const calendarPt = {
  root: {
    className: "w-full lg:w-12rem"
  },
  input: {
    root: {
      className: "py-2 text-sm"
    }
  },
}

const dropdownPt = {
  root: {
    className: "w-full lg:w-7rem"
  },
  input: {
    className: "py-2 pr-1 text-sm"
  },
  trigger: {
    style: {
      width: "2rem"
    }
  },
  clearIcon: {
    style: {
      right: "2rem"
    }
  },
  filterInput: {
    className: "py-2 text-sm"
  },
  itemLabel: {
    className: "text-sm"
  }
};