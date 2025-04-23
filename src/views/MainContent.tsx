import { useState, memo } from 'react';
import { useOrderData } from 'src/features/order';

// Components
import { VirtualizedTable } from 'src/components/VirtualizedTable';
import { SearchForm } from 'src/components/SearchForm';
import { DataLength, dataLengthProps } from 'src/components/DataLength';
import { DownloadButton } from 'src/components/DownloadButton';
import { ClearAllPinButton, pinListProps } from 'src/components/ClearAllPinButton';

// Types
import { ApiProps } from "src/features/order/types";


//#region Initial Data
// 用於 useState 的 Initial Data
const today = new Date();
const pastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
const initialDateRange = [pastYear, today];
const initialPinList: pinListProps = {
  hasPin: false,
  table: null
}
const initialDataLength: dataLengthProps = {
  columnLength: 0,
  rowLength: 0,
  isFilter: false,
  filterRowLength: 0,
  handelClearAllFilters: () => { }
}

// VirtualizedTable 的 Initial Data
const initialTable = {
  sorting: [
    {
      id: 'department',
      desc: true
    }
  ]
};
//#endregion

export const MainContent = memo(() => {
  const [searchParams, setSearchParams] = useState<ApiProps>({ orderDate: initialDateRange });
  const [dataLength, setDataLength] = useState<dataLengthProps>(initialDataLength);
  const [pinList, setPinList] = useState<pinListProps>(initialPinList);
  const { orders, isLoading, isCaching, error, message } = useOrderData(searchParams);

  return (<>
    <section className='flex flex-column-reverse xl:flex-row align-items-start xl:align-items-center justify-content-between mt-1 mb-3'>
      <div className='flex column-gap-2'>
        <DataLength dataLengthProps={dataLength} />
        <ClearAllPinButton pinListProps={pinList} />
      </div>
      <div className='w-full xl:w-auto flex column-gap-3 flex-column md:flex-row mb-2 xl:mb-0 justify-content-between xl:justify-content-start'>
        <SearchForm setSearchParams={setSearchParams} />
        <DownloadButton searchParams={searchParams} className='hidden md:block align-content-end' />
      </div>
    </section>
    <VirtualizedTable
      error={error}
      message={message}
      isLoading={isLoading}
      isCaching={isCaching}
      rowData={orders}
      initialState={initialTable}
      setDataLength={setDataLength}
      setPinList={setPinList}
    />
  </>)
})