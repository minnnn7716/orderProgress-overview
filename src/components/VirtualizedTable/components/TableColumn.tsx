import { memo, useCallback } from 'react';
import { flexRender } from '@tanstack/react-table';
import { useOverflowTooltip } from 'src/hooks/useOverflowTooltip';

// Components
import { StringFilter, NumberFilter, DateFilter } from 'src/components/Filter';


// Types
import { Header, Column } from '@tanstack/react-table';
import { filterType } from 'src/config/columnMeta'

// style
import style from 'src/components/VirtualizedTable/style.module.scss'
import { classNames } from 'primereact/utils';
import { RowData } from 'src/types/dataTypes';

export const TableColumn = memo(({
  header,
  column,
  styleProps
}: {
  header: Header<RowData, unknown>,
  column: Column<RowData>,
  styleProps: React.CSSProperties
}) => {
  const { contentRef, headerRef, needsTooltip, tooltipContent, tooltipPosition, checkOverflow } = useOverflowTooltip();
  const meta = header.column.columnDef.meta;
  const isPinned = column.getIsPinned();

  const handlePinClick = useCallback(() => {
    if (isPinned === 'left') {
      column.pin(false)
    } else if (isPinned === false) {
      column.pin('left')
    }

  }, [column, isPinned])

  return (<th
    key={header.id}
    className={classNames(column.getIsSorted() && style.sorted, isPinned && style.pinned)}
    style={styleProps}
    onMouseEnter={checkOverflow}
  >
    <div
      className={classNames('resizer', style.customResizer, header.column.getIsResizing() ? 'isResizing' : '')}
      onDoubleClick={() => column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    >
    </div>
    <div
      className="flex align-items-center mb-2 cursor-pointer"
      onClick={column.getToggleSortingHandler()}
    >
      {/* Column 內容 */}
      <div
        ref={headerRef}
        className={classNames(style.overRowContainer , 'toolTip-target')}
        data-pr-tooltip={needsTooltip ? tooltipContent : ''}
        data-pr-position={tooltipPosition}
        onMouseEnter={checkOverflow}
      >
        <p className='ml-2 mt-2 mb-1 font-medium' ref={contentRef}>
          {flexRender(
            column.columnDef.header,
            header.getContext()
          )}
        </p>
      </div>
      {/* 排序 icon，點擊行為綁定於整個標題 div（column.getToggleSortingHandler()） */}
      {{
        asc: <i className="pi pi-sort-amount-down ml-2" />,
        desc: <i className="pi pi-sort-amount-up-alt ml-2" />,
      }[column.getIsSorted() as string] ?? <i className="pi pi-sort-alt ml-2" />}

    </div>
    {/* 釘選按鈕 */}
    {!header.isPlaceholder && column.getCanPin() && (
      <div className="flex gap-1 justify-center">
        <button
          className={classNames(style.pinBtn, isPinned ? style.active : null)}
          onClick={handlePinClick}
        >
          {isPinned ? <>📍</> : <>📌</>}
        </button>
      </div>
    )}
    {/* 篩選器，依據 filterVariant 渲染不同種類的篩選 */}
    {
      column.getCanFilter()
        && (meta?.filterVariant === filterType.select || meta?.filterVariant === filterType.textSelect || meta?.filterVariant === filterType.text)
        ? <StringFilter column={column} />
        : column.getCanFilter() && meta?.filterVariant === filterType.numberRange
          ? <NumberFilter column={column} />
          : column.getCanFilter() && meta?.filterVariant === filterType.dateRange
            ? <DateFilter column={column} />
            : null
    }
  </th>)
})