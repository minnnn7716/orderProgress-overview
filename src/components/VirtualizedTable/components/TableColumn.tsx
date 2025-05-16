/**
 * @file TableColumn.tsx
 * @description 表格 Column 元件，用於虛擬化表格中的 Column 渲染，提供拖曳排序、釘選、篩選、拖拉欄寬功能
 * @module components/VirtualizedTable/components/TableColumn
 * @returns {React.ReactElement} 回傳表格 Column 元件
 * @example
 * <TableColumn
 *   header={header}
 *   column={column}
 *   styleProps={{ width: '200px', height: '48px' }}
 * />
 */

/**
 * 型別定義
 * TableColumnProps: 表格 Column 元件傳入參數
 * @typedef TableColumnProps
 * @property {Header<RowData, unknown>} header - 來自 TanStack Table 的 Header 資料
 * @property {Column<RowData>} column - 來自 TanStack Table 的 Column 資料
 * @property {CSSProperties} styleProps - 傳入用於設置 Column 樣式的 CSS 屬性
 */

import { useCallback, memo, type CSSProperties } from 'react';
import { flexRender } from '@tanstack/react-table';

// Custom Hooks
import { useOverflowTooltip } from 'src/hooks/useOverflowTooltip';

// Dnd-kit
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Components
import { StringFilter, SelectFilter, NumberFilter, DateFilter, type DateRange } from 'src/components/Filter';

// Types
import { Column, Header } from '@tanstack/react-table';
import { RowData } from 'src/types/dataTypes';
import { FilterTypeEnum } from 'src/config/columnMeta';

// Utils
import { getDraggingStyles } from '../utils/tableUtils';

// Styles
import style from '../style.module.scss'
import { classNames } from 'primereact/utils';

type TableColumnProps = {
  header: Header<RowData, unknown>;
  column: Column<RowData>;
  styleProps: CSSProperties;
}

export const TableColumn = memo(({
  header,
  column,
  styleProps
}: TableColumnProps) => {
  const { contentRef, headerRef, needsTooltip, tooltipContent, tooltipPosition, checkOverflow } = useOverflowTooltip();
  const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({ id: header.column.id });
  const {
    columnDef,
    pin,
    resetSize,
    setFilterValue,
    getCanFilter,
    getCanPin,
    getFilterValue,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getIsPinned,
    getIsSorted,
    getToggleSortingHandler
  } = column;

  // 取得篩選器類型
  const { filterVariant } = columnDef.meta ?? {};
  // 取得 NumberFilter 篩選器的最小值和最大值
  const [facetedMinValue, facetedMaxValue] = getFacetedMinMaxValues() ?? [undefined, undefined];
  const needConvertToRate = column.columnDef.id === 'rcvFabRate' || column.columnDef.id === 'poRate';
  const isPinned = getIsPinned() === 'left';
  const isSorted = getIsSorted();

  const handlePinClick = useCallback(() => {
    if (isPinned) {
      pin(false)
    } else if (!isPinned) {
      pin('left')
    }
  }, [pin, isPinned])

  return (<th
    ref={setNodeRef}
    key={header.id}
    className={classNames(isSorted && style.sorted, isPinned && style.pinned)}
    style={{
      ...styleProps,
      ...getDraggingStyles(
        isDragging,
        isPinned,
        CSS.Translate.toString({ x: transform?.x || 0, y: 0, scaleX: 1, scaleY: 1 }))
    }}
    onMouseEnter={checkOverflow}
  >
    {/* 拖拉更動欄寬區塊 */}
    <div
      className={classNames('resizer', style.customResizer, header.column.getIsResizing() && 'isResizing')}
      onDoubleClick={() => resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    />

    {/* 拖曳改變排序區塊 */}
    <div className={style.dndBlock} {...attributes} {...listeners} />

    {/* Column 容器 */}
    <div
      className="relative z-5 flex align-items-center mb-2 cursor-pointer"
      onClick={getToggleSortingHandler()}
    >
      {/* Column 內容 */}
      <div
        ref={headerRef}
        className={classNames(style.overRowContainer, 'toolTip-target')}
        data-pr-tooltip={needsTooltip ? tooltipContent : ''}
        data-pr-position={tooltipPosition}
        onMouseEnter={checkOverflow}
      >
        <p
          ref={contentRef}
          className='ml-2 mt-2 mb-1 font-medium'
        >
          {flexRender(
            column.columnDef.header,
            header.getContext()
          )}
        </p>
      </div>
      {/* 排序 icon，點擊行為綁定於標題 div（getToggleSortingHandler()） */}
      {{
        asc: <i className="pi pi-sort-amount-down ml-2" />,
        desc: <i className="pi pi-sort-amount-up-alt ml-2" />,
      }[getIsSorted() as string] ?? <i className="pi pi-sort-alt ml-2" />}

    </div>
    {/* 釘選按鈕 */}
    {!header.isPlaceholder && getCanPin() && (
      <div className="flex gap-1 justify-center">
        <button
          className={classNames(style.pinBtn, isPinned && style.active)}
          onClick={handlePinClick}
        >
          {isPinned ? <>📍</> : <>📌</>}
        </button>
      </div>
    )}
    {/* 篩選器，依據 filterVariant 渲染不同種類的篩選 */}
    {
      getCanFilter() ?
        ((filterVariant === FilterTypeEnum.text)
          ? <StringFilter
            columnFilterValue={getFilterValue() as string | undefined}
            setFilterValue={setFilterValue}
          />
          : filterVariant === FilterTypeEnum.select || filterVariant === FilterTypeEnum.textSelect
            ? <SelectFilter
              enableFilter={filterVariant === FilterTypeEnum.textSelect}
              facetedUniqueKeys={Array.from(getFacetedUniqueValues().keys())}
              columnFilterValue={getFilterValue() as string | undefined}
              setFilterValue={setFilterValue}
            />
            : filterVariant === FilterTypeEnum.numberRange
              ? <NumberFilter
                facetedMinValue={needConvertToRate && facetedMinValue ? facetedMinValue * 100 : facetedMinValue}
                facetedMaxValue={needConvertToRate && facetedMaxValue ? facetedMaxValue * 100 : facetedMaxValue}
                columnFilterValue={getFilterValue() as [number, number] | undefined}
                setFilterValue={setFilterValue}
              />
              : filterVariant === FilterTypeEnum.dateRange
                ? <DateFilter 
                  columnFilterValue={getFilterValue() as DateRange | undefined}
                  setFilterValue={setFilterValue}
                />
                : null)
        : null
    }
  </th>)
})