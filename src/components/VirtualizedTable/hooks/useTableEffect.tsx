/**
 * @file useTableEffect.tsx
 * @description 抽取 VirtualTable 的 Effect 統一管理，用於處理 VirtualTable 的副作用，包含 tooltip 更新、資料長度更新及表格狀態處理
 * @module components/VirtualizedTable/hooks/useTableEffect
 * @returns {void} 不回傳值，僅設置狀態和副作用
 * @example
 * useTableEffect({
 *   table: tableInstance,
 *   tooltipRef: tooltipReference,
 *   virtualColumns: columnVirtualizer.getVirtualItems(),
 *   virtualRows: rowVirtualizer.getVirtualItems(),
 *   visibleColumnsLength: table.getVisibleLeafColumns().length,
 *   columnOrder: table.getState().columnOrder,
 *   isFilter: table.getState().columnFilters.length > 0,
 *   filterRowLength: filteredRowsLength,
 *   setDataLength: setDataLengthState,
 *   setTablePinSortState: setTablePinSortState,
 *   setTablePinSortHandler: setTablePinSortHandler
 * });
 */

/**
 * 型別定義
 * useTableEffectProps: VirtualTable useEffect 集合的傳入參數
 * @typedef useTableEffectProps
 * @property {Table<RowData>} table - TanStack Table 實體
 * @property {RefObject<Tooltip>} tooltipRef - 提示工具參考物件
 * @property {VirtualItem[]} virtualColumns - 虛擬化的欄位項目
 * @property {VirtualItem[]} virtualRows - 虛擬化的行項目
 * @property {number} visibleColumnsLength - 可見欄位數量
 * @property {ColumnOrderState} columnOrder - 欄位排序狀態
 * @property {boolean} isFilter - 是否有篩選條件
 * @property {number} filterRowLength - 篩選後的資料行數
 * @property {Dispatch<SetStateAction<DataLengthProps>>} setDataLength - 設置資料長度狀態的函式
 * @property {Dispatch<SetStateAction<TablePinSortState>>} setTablePinSortState - 設置表格釘選和排序狀態的函式
 * @property {Dispatch<SetStateAction<TablePinSortHandler>>} setTablePinSortHandler - 設置處理表格釘選和排序的函式
 */

import { useEffect, type RefObject, type Dispatch, type SetStateAction } from "react";

// Configs
import { columnMeta } from 'src/config/columnMeta'

// Types
import { Table, ColumnOrderState } from '@tanstack/react-table';
import { VirtualItem } from "@tanstack/react-virtual";
import { RowData } from 'src/types/dataTypes';
import { Tooltip } from "primereact/tooltip";
import { DataLengthProps } from "src/components/DataLength";
import { TablePinSortState, TablePinSortHandler } from "src/types/stateTypes";

// Utils
import { resetPinnedSort } from "../utils/tableUtils";

type useTableEffectProps = {
  table: Table<RowData>;
  tooltipRef: RefObject<Tooltip>;
  virtualColumns: VirtualItem[];
  virtualRows: VirtualItem[];
  visibleColumnsLength: number;
  columnOrder: ColumnOrderState;
  isFilter: boolean;
  filterRowLength: number;
  setDataLength: Dispatch<SetStateAction<DataLengthProps>>;
  setTablePinSortState: Dispatch<SetStateAction<TablePinSortState>>;
  setTablePinSortHandler: Dispatch<SetStateAction<TablePinSortHandler>>;
}

const metaDataKeys = Object.keys(columnMeta);

export const useTableEffect = (props: useTableEffectProps) => {
  const {
    table,
    tooltipRef,
    virtualColumns,
    virtualRows,
    visibleColumnsLength,
    columnOrder,
    isFilter,
    filterRowLength,
    setDataLength,
    setTablePinSortState,
    setTablePinSortHandler
  } = props;

  const { length: leftPinnedColumnsLength } = table.getState().columnPinning.left || [];
  const { length: columnSizingLength } = Object.keys(table.getState().columnSizing) || [];
  const rowsLength = table.getCoreRowModel().rows.length;

  // 更新 tooltip 的 targetEvents
  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.updateTargetEvents();
    }
  }, [tooltipRef, virtualColumns, virtualRows, columnSizingLength, leftPinnedColumnsLength])

  // 更新資料長度狀態
  useEffect(() => {
    setDataLength({
      columnLength: visibleColumnsLength,
      rowLength: rowsLength,
      isFilter,
      filterRowLength,
      handelClearAllFilters: () => {
        table.setColumnFilters([]);
        table.resetColumnFilters();
      }
    })
  }, [table, visibleColumnsLength, rowsLength, isFilter, filterRowLength, setDataLength])

  // 更新表格釘選和排序狀態
  useEffect(() => {
    setTablePinSortState({
      isPinned: leftPinnedColumnsLength > 0,
      isSorted: JSON.stringify(columnOrder) !== JSON.stringify(metaDataKeys),
    })
  }, [setTablePinSortState, leftPinnedColumnsLength, columnOrder])

  // 更新表格釘選和排序的處理函式
  useEffect(() => {
    if (!table) return;

    setTablePinSortHandler({
      handleClearAllPin: () => {
        table?.setColumnPinning({});
        table?.resetColumnPinning();
      },
      handleClearAllSort: () => {
        const pinList = table?.getState().columnPinning;

        if (pinList?.left?.length) {
          const originalPinList = resetPinnedSort(pinList);
          table?.setColumnPinning(originalPinList);
        }

        table?.setColumnOrder(() => metaDataKeys);
        table?.resetSorting();
      }
    })
  }, [table, setTablePinSortHandler])

  // 清除篩選條件，在資料長度變化時觸發，並重置篩選條件
  useEffect(() => {
    table?.setColumnFilters([]);
    table?.resetColumnFilters();
    setDataLength(prev => ({
      ...prev,
      isFilter: false
    }))
  }, [table, rowsLength, setDataLength])
}