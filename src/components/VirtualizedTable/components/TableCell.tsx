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
        CSS.Translate.toString({ x: transform?.x || 0, y: 0, scaleX: 1, scaleY: 1 }))
    }}
  >
    <div
      ref={headerRef}
      className={classNames(style.overRowContainer, 'toolTip-target')}
      data-pr-tooltip={needsTooltip ? tooltipContent : ''}
      data-pr-position={tooltipPosition}
      onMouseEnter={checkOverflow}
    >
      <p ref={contentRef} className="m-0">
        {flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )}
      </p>
    </div>
  </td>)
})