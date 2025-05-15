import { memo } from 'react';

// Components
import { TableColumn } from './TableColumn';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

// Types
import { Table, Column, ColumnSizingState } from '@tanstack/react-table';
import { VirtualItem } from "@tanstack/react-virtual";
import { RowData } from 'src/types/dataTypes';

// Utils
import { getCommonPinningStyles, getColumnWidth } from '../utils/tableUtils';

// Styles
import style from '../style.module.scss';

type TableHeaderProps = {
  table: Table<RowData>;
  leftColumns: Column<RowData, unknown>[];
  centerColumns: Column<RowData, unknown>[];
  columnSizing: ColumnSizingState;
  virtualItems: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const TableHeader = memo(({
  table,
  leftColumns,
  centerColumns,
  columnSizing,
  virtualItems,
  virtualPaddingLeft,
  virtualPaddingRight
} : TableHeaderProps) => {
  return <thead className={style.thead}>
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {/* 渲染左側釘選的 Columns，沒有使用 Virtualize */}
        <SortableContext
          items={leftColumns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {leftColumns.map(column => {
            const header = headerGroup.headers.find(h => h.column.id === column.id);
            if (!header) return null;

            return <TableColumn
              key={header.id}
              header={header}
              column={column}
              styleProps={{
                ...getCommonPinningStyles(
                  column.id,
                  columnSizing,
                  leftColumns,
                  table.getLeftVisibleLeafColumns,
                  column.getIsLastColumn,
                  column.getIsPinned(),
                ),
                width: getColumnWidth(columnSizing[column.id]),
              }}
            />
          })}
        </SortableContext>

        {/* 渲染其餘沒有釘選的 Columns，使用 Virtualize */}
        {virtualPaddingLeft ? (
          <th style={{ width: virtualPaddingLeft }} />
        ) : null}

        <SortableContext
          items={centerColumns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {virtualItems.map(vc => {
            // 防止超出邊界
            if (vc.index >= centerColumns.length) return null;

            const column = centerColumns[vc.index];
            if (!column) return null;

            const header = headerGroup.headers.find(h => h.column.id === column.id);
            if (!header) return null;

            return <TableColumn
              key={header.id}
              header={header}
              column={column}
              styleProps={{ width: getColumnWidth(columnSizing[column.id]) }}
            />
          })}
        </SortableContext>

        {virtualPaddingRight ? (
          <th style={{ width: virtualPaddingRight }} />
        ) : null}
      </tr>
    ))}
  </thead>
})