/**
 * @file VirtualizedTable.tsx
 * @description 虛擬化表格元件，支援大量資料高效能渲染、欄位拖曳排序、釘選與篩選功能
 * @module components/VirtualizedTable/VirtualizedTable
 * @returns {React.ReactElement} 回傳完整的虛擬化表格元件，包含表格狀態、標題與內容列
 * @example
 * <VirtualizedTable
 *   rowData={tableData}
 *   error={error}
 *   message={errorMessage}
 *   isLoading={loading}
 *   isCaching={caching}
 *   initialState={{ sorting: [{ id: 'orderNo', desc: false }] }}
 *   setDataLength={setDataLengthHandler}
 *   setTablePinSortState={setTableState}
 *   setTablePinSortHandler={setTableHandler}
 * />
 */

/**
 * 型別定義
 * IVirtualizedTableProps: 虛擬化表格元件傳入參數
 * @typedef IVirtualizedTableProps
 * @property {Error | null} error - 表格載入錯誤，若無則為 null
 * @property {string} message - API Response 回傳的錯誤訊息
 * @property {boolean} isLoading - 表格資料是否正在載入中
 * @property {boolean} isCaching - 表格資料是否正在快取中
 * @property {RowData[]} rowData - 表格資料陣列
 * @property {InitialTableState} [initialState] - TanStack Table 的初始狀態
 * @property {function} setDataLength - 設置資料長度狀態的回呼函式
 * @property {function} setTablePinSortState - 設置表格釘選和排序狀態的回呼函式
 * @property {function} setTablePinSortHandler - 設置處理表格釘選和排序的回呼函式
 */

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
  setTablePinSortState,
  setTablePinSortHandler
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

  // dnd-kit 拖曳感應器
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
    setTablePinSortState,
    setTablePinSortHandler,
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