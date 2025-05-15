import { InitialTableState } from '@tanstack/react-table';
import { type DataLengthProps } from 'src/components/DataLength';

export type TablePinSortState = {
  isPinned: boolean,
  isSorted: boolean,
}

export type TablePinSortHandler = {
  handleClearAllPin: () => void,
  handleClearAllSort: () => void
}

export type InitialState = {
  dateRange: Date[],
  dataLength: DataLengthProps,
  pinSortState: TablePinSortState,
  pinSortHandler: TablePinSortHandler,
  table: InitialTableState
}