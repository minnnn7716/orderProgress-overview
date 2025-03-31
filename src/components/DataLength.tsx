import { memo, ReactNode, useCallback } from 'react';

// Components
import { Button } from 'primereact/button';

// Type
import { Table } from '@tanstack/react-table';
import { RowData } from 'src/types/dataTypes';
import { classNames } from 'primereact/utils';

export type dataLengthProps = {
  columnLength: number;
  rowLength: number;
  table: Table<RowData> | null
}

export const DataLength = memo(({ dataLengthProps }: { dataLengthProps: dataLengthProps }): ReactNode => {
  const { columnLength, rowLength, table } = dataLengthProps;

  const handelClearAllFilters = useCallback((table: Table<RowData>) => {
    table.setColumnFilters([]);
    table.setGlobalFilter('');
    table.resetColumnFilters();
  }, [])

  if (!table) {
    return null
  }

  const { columnFilters } = table.getState();
  const hasActiveFilters = columnFilters.length > 0;

  return (<div className='m-0 flex flex-column md:flex-row align-items-start'>
    <p className='m-0 mr-2 mb-2 lg:mb-0 py-1 px-3 bg-bluegray-500 text-sm text-white border-round-2xl'>
      總共 {columnLength} 欄、<span className='inline-block w-1rem text-center'>{rowLength}</span> 筆資料
    </p>

    <p className={classNames('flex m-0 py-0 pl-3 bg-yellow-300 text-sm border-round-2xl transition-all transition-duration-200 transition-ease-in',
      hasActiveFilters ? 'opacity-100' : 'opacity-0'
    )}>
      <span className='py-1 mr-2 inline-block'>
        篩選後共 <strong>{table.getFilteredRowModel().rows.length.toLocaleString()}</strong> 筆資料
      </span>
      <Button
        rounded
        severity="warning"
        label="清除篩選"
        icon="pi pi-times"
        onClick={() => handelClearAllFilters(table)}
        pt={{
          root: {
            className: 'py-0 px-2 outline-none'
          },
          label: {
            className: 'text-sm font-normal'
          }
        }}
      />
    </p>
  </div>)
})


