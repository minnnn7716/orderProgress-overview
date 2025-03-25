import { Dispatch, SetStateAction } from 'react'
import { RowData } from 'src/types/dataTypes'
import { InitialTableState } from '@tanstack/react-table'
import { dataLengthProps } from 'src/components/DataLength';

export interface IVirtualizedTableProps {
  isLoading: boolean;
  isCaching: boolean;
  message: string;
  error: Error | null;
  initialState?: InitialTableState;
  rowData: RowData[];
  setDataLength: Dispatch<SetStateAction<dataLengthProps>>;
}