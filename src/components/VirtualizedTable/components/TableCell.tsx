import { memo } from 'react'

// Types
import { CellContext } from '@tanstack/react-table'
import { ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';

// Utilities
import { formatDate } from 'src/utilities/formatDate'

export const TableCell = memo((
  cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>
) => {
  const { meta } = cellCtx.column.columnDef;
  const info = meta?.getInfo ?? '';
  const key = meta?.getKey ?? '';

  const rawValue = cellCtx.getValue();
  let content = rawValue;

  if (info.format === 'date-time') {
    content = formatDate(String(content));
  }

  if (rawValue == null) {
    content = ''
  }

  if (key === 'rcvFabRate' || key === 'poRate') {
    if (typeof rawValue === 'number') {
      const rate = rawValue * 100;

      if (rate > 0) {
        content = `${(rate * 100)}%`
      }
    }
  }

  return (
    <div data-overrow={meta?.getContentLength(cellCtx)}>
      {String(content)}
    </div>
  )
})