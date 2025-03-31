import { useState, useRef, useEffect, useMemo, memo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

// Configs
import { columnMeta, filterType } from 'src/config/columnMeta'

// Components
import { Tooltip } from 'primereact/tooltip';
import { StringFilter, NumberFilter, DateFilter } from 'src/components/Filter';
import { TableStatus } from './components/TableStatus';

// Tanstack
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'

// Types
import { Row, ColumnFiltersState } from '@tanstack/react-table'
import { RowData } from 'src/types/dataTypes';
import { IVirtualizedTableProps } from './types';

// utilities
import { generateColumns } from './utilities/generateTable';
import { useOrderCacheTime } from 'src/api/fetchData';
import { formatDate } from 'src/utilities/formatDate';

// style
import style from './style.module.scss'
import { classNames } from 'primereact/utils';

export const VirtualizedTable = memo(({ error, message, isLoading, isCaching, rowData, initialState, setDataLength }: IVirtualizedTableProps) => {
  const { data: cacheTimeData } = useOrderCacheTime();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<Tooltip>(null);

  const invisibleColumns = useMemo<Record<string, boolean>>(() => (
    Object.fromEntries(
      Object.entries(columnMeta)
        .filter(([, info]) => !info.visible)
        .map(([key]) => [key, false])
    )
  ), [])

  //#region Table
  const columns = useMemo(() => generateColumns(columnMeta), [])

  const table = useReactTable({
    data: rowData,
    columns,
    filterFns: {},
    state: {
      columnFilters,
      globalFilter,
      columnVisibility: invisibleColumns
    },

    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
    initialState,
  })

  const { rows } = table.getRowModel()
  const visibleColumns = table.getVisibleLeafColumns()
  //#endregion

  //#region Virtualizer
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: index => visibleColumns[index].getSize(),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3,
  })

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 0,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
        navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  const virtualColumns = columnVirtualizer.getVirtualItems()
  const virtualRows = rowVirtualizer.getVirtualItems()

  let virtualPaddingLeft: number | undefined
  let virtualPaddingRight: number | undefined

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
  }
  //#endregion

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.updateTargetEvents();
    }
  }, [virtualColumns])

  useEffect(() => {
    setDataLength({
      columnLength: visibleColumns.length,
      rowLength: rows.length,
      table
    })
  }, [setDataLength, visibleColumns.length, rows.length, table])

  return (
    <>
      <Tooltip ref={tooltipRef} target=".toolTip-target" />
      {/* <Fieldset legend="篩選訂單" toggleable>
        <div className='mb-2 flex align-items-center justify-content-between'>
          <div className='flex'>
            <DebouncedInput
              placeholder="搜尋全部"
              className="border-none border-round-md p-2 ml-2 shadow-1"
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
            />
            <button
              className='bg-primary hover:bg-primary-600 font-medium border-none border-round-md ml-2 px-3 transition-colors transition-duration-100 transition-ease-in'
              onClick={() => {
                setColumnFilters([])
                setGlobalFilter('')
                table.resetColumnFilters();
              }}
            >
              清除所有篩選
            </button>
          </div>
        </div >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Fieldset> */}

      <div className={style.tableWrap}>
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
                  {virtualPaddingLeft ? (
                    <th style={{ width: virtualPaddingLeft }} />
                  ) : null}
                  {virtualColumns.map(vc => {
                    const header = headerGroup.headers[vc.index];
                    const meta = header.column.columnDef.meta;

                    return (
                      <th
                        key={header.id}
                        className={classNames(header.column.getIsSorted() && style.sorted)}
                        style={{ width: 200 }}
                      >
                        <div
                          className='flex align-items-center mb-2 cursor-pointer'
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <i className="pi pi-sort-amount-down ml-2" />,
                            desc: <i className="pi pi-sort-amount-up-alt ml-2" />,
                          }[header.column.getIsSorted() as string] ?? <i className="pi pi-sort-alt ml-2" />}
                        </div>
                        {
                          header.column.getCanFilter()
                            && (meta?.filterVariant === filterType.select || meta?.filterVariant === filterType.textSelect || meta?.filterVariant === filterType.text)
                            ? <StringFilter column={header.column} />
                            : header.column.getCanFilter() && meta?.filterVariant === filterType.numberRange
                              ? <NumberFilter column={header.column} />
                              : header.column.getCanFilter() && meta?.filterVariant === filterType.dateRange
                                ? <DateFilter column={header.column} />
                                : null
                        }
                      </th>
                    )
                  })}
                  {virtualPaddingRight ? (
                    <th style={{ width: virtualPaddingRight }} />
                  ) : null}
                </tr>
              ))}
            </thead>
            <tbody
              className={style.tbody}
              style={{
                height: rowVirtualizer ? `${rowVirtualizer.getTotalSize()}px` : 'auto',
              }}
            >
              {
                virtualRows.map(virtualRow => {
                  const row = rows[virtualRow.index] as Row<RowData>
                  const visibleCells = row.getVisibleCells()

                  return (
                    <tr
                      data-index={virtualRow.index}
                      ref={node => rowVirtualizer.measureElement(node)}
                      key={row.id}
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {virtualPaddingLeft ? (
                        <td
                          style={{ width: virtualPaddingLeft }}
                        />
                      ) : null}
                      {virtualColumns.map(vc => {
                        const cell = visibleCells[vc.index];
                        const cellMeta = cell.column.columnDef.meta;

                        return (
                          <td
                            key={cell.id}
                            style={{
                              width: 200,
                              ...cellMeta?.getRemindStyle?.(cell.getContext())
                            }}

                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        )
                      })}
                      {virtualPaddingRight ? (<td
                        style={{ width: virtualPaddingRight }}
                      />
                      ) : null}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-2 mr-1 mb-0 text-sm text-right">
        資料時間： {formatDate(cacheTimeData, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </>
  )
})