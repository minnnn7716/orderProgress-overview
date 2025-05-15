/**
 * @file SelectFilter.tsx
 * @description 下拉選單篩選元件，用於表格 Column 中篩選字串值
 * @module components/Filter/SelectFilter
 * @returns {React.ReactElement} 回傳 PrimeReact 的 Dropdown 元件
 * @example
 * 傳入範例可見 src/components/VirtualizedTable/components/TableColumn.tsx
 * <SelectFilter
 *   enableFilter={true}
 *   facetedUniqueKeys={['選項1', '選項2', '選項3']}
 *   columnFilterValue={'選項1'}
 *   setFilterValue={setSelectedOption}
 * />
 */

/**
 * 型別定義
 * StringFilterProps: 下拉選單篩選器傳入參數
 * @typedef StringFilterProps
 * @property {boolean} enableFilter - 是否啟用選單中的搜尋篩選功能
 * @property {string[]} facetedUniqueKeys - 用於傳入下拉選單中的項目清單
 * @property {string | undefined} columnFilterValue - 傳入目前已選擇的選項，若無則會傳入 undefined
 * @property {function} setFilterValue - 用於將新的篩選值設置到表格狀態的回呼函式
 */

import { memo, useMemo, useCallback } from 'react'

// Components
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';

type StringFilterProps = {
  enableFilter: boolean;
  facetedUniqueKeys: string[];
  columnFilterValue: string | undefined;
  setFilterValue: (updater: string) => void;
}

export const SelectFilter = memo(({
  enableFilter,
  facetedUniqueKeys,
  columnFilterValue,
  setFilterValue
}: StringFilterProps) => {
  const sortedUniqueValues = useMemo(() => facetedUniqueKeys.sort(), [facetedUniqueKeys])

  const handleSetDropdownValue = useCallback(
    (e: DropdownChangeEvent) => setFilterValue(e.value)
    , [setFilterValue]);

  return <Dropdown
    showClear
    showFilterClear={enableFilter}
    filter={enableFilter}
    value={columnFilterValue ?? null}
    onChange={handleSetDropdownValue}
    options={sortedUniqueValues}
    placeholder="Dropdown..."
    pt={dropdownPt}
  />
}, (oldProps, newProps) => oldProps.columnFilterValue === newProps.columnFilterValue
  && JSON.stringify(oldProps.facetedUniqueKeys) === JSON.stringify(newProps.facetedUniqueKeys));

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
      right: "2rem",
    }
  },
  filterInput: {
    className: "py-2 text-sm"
  },
  itemLabel: {
    className: "text-sm"
  },

};