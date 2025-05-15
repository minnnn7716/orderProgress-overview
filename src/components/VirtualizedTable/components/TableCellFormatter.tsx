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
  const rawValue = cellCtx.getValue() ?? '';
  const isDateTime = columnInfo?.format === 'date-time';
  const needConvertToRate = columnKey === 'rcvFabRate' || columnKey === 'poRate';

  if (isDateTime) {
    return formatDate(String(rawValue));
  }

  if (needConvertToRate) {
    const convertValue = typeof rawValue === 'number' && (rawValue * 100);
    return convertValue ? convertValue .toFixed(2) : '';
  }

  return <>{String(rawValue)}</>
})