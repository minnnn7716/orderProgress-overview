import { useRef, memo } from 'react'
import { useVirtualizedTable, useTableEffect } from './hooks';

// Configs
import { columnMeta } from 'src/config/columnMeta'

// Components
import { Tooltip } from 'primereact/tooltip';
import { TableHeader, TableBody } from './components';

// Dnd-Kit
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'

// Types
import { IVirtualizedTableProps } from './types';

// Styles
import style from './style.module.scss';

export const VirtualizedTable = memo(({
  rowData,
  initialState,
  setDataLength,
  setTableState,
  setTableHandler
}: IVirtualizedTableProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<Tooltip>(null);

  const {
    table,
    rows,
    centerColumns,
    leftColumns,
    columnSizing,
    columnOrder,
    handleDragEnd,
    rowVirtualizer,
    virtualColumns,
    virtualRows,
    virtualItems,
    virtualPaddingRight,
    virtualPaddingLeft,
    visibleColumns,
  } = useVirtualizedTable({
    data: rowData,
    columnMeta,
    initialState,
    tableContainerRef
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  useTableEffect({
    table,
    tooltipRef,
    virtualColumns,
    virtualRows,
    visibleColumnsLength: visibleColumns.length,
    columnOrder,
    isFilter: table.getState().columnFilters.length > 0,
    filterRowLength: table.getFilteredRowModel().rows.length,
    setDataLength,
    setTableState,
    setTableHandler,
  })

  return (
    <div className={style.tableContainer} ref={tableContainerRef}>
      {/* Tooltip 用於顯示過長的 column 標題，Hover 顯示全名 */}
      <Tooltip ref={tooltipRef} target=".toolTip-target" className='text-sm' />

      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <table className={style.table}>
          <TableHeader
            table={table}
            leftColumns={leftColumns}
            centerColumns={centerColumns}
            columnSizing={columnSizing}
            virtualItems={virtualItems}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
          />

          <TableBody
            table={table}
            rows={rows}
            rowVirtualizer={rowVirtualizer}
            leftColumns={leftColumns}
            centerColumns={centerColumns}
            columnSizing={columnSizing}
            virtualRows={virtualRows}
            virtualItems={virtualItems}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
          />
        </table>
      </DndContext>
    </div>
  )
})