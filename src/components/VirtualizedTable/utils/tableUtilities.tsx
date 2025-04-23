import { CSSProperties } from 'react';

// Types
import { Table, Column, CellContext } from '@tanstack/react-table';
import { ColumnMetaKey, ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';

// Styles
import { remindStyle } from 'src/config/remindStyle';

// Constants
const DEFAULT_COLUMN_WIDTH = 200;
const MIN_COLUMN_WIDTH = 150;

// #region 產生警示樣式
// 警示規則：
// 1. 若 cell 的 columnInfo 裡面有對應的欄位（correspondColumn），且該欄位的值爲 'error'，則顯示警示樣式
// 2. 若 cell 的 columnKey 爲 'rcvFabRate' 或 'poRate'，且該欄位的值爲數字，則顯示警示樣式
export const getRemindStyle = (cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>) => {
  const rowData = cellCtx.row.original;
  const { columnInfo, columnKey } = cellCtx.column.columnDef.meta ?? {};
  const rawValue = cellCtx.getValue();

  if (columnInfo.correspondColumn !== '' && rowData[columnInfo.correspondColumn as ColumnMetaKey] === 'error') {
    return remindStyle.warning
  }

  if ((columnKey === 'rcvFabRate' || columnKey === 'poRate') && (typeof rawValue === 'number')) {
    const rate = (rawValue * 100);

    return (rate > 100
      ? remindStyle.error
      : rate >= 80 && rate <= 100
        ? remindStyle.warning
        : {})
  }

  return {};
}
// #endregion

// #region 產生釘選樣式
// 
export const getCommonPinningStyles = (table: Table<RowData>, columnSizing: Record<string, number>, column: Column<RowData>, leftColumns: Column<RowData>[], index?: number): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')

  // 取得 column 的 index 位置，用於計算「釘選」的定位
  const columnIndex = index !== undefined
    ? index
    : (isPinned === 'left'
      ? leftColumns.findIndex(col => col.id === column.id)
      : undefined)

  // 計算「釘選」的定位
  const leftPosition = isPinned === 'left'
    ? table.getLeftVisibleLeafColumns()
      .slice(0, columnIndex)
      .reduce((acc, col) => acc + (columnSizing[col.id] === undefined ? 200 : Math.max(columnSizing[col.id], 150)), 0)
    : undefined;

  return {
    borderRight: isLastLeftPinnedColumn ? '1px solid #00000020' : undefined,
    left: isPinned === 'left' ? `${leftPosition}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 1 : 0,
  }
}
// #endregion

export const getColumnWidth = (columnSizing: number | undefined): number => {
  return columnSizing === undefined
    ? DEFAULT_COLUMN_WIDTH
    : Math.max(columnSizing, MIN_COLUMN_WIDTH)
};