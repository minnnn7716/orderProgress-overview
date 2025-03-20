import { Dispatch, SetStateAction } from 'react'
import { RowDataFor } from 'src/types/dataTypes'
import { InitialTableState } from '@tanstack/react-table'
import { dataLengthProps } from 'src/components/DataLength';

export interface IVirtualizedTableProps {
  isLoading: boolean;
  message: string;
  error: Error | null;
  initialState?: InitialTableState;
  rowData: RowDataFor;
  setDataLength: Dispatch<SetStateAction<dataLengthProps>>;
}