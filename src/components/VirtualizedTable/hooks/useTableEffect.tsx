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
  setTableState: Dispatch<SetStateAction<TablePinSortState>>;
  setTableHandler: Dispatch<SetStateAction<TablePinSortHandler>>;
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
    setTableState,
    setTableHandler
  } = props;

  const { length: leftPinnedColumnsLength } = table.getState().columnPinning.left || [];
  const { length: columnSizingLength } = Object.keys(table.getState().columnSizing) || [];
  const rowsLength = table.getCoreRowModel().rows.length;

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.updateTargetEvents();
    }
  }, [tooltipRef, virtualColumns, virtualRows, columnSizingLength, leftPinnedColumnsLength])

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

  useEffect(() => {
    setTableState({
      isPinned: leftPinnedColumnsLength > 0,
      isSorted: JSON.stringify(columnOrder) !== JSON.stringify(metaDataKeys),
    })
  }, [setTableState, leftPinnedColumnsLength, columnOrder])

  useEffect(() => {
    if (!table) return;

    setTableHandler({
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
  }, [table, setTableHandler])

  useEffect(() => {
    table?.setColumnFilters([]);
    table?.resetColumnFilters();
    setDataLength(prev => ({
      ...prev,
      isFilter: false
    }))
  }, [table, rowsLength, setDataLength])
}