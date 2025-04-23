// Components
import { TableHeader } from '../components/TableColumnContent'
import { TableCellContent } from '../components/TableCellContent';

// Tanstack
import { createColumnHelper } from '@tanstack/react-table'

// TypeScript Rule
import { ColumnMeta, RowData } from 'src/types/dataTypes';

// Utilities
import { getRemindStyle } from 'src/components/VirtualizedTable/utils/tableUtilities';
import { filterType } from 'src/config/columnMeta';
import { formatDate } from 'src/utils/formatDate';

export const generateColumns = (columnData: ColumnMeta) => {
  const columnHelper = createColumnHelper<RowData>();

  return Object.entries(columnData)
    .map(([key, info]) =>
      columnHelper.accessor((row) => row[key as keyof RowData], {
        id: key,
        header: TableHeader,
        cell: TableCellContent,
        enableHiding: info.visible,
        size: 200,
        meta: {
          getRemindStyle: getRemindStyle,
          filterVariant: info.filterType,
          columnInfo: info,
          columnKey: key,
        },
        filterFn(row, columnId, value) {
          const originalValue = row.original[columnId as keyof RowData];

          switch (info.filterType) {
            case filterType.text:
              return originalValue?.toString().toLocaleLowerCase().includes(value.toString().toLocaleLowerCase()) ? true : false
            case filterType.textSelect:
              return originalValue?.toString().toLocaleLowerCase() === value.toString().toLocaleLowerCase()
            case filterType.select:
              return originalValue?.toString().toLocaleLowerCase() === value.toString().toLocaleLowerCase()
            case filterType.dateRange:
              return dateRangeFilter(originalValue, value)
            case filterType.numberRange:
              return numberRangeFilter(originalValue, value)
            default:
              return false
          }
        }
      })
    );
};

const dateRangeFilter = (originalValue: string | number | Date | null, value: Date[] | null) => {
  if (originalValue === null) {
    return false
  }

  if (value === null) {
    return true
  }

  const originalDate = formatDate(new Date(String(originalValue) as string | Date));
  const startDate = formatDate(new Date(value[0]));
  const endDate = formatDate(new Date(value[1] ?? value[0]));

  if (startDate === endDate) {
    return startDate === originalDate
  }

  return new Date(startDate) <= new Date(originalDate) && new Date(endDate) >= new Date(originalDate)
}

const numberRangeFilter = (originalValue: string | number | Date | null, value: undefined | null | string[]) => {
  if (!value) {
    return true
  }

  const [first, second] = value;

  if ((first && second) && (first === second)) {
    return Number(originalValue) === Number(first)
  }

  if (first && second) {
    return Number(originalValue) >= Number(first) && Number(originalValue) <= Number(second)
  }

  if (first && !second) {
    return Number(originalValue) >= Number(first)
  }

  if (!first && second) {
    return Number(originalValue) <= Number(second)
  }

  return true
}