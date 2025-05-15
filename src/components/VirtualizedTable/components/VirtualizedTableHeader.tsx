/**
 * @file VirtualizedTableHeader.tsx
 * @description 虛擬化表格 thead 元件，將表格拆分提高易讀性與維護性
 * @module components/VirtualizedTable/components/VirtualizedTableHeader
 * @returns {React.ReactElement} 回傳虛擬化表格的表格標題
 * @example
 * <TableHeader
 *   table={table}
 *   leftColumns={leftPinnedColumns}
 *   centerColumns={centerColumns}
 *   columnSizing={columnSizing}
 *   virtualItems={columnVirtualizer.getVirtualItems()}
 *   virtualPaddingLeft={columnVirtualizer.getVirtualPadding('start')}
 *   virtualPaddingRight={columnVirtualizer.getVirtualPadding('end')}
 * />
 */

/**
 * 型別定義
 * TableHeaderProps: 表格標題元件傳入參數
 * @typedef TableHeaderProps
 * @property {Table<RowData>} table - TanStack Table 實體
 * @property {Column<RowData, unknown>[]} leftColumns - 左側釘選的欄位陣列
 * @property {Column<RowData, unknown>[]} centerColumns - 中間可滾動的欄位陣列
 * @property {ColumnSizingState} columnSizing - 欄位寬度狀態
 * @property {VirtualItem[]} virtualItems - 虛擬化的欄位項目
 * @property {number} [virtualPaddingLeft] - 左側虛擬內容的填充寬度
 * @property {number} [virtualPaddingRight] - 右側虛擬內容的填充寬度
 */

import { memo } from 'react';

// Components
import { TableColumn } from './TableColumn';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

// Types
import { Table, Column, ColumnSizingState } from '@tanstack/react-table';
import { VirtualItem } from "@tanstack/react-virtual";
import { RowData } from 'src/types/dataTypes';

// Utils
import { getCommonPinningStyles, getColumnWidth } from '../utils/tableUtils';

// Styles
import style from '../style.module.scss';

type TableHeaderProps = {
  table: Table<RowData>;
  leftColumns: Column<RowData, unknown>[];
  centerColumns: Column<RowData, unknown>[];
  columnSizing: ColumnSizingState;
  virtualItems: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const TableHeader = memo(({
  table,
  leftColumns,
  centerColumns,
  columnSizing,
  virtualItems,
  virtualPaddingLeft,
  virtualPaddingRight
} : TableHeaderProps) => {
  return <thead className={style.thead}>
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {/* SortableContext 為 dnd-kit 提供用於包覆拖曳物件的元件 */}
        <SortableContext
          items={leftColumns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {/* 渲染左側釘選的 Columns，沒有使用 Virtualize */}
          {leftColumns.map(column => {
            const header = headerGroup.headers.find(h => h.column.id === column.id);
            if (!header) return null;

            return <TableColumn
              key={header.id}
              header={header}
              column={column}
              styleProps={{
                ...getCommonPinningStyles(
                  column.id,
                  columnSizing,
                  leftColumns,
                  table.getLeftVisibleLeafColumns,
                  column.getIsLastColumn,
                  column.getIsPinned(),
                ),
                width: getColumnWidth(columnSizing[column.id]),
              }}
            />
          })}
        </SortableContext>

        {/* 渲染其餘沒有釘選的 Columns，使用 Virtualize */}
        {virtualPaddingLeft ? (
          <th style={{ width: virtualPaddingLeft }} />
        ) : null}

        <SortableContext
          items={centerColumns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {virtualItems.map(vc => {
            // 防止超出邊界
            if (vc.index >= centerColumns.length) return null;

            const column = centerColumns[vc.index];
            if (!column) return null;

            const header = headerGroup.headers.find(h => h.column.id === column.id);
            if (!header) return null;

            return <TableColumn
              key={header.id}
              header={header}
              column={column}
              styleProps={{ width: getColumnWidth(columnSizing[column.id]) }}
            />
          })}
        </SortableContext>

        {virtualPaddingRight ? (
          <th style={{ width: virtualPaddingRight }} />
        ) : null}
      </tr>
    ))}
  </thead>
})