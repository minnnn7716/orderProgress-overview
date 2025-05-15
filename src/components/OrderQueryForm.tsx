/**
 * @file OrderQueryForm .tsx
 * @description 用於選取條件發送 API 取回指定範圍的訂單資料，查詢條件包含日期範圍與客戶代碼
 * @module components/OrderQueryForm 
 * @returns {React.ReactElement} 回傳包含日期範圍選擇器與客戶代碼下拉選單的表單
 * @example
 * <OrderQueryForm 
 *   setSearchParams={setOrderSearchParams}
 * />
 */

/**
 * 型別定義
 * OrderQueryForm Props: 搜尋表單元件傳入參數
 * @typedef OrderQueryForm Props
 * @property {Dispatch<SetStateAction<ApiProps>>} setSearchParams - 設定 API 查詢參數的狀態更新函數
 * 
 * ApiProps: API 查詢參數
 * @typedef {Object} ApiProps
 * @property {Date[]} orderDate - 訂單日期範圍
 * @property {string} custId - 客戶代碼
 */

import { useState, useCallback, memo } from "react"

// Components
import { Calendar } from 'primereact/calendar';
import { Dropdown, type DropdownChangeEvent, type DropdownProps } from 'primereact/dropdown';

// Types
import { Dispatch, SetStateAction } from "react"
import { FormEvent, Nullable } from "primereact/ts-helpers";
import { custIdList, custIdType } from "src/config/custIdList";
import { ApiProps } from "src/features/order";

const today = new Date();
const pastYear = new Date(today.setFullYear(today.getFullYear() - 1));
const initialDateRange = [pastYear, new Date()];

export const OrderQueryForm = memo(({
  setSearchParams
}: { setSearchParams: Dispatch<SetStateAction<ApiProps>> }) => {
  const [dateRange, setDateRange] = useState<Nullable<(Date | null)[]>>(initialDateRange);
  const [custId, setCustId] = useState<custIdType | null>(null);

  const handleCalendarRange = useCallback((e: FormEvent<Date[]>) => {
    // 預設選取區間為過去一年
    if (!e.value) { return initialDateRange;}

    const [from, to] = e.value;
    let orderDate = initialDateRange;

    // 若起訖其中一個沒有值，則讓起訖日期相同
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
    setCustId(e.value);

    setSearchParams(prev => ({
      ...prev,
      custId: e.value && e.value.code ? e.value.code : ''
    }))
  }, [setSearchParams]);

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
          value={custId}
          filter
          showClear
          showFilterClear
          onChange={handleCustId}
          options={custIdList}
          optionLabel="code"
          placeholder="選填"
          itemTemplate={custIdDropdownTemplate}
          pt={dropdownPt}
        />
      </label>
    </form>)
})

// 傳入的下拉選單的模板
const custIdDropdownTemplate = (option: custIdType, props?: DropdownProps) => {
  if (option) {
    return <>{option.code}｜{option.name}</>
  }

  return <>{props?.placeholder}</>
}

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