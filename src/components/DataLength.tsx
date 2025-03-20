import { memo, ReactNode } from 'react';
import { classNames } from 'primereact/utils';

// Type
import { Table } from '@tanstack/react-table';
import { CellDataFor } from 'src/types/dataTypes';

export type dataLengthProps = {
  columnLength: number;
  rowLength: number;
  table: Table<CellDataFor> | null
}


export const DataLength = memo(({ dataLengthProps }: { dataLengthProps: dataLengthProps}): ReactNode => {
  const { columnLength, rowLength, table } = dataLengthProps

  if (!table) {
    return null
  }

  return (<p className='m-0'>
    <span className='text-sm bg-bluegray-500 text-white py-1 px-3 border-round-2xl mr-2'>總共 {`${columnLength}`} 欄、{`${rowLength}`} 筆資料</span>
    <span className={classNames(
      'text-sm bg-yellow-300 py-1 px-3 border-round-2xl transition-all transition-duration-200 transition-ease-in',
      table.getState().columnFilters.length || Object.keys(table.getState().globalFilter).length ? 'opacity-100' : 'opacity-0'
    )}>
      篩選後共 <strong>{table.getFilteredRowModel().rows.length.toLocaleString()}</strong> 筆資料
    </span>
  </p>)
})