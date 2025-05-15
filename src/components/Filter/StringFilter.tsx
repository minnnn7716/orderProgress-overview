/**
 * @file StringFilter.tsx
 * @description 文字篩選元件，用於表格 Column 中篩選字串內容
 * @module components/Filter/StringFilter
 * @returns {React.ReactElement} 回傳 PrimeReact 的 InputText 元件
 * @example
 * 傳入範例可見 src/components/VirtualizedTable/components/TableColumn.tsx
 * <StringFilter
 *   columnFilterValue={'搜尋文字'}
 *   setFilterValue={setSearchText}
 * />
 */

/**
 * 型別定義
 * StringFilterProps: 文字篩選器傳入參數
 * @typedef StringFilterProps
 * @property {string | undefined} columnFilterValue - 傳入目前已輸入的篩選文字，若無則會傳入 undefined
 * @property {function} setFilterValue - 用於將新的篩選值設置到表格狀態的回呼函式
 */

import { useState, useEffect, useCallback, memo, type ChangeEvent } from 'react'

// Components
import { InputText } from "primereact/inputtext";

export type StringFilterProps = {
  columnFilterValue: string | undefined;
  setFilterValue: (updater: string) => void;
}

export const StringFilter = memo(({
  columnFilterValue,
  setFilterValue
}: StringFilterProps) => {
  const [value, setValue] = useState<string>(columnFilterValue ?? '');

  useEffect(() => {
    setValue(columnFilterValue ?? '');
  }, [columnFilterValue]);

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      setFilterValue(event.target.value)
    }
    , [setFilterValue]);

  return <InputText
    placeholder='Search...'
    value={value}
    onChange={handleTextChange}
    pt={inputTextPt}
  />
}, (oldProps, newProps) => oldProps.columnFilterValue === newProps.columnFilterValue);

const inputTextPt = {
  root: {
    className: "relative w-full py-2 text-sm"
  }
}