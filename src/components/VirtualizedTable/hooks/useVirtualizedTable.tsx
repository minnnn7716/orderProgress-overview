/**
 * @file useVirtualizedTable.tsx
 * @description 抽取 TanStack Table 提供的核心 Hook，設置 Table 實體與 Virtualizer 的邏輯
 * @module components/VirtualizedTable/hooks/useVirtualizedTable
 * @returns {Object} 回傳 Table 實體、虛擬化資料與表格操作函式
 * @example
 * const {
 *   table,
 *   rows,
 *   centerColumns,
 *   leftColumns,
 *   columnSizing,
 *   handleDragEnd,
 *   rowVirtualizer,
 *   virtualColumns,
 *   virtualRows,
 *   virtualPaddingLeft,
 *   virtualPaddingRight
 * } = useVirtualizedTable({
 *   data: tableData,
 *   columnMeta: columnMetadata,
 *   initialState: { sorting: [{ id: 'name', desc: false }] },
 *   tableContainerRef: containerRef
 * });
 */

/**
 * 型別定義
 * useVirtualizedTableProps: 虛擬化表格勾子傳入參數
 * @typedef useVirtualizedTableProps
 * @property {RowData[]} data - 表格資料陣列
 * @property {ColumnMeta} columnMeta - 欄位設定的資料
 * @property {InitialTableState} [initialState] - TanStack Table 的初始狀態
 * @property {RefObject<HTMLDivElement>} tableContainerRef - 表格容器參考物件
 */

import { useState, useCallback, useMemo, type RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

// Tanstack Table
import {
  ColumnPinningState,
  ColumnFiltersState,
  ColumnSizingState,
  ColumnOrderState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'

// Dnd-kit
import { type DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

// Types
import { InitialTableState } from "@tanstack/react-table";
import { ColumnMeta, RowData } from "src/types/dataTypes"

// Utils
import { generateTable } from '../utils/generateTable';
import { getColumnWidth } from '../utils/tableUtils';

// Constants
import { DEFAULT_COLUMN_WIDTH } from '../constants';

type useVirtualizedTableProps = {
  data: RowData[];
  columnMeta: ColumnMeta;
  initialState?: InitialTableState
  tableContainerRef: RefObject<HTMLDivElement>
}

export const useVirtualizedTable = ({
  data,
  columnMeta,
  initialState,
  tableContainerRef
}: useVirtualizedTableProps) => {
  const columns = useMemo(() => generateTable(columnMeta), [columnMeta]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() => columns.map(c => c.id!));

  // 依據 MetaData 設置欄位可見性
  const columnVisibilityState = useMemo<Record<string, boolean>>(() => (
    Object.fromEntries(
      Object.entries(columnMeta)
        .filter(([, info]) => !info.visible)
        .map(([key]) => [key, false])
    )
  ), [columnMeta]);

  //#region  TanStack Table 實體
  const table = useReactTable({
    initialState,
    data,
    columns,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    state: {
      columnPinning,
      columnFilters,
      columnSizing,
      columnOrder,
      columnVisibility: columnVisibilityState,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    onColumnSizingChange: setColumnSizing,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });
  //#endregion
  
  //#region Virtualizer
  const { rows } = table.getRowModel();
  const visibleColumns = table.getVisibleLeafColumns();
  const centerColumns = table.getCenterVisibleLeafColumns();
  const leftColumns = table.getLeftVisibleLeafColumns();
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

  // #region 拖曳行為
  const dragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColumnOrder(columnOrder => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      })
    }
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    // 當超出範圍時，直接返回
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // 拖曳非釘選欄為時的行為，釘選與非釘選欄位無法互相拖曳，僅能在自己的區塊內移動
    if (centerColumns.some(col => col.id === active.id) &&
      centerColumns.some(col => col.id === over.id)) {
      dragEnd(event);
    }

    // 拖曳釘選欄位時的行為
    if (leftColumns.some(col => col.id === active.id) &&
      leftColumns.some(col => col.id === over.id)) {
      dragEnd(event);

      // 更新釘選欄位的狀態
      setColumnPinning(prev => {
        const currentPinned = [...(prev.left || [])];
        const oldIndex = currentPinned.indexOf(active.id as string);
        const newIndex = currentPinned.indexOf(over.id as string);

        return {
          ...prev,
          left: arrayMove(currentPinned, oldIndex, newIndex)
        };
      });
    }
  }, [centerColumns, leftColumns, dragEnd]);
  // #endregion

  return {
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
  }
}