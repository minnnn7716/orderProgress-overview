import { useState, useCallback, memo } from "react"

// Component
// import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';

// Type
import { Dispatch, SetStateAction } from "react"
import { FormEvent, Nullable } from "primereact/ts-helpers";
import { custIDList, custIDType } from "src/config/custIDList";

import { apiParams } from "src/api/fetchData";

const today = new Date();
const yesterDay = new Date(today.setDate(today.getDate() - 1));
const pastTwoYears = new Date(today.setFullYear(today.getFullYear() - 2))

export const SearchForm = memo(({ setSearchParams }: { setSearchParams: Dispatch<SetStateAction<apiParams>> }) => {
  const [date, setDate] = useState<Nullable<Date>>(yesterDay);
  const [custID, setCustID] = useState<custIDType | null>(null);

  const handleCalendar = useCallback((e: FormEvent<Date>) => {
    const selectDate = e.value || new Date();
    setDate(selectDate)
    setSearchParams(prev => ({
      ...prev,
      orderDate: selectDate
    }))
  }, [setSearchParams]);

  const handleCustId = useCallback((e: DropdownChangeEvent) => {
    setCustID(e.value)

    if (e.value) {
      setSearchParams(prev => ({
        ...prev,
        custID: e.value.code ? e.value.code : ''
      }))
    }
  }, [setSearchParams]);


  // const handleSearch = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setSearchParams({
  //     orderDate: date ?? yesterDay,
  //     custID: custID?.code ?? ''
  //   })
  // }, [setSearchParams, date, custID]);

  const custIDDropdownTemplate = (option: custIDType, props?: DropdownProps) => {
    if (option) {
      return <>{option.code}｜{option.name}</>
    }

    return props?.placeholder
  }

  return (
    <form className="flex column-gap-2">
      <label>
        <span className="mr-2 text-sm">訂單日期</span>
        <Calendar
          value={date}
          onChange={handleCalendar}
          dateFormat="yy/mm/dd"
          maxDate={new Date()}
          minDate={pastTwoYears}
          pt={{
            input: {
              root: {
                className: "py-2 text-sm w-10rem"
              }
            },
          }}
        />
      </label>
      <label>
        <span className="mr-2 text-sm">客戶編號</span>
        <Dropdown
          value={custID}
          filter
          showClear
          onChange={handleCustId}
          options={custIDList}
          optionLabel="code"
          placeholder="選填"
          itemTemplate={custIDDropdownTemplate}
          pt={{
            input: {
              className: "py-2 text-sm w-8rem"
            },
            trigger: {
              style: {
                width: "2.5rem"
              }
            },
            clearIcon: {
              style: {
                right: "2.5rem"
              }
            }
          }}
        />
      </label>

      {/* <Button
        label="搜尋"
        onClick={handleSearch}
        pt={{
          root: {
            className: "py-0"
          },
          label: {
            className: "text-sm font-normal"
          }
        }}
      /> */}
    </form>)
})