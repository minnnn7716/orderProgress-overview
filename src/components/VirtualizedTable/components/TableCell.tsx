import { memo } from 'react'

// Types
import { CellContext } from '@tanstack/react-table'
import { ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';

// Utilities
import { formatDate } from 'src/utilities/formatDate'

export const TableCell = memo((
  cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>
) => {
  const { columnInfo, columnKey, getContentLength } = cellCtx.column.columnDef.meta ?? {};
  const overrow = getContentLength ? getContentLength(cellCtx) : false;

  const rawValue = cellCtx.getValue();
  let content = rawValue;

  if (columnInfo.format === 'date-time') {
    content = formatDate(String(content));
  }

  if (rawValue == null) {
    content = ''
  }

  if (columnKey === 'rcvFabRate' || columnKey === 'poRate') {
    if (typeof rawValue === 'number') {
      const rate = (rawValue * 100);

      if (rate > 0) {
        content = `${((rate * 100).toFixed(2))}%`
      }
    }
  }

  

  return (
    <div data-overrow={overrow}>
      {String(content)}
    </div>
  )
})