import { memo } from "react";
import { flexRender } from "@tanstack/react-table";
import { useOverflowTooltip } from "src/hooks/useOverflowTooltip";

// Types
import { Cell } from "@tanstack/react-table";
import { RowData } from "src/types/dataTypes";

// Styles
import style from 'src/components/VirtualizedTable/style.module.scss'
import { classNames } from "primereact/utils";

export const TableCell = memo((
  {
    cell,
    styleProps
  }: {
    cell: Cell<RowData, unknown>,
    styleProps: React.CSSProperties
  }) => {
  const { contentRef, headerRef, needsTooltip, tooltipContent, tooltipPosition, checkOverflow } = useOverflowTooltip();

  return (<td style={styleProps} className="p-3">
    <div
      ref={headerRef}
      className={classNames(style.overRowContainer, 'toolTip-target')}
      data-pr-tooltip={needsTooltip ? tooltipContent : ''}
      data-pr-position={tooltipPosition}
      onMouseEnter={checkOverflow}
    >
      <p className="m-0" ref={contentRef}>
        {flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )}
      </p>
    </div>
  </td>)
})