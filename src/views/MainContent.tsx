/**
 * @file MainContent.tsx
 * @description 主要內容元件，整合訂單進度搜尋表單、虛擬化表格與各種狀態顯示
 * @module views/MainContent
 * @returns {React.ReactElement} 回傳完整的主畫面元件，包含搜尋表單、資料顯示與狀態
 */

/**
 * 型別定義
 * INITIAL_STATE: 初始狀態常數
 * @constant {InitialState} 
 * @description 定義網頁啟動時的預設狀態
 * @property {Date[]} dateRange - 預設日期範圍，過去一年到今天
 * @property {DataLengthProps} dataLength - 表格資料長度的初始狀態
 * @property {TablePinSortState} pinSortState - 表格釘選和排序的初始狀態
 * @property {TablePinSortHandler} pinSortHandler - 表格釘選和排序處理函數的初始狀態
 * @property {Object} table - TanStack Table 的初始排序狀態
 */

import { useState, memo } from 'react';
import { useOrderData } from 'src/features/order';

// Components
import { VirtualizedTable } from 'src/components/VirtualizedTable';
import { CacheTime } from 'src/components/CacheTime';
import { ResponseStatus } from 'src/components/ResponseStatus';
import { NoMatchingDataMessage } from 'src/components/NoMatchingDataMessage';
import { OrderQueryForm } from 'src/components/OrderQueryForm';
import { DataLength, type DataLengthProps } from 'src/components/DataLength';
import { DownloadButton } from 'src/components/DownloadButton';
import { ClearButton } from 'src/components/ClearButton';

// Types
import { ApiProps } from "src/features/order/types";
import { InitialState, TablePinSortState, TablePinSortHandler } from 'src/types/stateTypes';

// Styles
import style from 'src/components/VirtualizedTable/style.module.scss';

export const MainContent = memo(() => {
  const [searchParams, setSearchParams] = useState<ApiProps>({ orderDate: INITIAL_STATE.dateRange });
  const [dataLength, setDataLength] = useState<DataLengthProps>(INITIAL_STATE.dataLength);
  const [tablePinSortState, setTablePinSortState] = useState<TablePinSortState>(INITIAL_STATE.pinSortState);
  const [tablePinSortHandler, setTablePinSortHandler] = useState<TablePinSortHandler>(INITIAL_STATE.pinSortHandler);
  const { orders, isLoading, isCaching, error, message } = useOrderData(searchParams);

  return (<>
    <section className='flex flex-column-reverse xl:flex-row align-items-start xl:align-items-center justify-content-between mt-1 mb-2 md:mb-3'>
      <div className='flex column-gap-2 flex-column md:flex-row'>
        <DataLength dataLengthProps={dataLength} />
        <div className='flex column-gap-2'>
          <ClearButton isShow={tablePinSortState.isPinned} label='清除釘選' clearHandler={tablePinSortHandler.handleClearAllPin} className='py-1' />
          <ClearButton isShow={tablePinSortState.isSorted} label='清除排序' clearHandler={tablePinSortHandler.handleClearAllSort} className='py-1' />
        </div>
      </div>
      <div className='w-full xl:w-auto flex column-gap-3 flex-column-reverse md:flex-row mb-2 xl:mb-0 -mt-6 md:mt-0 justify-content-between xl:justify-content-start'>
        <OrderQueryForm setSearchParams={setSearchParams} />
        <DownloadButton searchParams={searchParams} className='text-right mb-3 md:mb-0' />
      </div>
    </section>
    <div className={style.tableWrap}>
      <ResponseStatus
        error={error}
        message={message}
        isLoading={isLoading}
        isCaching={isCaching}
      />
      <NoMatchingDataMessage
        isPendingOrError={Boolean(error) || isLoading || isCaching}
        hasMatchingData={dataLength.filterRowLength > 0}
      />
      <VirtualizedTable
        rowData={orders}
        initialState={INITIAL_STATE.table}
        setDataLength={setDataLength}
        setTablePinSortState={setTablePinSortState}
        setTablePinSortHandler={setTablePinSortHandler}
      />
    </div>
    <CacheTime className='mt-2 mr-1 text-sm text-right' />
  </>)
})

//#region Initial Data
// 用於 useState 的 Initial Data
const today = new Date();
const pastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

const INITIAL_STATE: InitialState = {
  dateRange: [pastYear, today],
  dataLength: {
    columnLength: 0,
    rowLength: 0,
    isFilter: false,
    filterRowLength: 0,
    handelClearAllFilters: () => { }
  },
  pinSortState: {
    isPinned: false,
    isSorted: false
  },
  pinSortHandler: {
    handleClearAllPin: () => { },
    handleClearAllSort: () => { }
  },
  table: {
    sorting: [
      {
        id: 'department',
        desc: true
      }
    ]
  }
}