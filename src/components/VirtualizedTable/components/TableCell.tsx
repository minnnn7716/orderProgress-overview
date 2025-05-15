/**
 * @file TableCell.tsx
 * @description 表格 Cell 元件，用於虛擬化表格中的 Cell 的渲染
 * @module components/VirtualizedTable/components/TableCell
 * @returns {React.ReactElement} 回傳表格 Cell 元件
 * @example
 * <TableCell
 *   cell={cell}
 *   styleProps={{ width: '200px', height: '48px' }}
 * />
 */

/**
 * 型別定義
 * TableCellProps: 表格 Cell 元件傳入參數
 * @typedef TableCellProps
 * @property {Cell<RowData, unknown>} cell - 來自 TanStack Table 的 Cell 資料
 * @property {CSSProperties} styleProps - 傳入用於設置 Cell 樣式的 CSS 屬性
 */

import { memo, type CSSProperties } from "react";
import { flexRender } from "@tanstack/react-table";
import { useOverflowTooltip } from "src/hooks/useOverflowTooltip";

// Dnd-kit
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Types
import { Cell } from "@tanstack/react-table";
import { RowData } from "src/types/dataTypes";

// Utils
import { getDraggingStyles } from '../utils/tableUtils';

// Styles
import style from '../style.module.scss';
import { classNames } from "primereact/utils";

type TableCellProps = {
  cell: Cell<RowData, unknown>;
  styleProps: CSSProperties;
}

export const TableCell = memo((
  {
    cell,
    styleProps
  }: TableCellProps) => {
  const { contentRef, headerRef, needsTooltip, tooltipContent, tooltipPosition, checkOverflow } = useOverflowTooltip();
  const { isDragging, setNodeRef, transform } = useSortable({ id: cell.column.id });

  const isPinned = cell.column.getIsPinned() === 'left';

  return (<td
    ref={setNodeRef}
    className="p-3"
    style={{
      ...styleProps,
      ...getDraggingStyles(
        isDragging,
        isPinned,
        // transform 為 dnd-kit 提供拖曳後的值，僅取出 x 軸向的數值
        CSS.Translate.toString({ x: transform?.x || 0, y: 0, scaleX: 1, scaleY: 1 }))
    }}
  >
    <div
      ref={headerRef}
      className={classNames(style.overRowContainer, 'toolTip-target')}
      // 若內容溢出會判定可顯示 tooltip 看見全部資訊
      data-pr-tooltip={needsTooltip ? tooltipContent : ''}
      data-pr-position={tooltipPosition}
      onMouseEnter={checkOverflow}
    >
      <p ref={contentRef} className="m-0">
        {/* 將 TableCellFormatter 格式化模板傳入 generateTable，再透過 flexRender 取出已格式化的內容 */}
        {flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )}
      </p>
    </div>
  </td>)
})