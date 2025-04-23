import { useRef, useEffect, memo } from 'react'
import { useVirtualizedTable } from './hooks/useVirtualizedTable';

// Configs
import { columnMeta } from 'src/config/columnMeta'

// Components
import { Tooltip } from 'primereact/tooltip';
import { TableStatus } from './components/TableStatus';
import { TableColumn } from './components/TableColumn';
import { TableCell } from './components/TableCell';
import { CacheTime } from './components/CacheTime';

// Types
import { Row } from '@tanstack/react-table'
import { RowData } from 'src/types/dataTypes';
import { IVirtualizedTableProps } from './types';

// Utils
import { getCommonPinningStyles, getColumnWidth } from './utils/tableUtilities';

// Style
import style from './style.module.scss';

export const VirtualizedTable = memo(({
  error,
  message,
  isLoading,
  isCaching,
  rowData,
  initialState,
  setDataLength,
  setPinList
}: IVirtualizedTableProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<Tooltip>(null);

  const {
    table,
    rows,
    centerColumns,
    leftColumns,
    columnSizing,
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

  //#region useEffect
  const { length: leftPinnedColumnsLength } = table.getState().columnPinning.left || [];
  const { length: columnSizingLength } = Object.keys(columnSizing) || [];

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.updateTargetEvents();
    }
  }, [virtualColumns, virtualRows, columnSizingLength, leftPinnedColumnsLength])

  useEffect(() => {
    setDataLength({
      columnLength: visibleColumns.length,
      rowLength: table.getCoreRowModel().rows.length,
      isFilter: table.getState().columnFilters.length > 0,
      filterRowLength: table.getFilteredRowModel().rows.length,
      handelClearAllFilters: () => {
        table.setColumnFilters([]);
        table.setGlobalFilter('');
        table.resetColumnFilters();
      }
    })
  }, [setDataLength, visibleColumns.length, rows.length, table])

  useEffect(() => {
    setPinList({
      hasPin: leftPinnedColumnsLength > 0,
      table
    })
  }, [leftPinnedColumnsLength, setPinList, table])
  //#endregion

  return (
    <>
      {/* Tooltip 用於顯示過長的 column 標題，Hover 顯示全名 */}
      <Tooltip ref={tooltipRef} target=".toolTip-target" className='text-sm' />

      {/* Table 主體 */}
      <div className={style.tableWrap}>
        {/* TableStatus 顯示 Table 資料取得狀態 */}
        <TableStatus
          tableLength={table.getFilteredRowModel().rows.length}
          error={error}
          message={message}
          isLoading={isLoading}
          isCaching={isCaching}
        />
        <div className={style.tableContainer} ref={tableContainerRef}>
          <table className={style.table}>
            <thead className={style.thead}>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>

                  {/* 渲染左側釘選的 Columns，沒有使用 Virtualize */}
                  {leftColumns.map(column => {
                    const header = headerGroup.headers.find(h => h.column.id === column.id);
                    if (!header) return null;

                    return <TableColumn
                      key={header.id}
                      header={header}
                      column={column}
                      styleProps={{
                        ...getCommonPinningStyles(table, columnSizing, column, leftColumns),
                        width: getColumnWidth(columnSizing[column.id])
                      }}
                    />
                  })}

                  {/* 渲染其餘沒有釘選的 Columns，使用 Virtualize */}
                  {virtualPaddingLeft ? (
                    <th style={{ width: virtualPaddingLeft }} />
                  ) : null}

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
                      styleProps={{ width: columnSizing[column.id] === undefined ? 200 : Math.max(columnSizing[column.id], 150) }}
                    />
                  })}

                  {virtualPaddingRight ? (
                    <th style={{ width: virtualPaddingRight }} />
                  ) : null}

                </tr>
              ))}
            </thead>
            <tbody
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
                            ...getCommonPinningStyles(table, columnSizing, cell.column, leftColumns),
                            ...(remindStyle || {}),
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
                            ...getCommonPinningStyles(table, columnSizing, column, leftColumns),
                            ...(remindStyle || {}),
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
          </table>
        </div>
      </div>

      <CacheTime className='mt-2 mr-1 text-sm text-right' />
    </>
  )
})