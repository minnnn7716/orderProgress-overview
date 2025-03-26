import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'primereact/utils';

// Components
import { Button } from 'primereact/button';

// Type
import { Table } from '@tanstack/react-table';
import { RowData } from 'src/types/dataTypes';

export type dataLengthProps = {
  columnLength: number;
  rowLength: number;
  table: Table<RowData> | null
}

export const DataLength = memo(({ dataLengthProps }: { dataLengthProps: dataLengthProps}): ReactNode => {
  const { columnLength, rowLength, table } = dataLengthProps

  const handelClearAllFilters = useCallback((table: Table<RowData>) => {
    table.setColumnFilters([]);
    table.setGlobalFilter('');
    table.resetColumnFilters();
  }, [])

  if (!table) {
    return null
  }

  return (<p className='m-0 flex'>
    <span className='inline-block text-sm bg-bluegray-500 text-white py-1 px-3 border-round-2xl mr-2'>總共 {`${columnLength}`} 欄、{`${rowLength}`} 筆資料</span>
    <span className={classNames(
      'flex text-sm bg-yellow-300 py-0 pl-3 border-round-2xl transition-all transition-duration-200 transition-ease-in',
      table.getState().columnFilters.length || Object.keys(table.getState().globalFilter).length ? 'opacity-100' : 'opacity-0'
    )}>
      <span className='py-1 mr-2 inline-block'>篩選後共 <strong>{table.getFilteredRowModel().rows.length.toLocaleString()}</strong> 筆資料</span>
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
    </span>
  </p>)
})