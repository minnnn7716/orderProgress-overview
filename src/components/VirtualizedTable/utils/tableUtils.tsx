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
/**
 * 根據特定條件為表格單元格生成警示樣式
 * 
 * @description 根據特定條件為表格單元格生成警示樣式
 *  警示規則：
 *  1. 若 cell 的 columnInfo 裡面有對應的欄位（correspondColumn），且該欄位的值爲 'error'，則顯示警示樣式
 *  2. 若 cell 的 columnKey 爲 'rcvFabRate' 或 'poRate'，且該欄位的值爲數字，則顯示警示樣式
 * @param cellCtx - 來自 TanStack Table 的 Cell 上下文
 * @returns 包含 Cell 樣式屬性的 CSSProperties 物件
 * 
 * @example
 * // 在單元格渲染函數中使用
 * const cellStyle = getRemindStyle(cell);
 */
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
/**
 * @description 為表格中的釘選列生成樣式與位置
 *
 * @param columnId - 欄位識別值
 * @param columnSizing - 紀錄各列寬度的陣列，以 columnId 為 Key
 * @param leftColumns - 釘選在左側的列陣列
 * @param getLeftVisibleLeafColumns - 回傳當前可見的左側釘選列的函式
 * @param getIsLastColumn - 檢查列是否為最後一列的函式
 * @param isPinned - 列是否釘選
 * @returns 包含釘選列樣式與位置的 CSSProperties 物件
 */
export const getCommonPinningStyles = (
  columnId: string,
  columnSizing: Record<string, number>,
  leftColumns: Column<RowData>[],
  getLeftVisibleLeafColumns: () => Column<RowData, unknown>[],
  getIsLastColumn: (position?: ColumnPinningPosition | "center") => boolean,
  isPinned: ColumnPinningPosition,
): CSSProperties => {
  const isLastLeftPinnedColumn = isPinned === 'left' && getIsLastColumn('left')

  // 取得 column 的 index 位置，用於計算「釘選」的定位
  const columnIndex = isPinned === 'left'
    ? leftColumns.findIndex(col => col.id === columnId)
    : undefined

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
/**
 * @description 計算列的有效寬度，並確保不小於最小寬度
 * 若 columnSizing 為 undefined，則回傳預設的欄位寬度（200px）
 * 若有則顯示 columnSizing，但若小於預設最小寬度則以最小寬度顯示（150px）
 * @param columnSizing - 從紀錄各列寬度的陣列提取出的列寬度
 * @returns 計算後的列寬度（像素）
 */
export const getColumnWidth = (columnSizing: number | undefined): number => {
  return columnSizing === undefined
    ? DEFAULT_COLUMN_WIDTH
    : Math.max(columnSizing, MIN_COLUMN_WIDTH)
};
// #endregion

// #region 產生拖曳欄位樣式
/**
 * @description 根據拖曳狀態生成欄位樣式
 * @param isDragging - 是否正在拖曳
 * @param isPinned - 是否釘選
 * @param transform - 由 dnd-kit 提供的定位值
 * @returns 包含拖曳欄位樣式的 CSSProperties 物件
 */
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
/**
 * @description 根據篩選器類型和篩選值過濾表格行
 * @param row - 表格行
 * @param columnId - 欄位識別值
 * @param filterValue - 篩選值
 * @param filterType - 篩選器類型
 * @returns 是否符合篩選條件
 */
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

/**
 * @description 根據日期範圍過濾表格行
 * @param rawValue - 欄位原始值
 * @param dateRange - 日期範圍
 * @returns 是否符合日期範圍條件
 */
const dateRangeFilterRule = (
  rawValue: string | number | Date | null,
  dateRange: Date[] | null
): boolean => {
  // 如果原始值為 null，則不符合篩選條件
  if (rawValue === null) {
    return false
  }

  // 如果日期範圍為 null 或空陣列，則不進行篩選
  if (!dateRange || dateRange.length === 0) {
    return true
  }

  const rawDate = formatDate(new Date(String(rawValue)));
  const startDate = formatDate(new Date(dateRange[0]));
  const endDate = formatDate(new Date(dateRange[1] ?? dateRange[0]));

  // 如果開始日期和結束日期相同，則只需檢查原始值是否等於該日期
  if (startDate === endDate) {
    return startDate === rawDate
  }

  // 檢查原始值是否在開始日期和結束日期之間
  return new Date(startDate) <= new Date(rawDate) && new Date(endDate) >= new Date(rawDate)
}

/**
 * @description 根據數字範圍過濾表格行
 * @param rawValue - 欄位原始值
 * @param numberRange - 數字範圍
 * @returns 是否符合數字範圍條件
 */
const numberRangeFilterRule = (
  rawValue: string | number | Date | null,
  numberRange: number[] | null
) => {
  if (!numberRange) {
    return true
  }

  const [minNumber, maxNumber] = numberRange;
  const rawNumber = Number(rawValue) * 100;

  // 如果最大值與最小值相等，則只需檢查原始值是否等於該值
  if ((minNumber >= 0 && maxNumber >= 0) && (minNumber === maxNumber)) {
    return rawNumber === minNumber
  }

  // 如果最大值與最小值不相等，檢查原始值是否在範圍內
  if (minNumber >= 0 && maxNumber >= 0) {
    return rawNumber >= minNumber && rawNumber <= maxNumber
  }

  // 如果最小值大於零，最大值小於零，則檢查原始值是否大於等於最小值
  if (minNumber >= 0 && maxNumber < 0) {
    return rawNumber >= minNumber
  }

  // 如果最小值小於零，最大值大於等於零，則檢查原始值是否小於等於最大值
  if (minNumber < 0 && maxNumber >= 0) {
    return rawNumber <= maxNumber
  }

  return true
}
// #endregion

// #region 重置 Pin 欄位的排序
/**
 * @description 依據 MetaData 重置釘選欄位的排序
 * @param pinList - 釘選欄位的狀態
 * @returns 重置後的釘選欄位狀態
 */
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