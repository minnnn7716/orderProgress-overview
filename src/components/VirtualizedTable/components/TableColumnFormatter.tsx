import { memo } from 'react'

// Types
import { HeaderContext } from '@tanstack/react-table'
import { RowData } from 'src/types/dataTypes';

export const TableColumnContent = memo((headerCtx: HeaderContext<RowData, RowData>) => {
  const { columnKey, columnInfo } = headerCtx.column.columnDef.meta ?? {};

  return <>
    { columnInfo.description }
    { import.meta.env.DEV ? <span className='block mt-1 text-xs font-normal'>{columnKey}</span> : '' }
  </>
});