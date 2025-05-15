import { CSSProperties } from 'react';

// Configs
import { columnMeta } from 'src/config/columnMeta';

// Types
import { Row, Column, CellContext, ColumnPinningState, ColumnPinningPosition } from '@tanstack/react-table';
import { ColumnMetaKey, ColumnValueType, ColumnDefinition, RowData } from 'src/types/dataTypes';
import { FilterTypeEnum } from 'src/config/columnMeta';

// Utils
import { formatDate } from 'src/utils/formatDate';

// Constants
import { DEFAULT_COLUMN_WIDTH, MIN_COLUMN_WIDTH, REMIND_STYLE } from '../constants';

// #region 產生警示樣式
// 警示規則：
// 1. 若 cell 的 columnInfo 裡面有對應的欄位（correspondColumn），且該欄位的值爲 'error'，則顯示警示樣式
// 2. 若 cell 的 columnKey 爲 'rcvFabRate' 或 'poRate'，且該欄位的值爲數字，則顯示警示樣式
export const getRemindStyle = (
  cellCtx: CellContext<RowData, ColumnValueType<ColumnDefinition>>
) => {
  const rowData = cellCtx.row.original;
  const { columnInfo, columnKey } = cellCtx.column.columnDef.meta ?? {};
  const rawValue = cellCtx.getValue();

  if (columnInfo.correspondColumn !== '' && rowData[columnInfo.correspondColumn as ColumnMetaKey] === 'error') {
    return REMIND_STYLE.warning
  }

  if ((columnKey === 'rcvFabRate' || columnKey === 'poRate') && (typeof rawValue === 'number')) {
    const rate = (rawValue * 100);

    return (rate > 100
      ? REMIND_STYLE.error
      : rate >= 80 && rate <= 100
        ? REMIND_STYLE.warning
        : {})
  }

  return {};
}
// #endregion

// #region 產生釘選樣式
export const getCommonPinningStyles = (
  columnId: string,
  columnSizing: Record<string, number>,
  leftColumns: Column<RowData>[],
  getLeftVisibleLeafColumns: () => Column<RowData, unknown>[],
  getIsLastColumn: (position?: ColumnPinningPosition | "center") => boolean,
  isPinned: ColumnPinningPosition,
  index?: number
): CSSProperties => {
  const isLastLeftPinnedColumn = isPinned === 'left' && getIsLastColumn('left')

  // 取得 column 的 index 位置，用於計算「釘選」的定位
  const columnIndex = index !== undefined
    ? index
    : (isPinned === 'left'
      ? leftColumns.findIndex(col => col.id === columnId)
      : undefined)

  // 計算「釘選」的定位
  const leftPosition = isPinned === 'left'
    ? getLeftVisibleLeafColumns()
      .slice(0, columnIndex)
      .reduce((acc, col) => acc + getColumnWidth(columnSizing[col.id]), 0)
    : undefined;

  return {
    borderRight: isLastLeftPinnedColumn ? '1px solid #00000020' : undefined,
    left: isPinned === 'left' ? `${leftPosition}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 100 : 0,
  }
}
// #endregion

// #region 產生欄位寬度
export const getColumnWidth = (columnSizing: number | undefined): number => {
  return columnSizing === undefined
    ? DEFAULT_COLUMN_WIDTH
    : Math.max(columnSizing, MIN_COLUMN_WIDTH)
};
// #endregion

// #region 產生拖曳欄位樣式
export const getDraggingStyles = (isDragging: boolean, isPinned: boolean, transform: string | undefined) => {
  return {
    opacity: isDragging ? 0.8 : 1,
    transform,
    whiteSpace: 'nowrap',
    zIndex: isPinned ? 100 : isDragging ? 1 : 0,
  }
}
// #endregion

// #region 欄位篩選器規則
export const filterRules = (
  row: Row<RowData>,
  columnId: string,
  filterValue: string | number | Date[] | string[] | null,
  filterType: FilterTypeEnum
): boolean => {
  const rawValue = row.original[columnId as keyof RowData];

  const rawValueLowerCase = String(rawValue).toLocaleLowerCase();
  const filterValueLowerCase = String(filterValue).toLocaleLowerCase();

  switch (filterType) {
    case FilterTypeEnum.text:
      return rawValueLowerCase.includes(filterValueLowerCase)

    case FilterTypeEnum.textSelect:
    case FilterTypeEnum.select:
      return rawValueLowerCase === filterValueLowerCase

    case FilterTypeEnum.dateRange:
      return dateRangeFilterRule(rawValue, filterValue as Date[] | null)

    case FilterTypeEnum.numberRange:
      return numberRangeFilterRule(rawValue, filterValue as number[] | null)

    default:
      return false
  }
}

const dateRangeFilterRule = (
  rawValue: string | number | Date | null,
  dateRange: Date[] | null
): boolean => {
  if (rawValue === null) {
    return false
  }

  if (!dateRange || dateRange.length === 0) {
    return true
  }

  const rawDate = formatDate(new Date(String(rawValue)));
  const startDate = formatDate(new Date(dateRange[0]));
  const endDate = formatDate(new Date(dateRange[1] ?? dateRange[0]));

  if (startDate === endDate) {
    return startDate === rawDate
  }

  return new Date(startDate) <= new Date(rawDate) && new Date(endDate) >= new Date(rawDate)
}

const numberRangeFilterRule = (
  rawValue: string | number | Date | null,
  numberRange: number[] | null
) => {
  if (!numberRange) {
    return true
  }

  const [minNumber, maxNumber] = numberRange;
  const rawNumber = Number(rawValue);

  if ((minNumber >= 0 && maxNumber >= 0) && (minNumber === maxNumber)) {
    return rawNumber === minNumber
  }

  if (minNumber >= 0 && maxNumber >= 0) {
    return rawNumber >= minNumber && rawNumber <= maxNumber
  }

  if (minNumber  >= 0 && maxNumber < 0) {
    return rawNumber >= minNumber
  }

  if (minNumber < 0 && maxNumber >= 0) {
    return rawNumber <= maxNumber
  }

  return true
}
// #endregion

// #region 重製 Pin 欄位的排序
export const resetPinnedSort = (pinList: ColumnPinningState): ColumnPinningState => {
  const metaDataKeys = Object.keys(columnMeta);
  const metaDataKeysMap: Record<string, number> = metaDataKeys.reduce((map: Record<string, number>, key: string, index: number) => {
    map[key] = index;
    return map;
  }, {})

  return {
    ...pinList,
    left: pinList["left"]?.sort((a, b) => metaDataKeysMap[a] - metaDataKeysMap[b])
  }
}
// #endregion