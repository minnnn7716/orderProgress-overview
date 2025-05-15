/**
 * @file VirtualizedTableBody.tsx
 * @description 虛擬化表格 tbody 元件，將表格拆分提高易讀性與維護性
 * @module components/VirtualizedTable/components/VirtualizedTableBody
 * @returns {React.ReactElement} 回傳虛擬化表格的表格主體
 * @example
 * <TableBody
 *   table={table}
 *   rows={table.getRowModel().rows}
 *   rowVirtualizer={rowVirtualizer}
 *   leftColumns={leftColumns}
 *   centerColumns={centerColumns}
 *   columnSizing={columnSizing}
 *   virtualRows={rowVirtualizer.getVirtualItems()}
 *   virtualItems={columnVirtualizer.getVirtualItems()}
 *   virtualPaddingLeft={columnVirtualizer.getVirtualPadding('start')}
 *   virtualPaddingRight={columnVirtualizer.getVirtualPadding('end')}
 * />
 */

/**
 * 型別定義
 * TableBodyProps: 表格主體元件傳入參數
 * @typedef TableBodyProps
 * @property {Table<RowData>} table - TanStack Table 實體
 * @property {Row<RowData>[]} rows - 表格行資料陣列
 * @property {Virtualizer<HTMLDivElement, Element>} rowVirtualizer - 行虛擬化處理器
 * @property {Column<RowData, unknown>[]} leftColumns - 左側釘選的欄位陣列
 * @property {Column<RowData, unknown>[]} centerColumns - 中間可滾動的欄位陣列（除了釘選外的欄位）
 * @property {ColumnSizingState} columnSizing - 欄位寬度狀態
 * @property {VirtualItem[]} virtualRows - 虛擬化的行項目
 * @property {VirtualItem[]} virtualItems - 虛擬化的列項目
 * @property {number} [virtualPaddingLeft] - 左側虛擬內容的填充寬度
 * @property {number} [virtualPaddingRight] - 右側虛擬內容的填充寬度
 */

import { memo } from "react";

// Components
import { TableCell } from "./TableCell";

// Types
import { Table, Row, Column, ColumnSizingState } from '@tanstack/react-table'
import { Virtualizer, VirtualItem } from "@tanstack/react-virtual";
import { RowData } from 'src/types/dataTypes';

// Utils
import { getCommonPinningStyles, getColumnWidth } from '../utils/tableUtils';

// Styles
import style from '../style.module.scss'

type TableBodyProps = {
  table: Table<RowData>;
  rows: Row<RowData>[];
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  leftColumns: Column<RowData, unknown>[];
  centerColumns: Column<RowData, unknown>[];
  columnSizing: ColumnSizingState;
  virtualRows: VirtualItem[];
  virtualItems: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const TableBody = memo(({
  table,
  rows,
  rowVirtualizer,
  leftColumns,
  centerColumns,
  columnSizing,
  virtualRows,
  virtualItems,
  virtualPaddingLeft,
  virtualPaddingRight,
}: TableBodyProps) => {
  return <tbody
    className={style.tbody}
    style={{ height: rowVirtualizer ? `${rowVirtualizer.getTotalSize()}px` : 'auto' }}
  >
    {
      virtualRows.map(virtualRow => {
        const row = rows[virtualRow.index] as Row<RowData>

        return (
          <tr
            data-index={virtualRow.index}
            ref={node => rowVirtualizer.measureElement(node)}
            key={row.id}
            style={{ transform: `translateY(${virtualRow.start}px)` }}
          >
            {/* 渲染左側釘選的 Row 跟 Cell */}
            {row.getLeftVisibleCells().map(cell => {
              const cellMeta = cell.column.columnDef.meta;
              const remindStyle = cellMeta?.getRemindStyle?.(cell.getContext());

              return <TableCell
                key={cell.id}
                cell={cell}
                styleProps={{
                  ...getCommonPinningStyles(
                    cell.column.id,
                    columnSizing,
                    leftColumns,
                    table.getLeftVisibleLeafColumns,
                    cell.column.getIsLastColumn,
                    cell.column.getIsPinned(),
                  ),
                  ...remindStyle,
                  width: getColumnWidth(columnSizing[cell.column.id])
                }} />
            })}

            {/* 渲染其餘沒有釘選的 Row 跟 Cell */}
            {virtualPaddingLeft ? (
              <td style={{ width: virtualPaddingLeft }} />
            ) : null}

            {virtualItems.map(vc => {
              const column = centerColumns[vc.index];
              if (!column) return null;

              const centerCells = row.getCenterVisibleCells();
              const cell = centerCells.find(c => c.column.id === column.id);
              if (!cell) return null;

              const cellMeta = cell.column.columnDef.meta;
              const remindStyle = cellMeta?.getRemindStyle?.(cell.getContext());

              return <TableCell
                key={cell.id}
                cell={cell}
                styleProps={{
                  ...getCommonPinningStyles(
                    column.id,
                    columnSizing,
                    leftColumns,
                    table.getLeftVisibleLeafColumns,
                    column.getIsLastColumn,
                    column.getIsPinned(),
                  ),
                  ...remindStyle,
                  width: getColumnWidth(columnSizing[column.id])
                }}
              />;
            })}
            {virtualPaddingRight ? (
              <td style={{ width: virtualPaddingRight }} />
            ) : null}
          </tr>
        )
      })
    }
  </tbody>
});