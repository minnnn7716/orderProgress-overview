/**
 * @file TableCellFormatter.tsx
 * @description 表格 Cell 格式化元件，用於根據不同資料類型顯示格式化後的內容，傳入 generateTable 作為格式化模板 
 * @module components/VirtualizedTable/components/TableCellFormatter
 * @returns {React.ReactElement} 回傳經過格式化的表格 Cell 內容
 * @example
 * <TableCellContent {...cellContext} />
 */

/**
 * 型別定義
 * CellContext: Cell 上下文參數，以下皆為 TanStack Table 提供的屬性
 * @typedef {CellContext<RowData, ColumnValueType<ColumnDefinition>>} CellContext
 * @property {Object} column - 欄位資訊，包含 columnDef 等屬性
 * @property {Function} getValue - 獲取 Cell 值的函式
 * @property {Object} meta - 包含 columnInfo 和 columnKey 等資訊
 */

import { memo } from 'react'

// Types
import { CellContext } from '@tanstack/react-table'
import { ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';

// Utilities
import { formatDate } from 'src/utils/formatDate'

export const TableCellFormatter = memo((
  cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>
) => {
  const { columnInfo, columnKey } = cellCtx.column.columnDef.meta ?? {};
  const rawValue = cellCtx.getValue() ?? '';
  const isDateTime = columnInfo?.format === 'date-time';
  const needConvertToRate = columnKey === 'rcvFabRate' || columnKey === 'poRate';

  // 轉換為日期格式
  if (isDateTime) {
    return formatDate(String(rawValue));
  }

  // 轉換為百分比並取到小數點第二位格式
  if (needConvertToRate) {
    const convertValue = typeof rawValue === 'number' && (rawValue * 100);
    return convertValue ? convertValue .toFixed(2) : '';
  }

  return <>{String(rawValue)}</>
})