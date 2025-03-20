import { useState, memo } from 'react';
import { useFetchData } from 'src/api/fetchData';

// Component
import { VirtualizedTable } from 'src/components/VirtualizedTable';
import { SearchForm } from 'src/components/SearchForm';
import { DataLength } from 'src/components/DataLength';

// Type
import { apiParams } from "src/api/fetchData";
import { dataLengthProps } from 'src/components/DataLength';

const today = new Date();
const yesterDay = new Date(today.setDate(today.getDate() - 1));
const initialDataLength: dataLengthProps = {
  columnLength: 0,
  rowLength: 0,
  table: null
}

export const MainContent = memo(() => {
  const [searchParams, setSearchParams] = useState<apiParams>({ orderDate: yesterDay });
  const [dataLength, setDataLength] = useState<dataLengthProps>(initialDataLength);
  const { data, isLoading, error, message } = useFetchData(searchParams);

  console.log('error: ', error);

  return (<>
    <section className='flex align-items-center justify-content-between mt-1 mb-2'>
      <DataLength dataLengthProps={dataLength} />
      <SearchForm setSearchParams={setSearchParams} />
    </section>
    <VirtualizedTable
      error={error}
      message={message}
      isLoading={isLoading}
      rowData={data}
      initialState={{ sorting: [{ id: 'department', desc: true }] }}
      setDataLength={setDataLength}
    />
  </>)
})