import { useState, useCallback, memo } from "react"

// Component
import { Calendar } from 'primereact/calendar';
import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';

// Type
import { Dispatch, SetStateAction } from "react"
import { FormEvent, Nullable } from "primereact/ts-helpers";
import { custIDList, custIDType } from "src/config/custIDList";

import { apiProps } from "src/api/fetchData";

const today = new Date();
const pastYear = new Date(today.setFullYear(today.getFullYear() - 1));
const initialDateRange = [pastYear, new Date()];

export const SearchForm = memo(({ setSearchParams }: { setSearchParams: Dispatch<SetStateAction<apiProps>> }) => {
  const [dateRange, setDateRange] = useState<Nullable<(Date | null)[]>>(initialDateRange);
  const [custID, setCustID] = useState<custIDType | null>(null);

  const handleCalendarRange = useCallback((e: FormEvent<Date[]>) => {
    if (!e.value) {
      return initialDateRange;
    }

    const from = e.value[0];
    const to = e.value[1];
    let finalDate = initialDateRange;

    if (from && to) {
      finalDate = [from, to];
    } else if (from && !to) {
      finalDate = [from, from];
    } else if (!from && to) {
      finalDate = [to, to];
    }

    setDateRange(e.value);
    setSearchParams(pre => ({
      ...pre,
      orderDate: finalDate
    }))
  }, [setSearchParams]);

  const handleCustId = useCallback((e: DropdownChangeEvent) => {
    setCustID(e.value);

    if (e.value) {
      setSearchParams(prev => ({
        ...prev,
        custID: e.value.code ? e.value.code : ''
      }))
    } else {
      setSearchParams(prev => ({
        ...prev,
        custID: ''
      }))
    }
  }, [setSearchParams]);

  const custIDDropdownTemplate = (option: custIDType, props?: DropdownProps) => {
    if (option) {
      return <>{option.code}｜{option.name}</>
    }

    return <>{props?.placeholder}</>
  }

  return (
    <form className="flex column-gap-2">
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
          pt={{
            root: {
              className: "w-full lg:w-13rem"
            },
            input: {
              root: {
                className: "py-2 text-sm"
              }
            },
          }}
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

const dropdownPt = {
  root: {
    className: "w-full lg:w-8rem"
  },
  input: {
    className: "py-2 text-sm"
  },
  trigger: {
    style: {
      width: "2.5rem"
    }
  },
  clearIcon: {
    style: {
      right: "2.3rem"
    }
  },
  filterInput: {
    className: "py-2 text-sm"
  },
  itemLabel: {
    className: "text-sm"
  }
};