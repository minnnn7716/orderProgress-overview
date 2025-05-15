import { Dispatch, SetStateAction } from 'react'
import { RowData } from 'src/types/dataTypes'
import { InitialTableState } from '@tanstack/react-table'
import { DataLengthProps } from 'src/components/DataLength';
import { TablePinSortState, TablePinSortHandler } from 'src/types/stateTypes';

export interface IVirtualizedTableProps {
  initialState?: InitialTableState;
  rowData: RowData[];
  setDataLength: Dispatch<SetStateAction<DataLengthProps>>;
  setTablePinSortState: Dispatch<SetStateAction<TablePinSortState>>;
  setTablePinSortHandler: Dispatch<SetStateAction<TablePinSortHandler>>;
}