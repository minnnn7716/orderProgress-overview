// Components
import { TableHeader } from '../components/TableHeader'
import { TableCell } from '../components/TableCell';

// Tanstack
import { createColumnHelper } from '@tanstack/react-table'

// TypeScript Rule
import { ColumnMeta, RowData } from 'src/types/dataTypes';

// Utilities
import { sortFn, filterFn, getRemindStyle } from 'src/components/VirtualizedTable/tableUtilities';

export const generateColumns = (columnData: ColumnMeta) => {
  const columnHelper = createColumnHelper<RowData>();

  return Object.entries(columnData)
    .map(([key, info]) =>
      columnHelper.accessor((row) => row[key as keyof RowData], {
        id: key,
        header: TableHeader,
        cell: TableCell,
        enableHiding: info.visible,
        meta: {
          getContentLength: (cellCtx) => {
            const { type, format } = info;
            const value = String(cellCtx.getValue());

            if (type === 'string' && format !== 'date-time') {
              return value.length > 11;
            }
            
            return false
          },
          getRemindStyle: getRemindStyle,
          getInfo: info,
          getKey: key,
        },
        sortingFn: sortFn,
        filterFn: filterFn,
        enableGlobalFilter: true
      })
    );
};