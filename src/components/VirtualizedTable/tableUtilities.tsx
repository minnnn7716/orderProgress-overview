import { rankItem } from '@tanstack/match-sorter-utils';

import { Column, FilterFn, SortingFn } from '@tanstack/react-table';
import { CellDataFor, ColumnMetaKey } from 'src/types/dataTypes';

export const sortFn: SortingFn<CellDataFor> = (rowA, rowB, columnId) => {
  const valueA = rowA.original[columnId as ColumnMetaKey] ?? '';
  const valueB = rowB.original[columnId as ColumnMetaKey] ?? '';
  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
}

export const filterFn: FilterFn<CellDataFor> = (row, columnId, value) => {
  console.log('row, value, columnId: ', row, value, columnId);
  console.log('row.original[columnId as ColumnMetaKey]: ', row.original[columnId as ColumnMetaKey]);
  console.log('value.toLowerCase(): ', value.toLowerCase());

  return `${row.original[columnId as ColumnMetaKey]}`.toLowerCase().includes(value.toLowerCase())
  
}

export const fuzzyFilterFn: FilterFn<CellDataFor> = (row, columnId,value, addMeta) => {
  const itemRank = rankItem(row.original[columnId as ColumnMetaKey], value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
}

export const getColumnCanGlobalFilter = (column: Column<CellDataFor>) => {
  return column.columnDef.enableGlobalFilter ?? column.getCanGlobalFilter()
}
