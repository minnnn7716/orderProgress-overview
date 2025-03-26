import { useState, memo } from 'react';
import { useFetchData } from 'src/api/fetchData';

// Components
import { VirtualizedTable } from 'src/components/VirtualizedTable';
import { SearchForm } from 'src/components/SearchForm';
import { DataLength } from 'src/components/DataLength';
import { DownloadButton } from 'src/components/DownloadButton';

// Types
import { apiProps } from "src/api/fetchData";
import { dataLengthProps } from 'src/components/DataLength';

//#region Initial Data
// 用於 useState 的 Initial Data
const today = new Date();
const pastYear = new Date(today.setFullYear(today.getFullYear() - 1));
const initialDataLength: dataLengthProps = {
  columnLength: 0,
  rowLength: 0,
  table: null
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
  const [searchParams, setSearchParams] = useState<apiProps>({ orderDate: [pastYear, new Date()] });
  const [dataLength, setDataLength] = useState<dataLengthProps>(initialDataLength);
  const { data, isLoading, isCaching, error, message } = useFetchData(searchParams);

  return (<>
    <section className='flex align-items-center justify-content-between mt-1 mb-2'>
      <DataLength dataLengthProps={dataLength} />
      <div className='flex column-gap-3'>
        <SearchForm setSearchParams={setSearchParams} />
        <DownloadButton searchParams={searchParams} />
      </div>
    </section>
    <VirtualizedTable
      error={error}
      message={message}
      isLoading={isLoading}
      isCaching={isCaching}
      rowData={data}
      initialState={initialTable}
      setDataLength={setDataLength}
    />
  </>)
})