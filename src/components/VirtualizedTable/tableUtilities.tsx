import { rankItem } from '@tanstack/match-sorter-utils';

// Types
import { Column, FilterFn, SortingFn, CellContext } from '@tanstack/react-table';
import { ColumnMetaKey, ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';

// Styles
import { remindStyle } from 'src/config/remindStyle';

export const sortFn: SortingFn<RowData> = (rowA, rowB, columnId) => {
  const valueA = rowA.original[columnId as ColumnMetaKey] ?? '';
  const valueB = rowB.original[columnId as ColumnMetaKey] ?? '';
  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
}

export const filterFn: FilterFn<RowData> = (row, columnId, value) => (
  `${row.original[columnId as ColumnMetaKey]}`.toLowerCase().includes(value.toLowerCase())
)

export const fuzzyFilterFn: FilterFn<RowData> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.original[columnId as ColumnMetaKey], value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
}

export const getColumnCanGlobalFilter = (column: Column<RowData>) => {
  return column.columnDef.enableGlobalFilter ?? column.getCanGlobalFilter()
}

export const getRemindStyle = (cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>) => {
  const rowData = cellCtx.row.original;
  const { meta } = cellCtx.column.columnDef;
  const info = meta?.getInfo ?? '';
  
  if (info.correspondColumn !== '' && rowData[info.correspondColumn as ColumnMetaKey] === 'error') {
    return remindStyle.warning
  }
  
  const rawValue = cellCtx.getValue();
  const key = meta?.getKey ?? '';

  if ((key === 'rcvFabRate' || key === 'poRate') && (typeof rawValue === 'number')) {
    const rate = (rawValue * 100);

    return (rate > 100
      ? remindStyle.error
      : rate >= 80 && rate <= 100
        ? remindStyle.warning
        : {})
  }

  return {};
}