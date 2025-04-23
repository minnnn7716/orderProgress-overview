import { memo } from 'react'

// Types
import { CellContext } from '@tanstack/react-table'
import { ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';

// Utilities
import { formatDate } from 'src/utils/formatDate'

export const TableCellContent = memo((
  cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>
) => {
  const { columnInfo, columnKey } = cellCtx.column.columnDef.meta ?? {};
  
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
        content = `${(rate.toFixed(2))}%`
      }
    }
  }

  return <>{String(content)}</>
})