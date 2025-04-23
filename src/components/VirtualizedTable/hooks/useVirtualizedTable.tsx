import { useState, useMemo, useCallback, RefObject } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { InitialTableState } from "@tanstack/react-table";
import { ColumnMeta, RowData } from "src/types/dataTypes"

import { generateColumns } from '../utils/generateTable';
import { getColumnWidth } from '../utils/tableUtilities';
import { DEFAULT_COLUMN_WIDTH } from '../constants';

import {
  ColumnPinningState,
  ColumnFiltersState,
  ColumnSizingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'

export const useVirtualizedTable = ({
  data,
  columnMeta,
  initialState,
  tableContainerRef
}: {
  data: RowData[];
  columnMeta: ColumnMeta;
  initialState?: InitialTableState
  tableContainerRef: RefObject<HTMLDivElement>
}) => {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  const invisibleColumns = useMemo<Record<string, boolean>>(() => (
    Object.fromEntries(
      Object.entries(columnMeta)
        .filter(([, info]) => !info.visible)
        .map(([key]) => [key, false])
    )
  ), [columnMeta]);

  const columns = useMemo(() => generateColumns(columnMeta), [columnMeta]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    state: {
      columnPinning,
      columnFilters,
      columnSizing,
      columnVisibility: invisibleColumns
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    initialState,
  });

  const { rows } = table.getRowModel();
  const visibleColumns = table.getVisibleLeafColumns();
  const centerColumns = table.getCenterVisibleLeafColumns();
  const leftColumns = table.getLeftVisibleLeafColumns();

  //#region Virtualizer
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: useCallback((index) => {
      const column = visibleColumns[index];
      if (!column) return DEFAULT_COLUMN_WIDTH;
      return getColumnWidth(columnSizing[column.id]);
    }, [visibleColumns, columnSizing]),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 5,
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

  const { virtualPaddingLeft, virtualPaddingRight, virtualItems } = useMemo(() => {
    let vPaddingLeft: number | undefined = undefined
    let vPaddingRight: number | undefined = undefined

    if (columnVirtualizer && virtualColumns?.length && centerColumns.length > 0) {
      // 確保左側有足夠的內容可以滾動才設置 padding
      vPaddingLeft = virtualColumns[0]?.start ?? 0;

      // 計算右側的 padding，已增加空間緩衝區域防止抽動
      const lastColumnEnd = virtualColumns[virtualColumns.length - 1]?.end ?? 0;
      const totalSize = columnVirtualizer.getTotalSize();

      // 檢查是否滾動到接近最尾端（最右側）
      const isNearEnd = tableContainerRef.current ?
        (tableContainerRef.current.scrollLeft + tableContainerRef.current.clientWidth >=
          tableContainerRef.current.scrollWidth - 20) : false;

      // 接近尾端時不使用額外緩衝區避免出現多於空白
      const buffer = isNearEnd ? 0 : 5;
      vPaddingRight = Math.max(0, totalSize - lastColumnEnd + buffer);
    }

    return {
      virtualPaddingLeft: vPaddingLeft,
      virtualPaddingRight: vPaddingRight,
      virtualItems: virtualColumns
    };
  }, [columnVirtualizer, virtualColumns, centerColumns.length, tableContainerRef]);
  //#endregion

  return {
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
  }
}