/**
 * @file DataLength.tsx
 * @description 資料長度顯示元件，用於顯示表格的欄位數量、資料筆數及篩選結果數量
 * @module components/DataLength
 * @returns {React.ReactNode} 回傳資料長度顯示及篩選清除按鈕
 * @example
 * <DataLength
 *   dataLengthProps={{
 *     columnLength: 15,
 *     rowLength: 500,
 *     isFilter: true,
 *     filterRowLength: 100,
 *     handelClearAllFilters: clearAllFilters
 *   }}
 * />
 */

/**
 * 型別定義
 * DataLengthProps: 資料長度顯示元件傳入參數
 * @typedef DataLengthProps
 * @property {number} columnLength - 表格的欄位數量
 * @property {number} rowLength - 表格的總資料筆數
 * @property {boolean} isFilter - 是否有篩選條件
 * @property {number} filterRowLength - 篩選後的資料筆數
 * @property {function} handelClearAllFilters - 清除所有篩選的回調函數
 */

import { memo, ReactNode } from 'react';

// Components
import { ClearButton } from './ClearButton';

// Type
import { classNames } from 'primereact/utils';

export type DataLengthProps = {
  columnLength: number;
  rowLength: number;
  isFilter: boolean;
  filterRowLength: number;
  handelClearAllFilters: () => void
}

export const DataLength = memo(({ dataLengthProps }: { dataLengthProps: DataLengthProps }): ReactNode => {
  const { columnLength, rowLength, isFilter, filterRowLength, handelClearAllFilters } = dataLengthProps;

  return (
    <div className='m-0 flex align-items-start column-gap-2'>
      {/* 顯示原始資料欄與行數 */}
      <p className='m-0 mb-2 md:mb-0 py-1 px-3 bg-bluegray-500 text-sm text-white border-round-2xl'>
        總共 {columnLength} 欄、<span className='inline-block text-center'>{rowLength}</span> 筆資料
      </p>

      {/* 顯示篩選後欄與行數，提供一次清除所有篩選的按鈕 */}
      <div
        className={
          classNames('transition-all transition-duration-300 transition-ease-in',
            isFilter ? 'max-w-max h-auto opacity-100' : 'max-w-0 overflow-hidden opacity-0')
        }
        style={{ height: isFilter ? 'auto' : 0 }}
      >
        <p className='flex m-0 py-0 pl-3 bg-yellow-300 text-sm border-round-2xl'>
          <span className='py-1 mr-2 inline-block'>
            篩選後共 <strong>{filterRowLength}</strong> 筆
          </span>
          <ClearButton isShow={isFilter} label='清除篩選' clearHandler={handelClearAllFilters} />
        </p>
      </div>
    </div>)
})


