// Tanstack
import { createColumnHelper } from '@tanstack/react-table'

// Components
import { TableColumnContent } from '../components/TableColumnFormatter'
import { TableCellContent } from '../components/TableCellFormatter';

// Types
import { ColumnMeta, RowData } from 'src/types/dataTypes';

// Utils
import { getRemindStyle, filterRules } from './tableUtils';

export const generateColumns = (columnData: ColumnMeta) => {
  const columnHelper = createColumnHelper<RowData>();

  return Object.entries(columnData)
    .map(([key, info]) =>
      columnHelper.accessor((row) => row[key as keyof RowData], {
        id: key,
        size: 200,
        header: TableColumnContent,
        cell: TableCellContent,
        meta: {
          columnKey: key,
          columnInfo: info,
          filterVariant: info.filterType,
          getRemindStyle: getRemindStyle,
        },
        filterFn: (row, columnId, value) => filterRules(row, columnId, value, info.filterType),
      })
    );
};
