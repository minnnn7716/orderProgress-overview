// Types
import { CellContext } from '@tanstack/react-table';
import { ColumnMetaKey, ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';

// Styles
import { remindStyle } from 'src/config/remindStyle';
// import { formatDate } from 'src/utilities/formatDate';

export const getRemindStyle = (cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>) => {
  const rowData = cellCtx.row.original;
  const { columnInfo, columnKey } = cellCtx.column.columnDef.meta ?? {};
  const rawValue = cellCtx.getValue();

  if (columnInfo.correspondColumn !== '' && rowData[columnInfo.correspondColumn as ColumnMetaKey] === 'error') {
    return remindStyle.warning
  }

  if ((columnKey === 'rcvFabRate' || columnKey === 'poRate') && (typeof rawValue === 'number')) {
    const rate = (rawValue * 100);

    return (rate > 100
      ? remindStyle.error
      : rate >= 80 && rate <= 100
        ? remindStyle.warning
        : {})
  }

  return {};
}