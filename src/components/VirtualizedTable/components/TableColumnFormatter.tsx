/**
 * @file TableColumnFormatter.tsx
 * @description 表格 Column 格式化元件，傳入 generateTable 作為格式化模板
 * @module components/VirtualizedTable/components/TableColumnFormatter
 * @returns {React.ReactElement} 回傳經過格式化的表格 Column 內容
 * @example
 * <TableColumnFormatter {...headerContext} />
 */

/**
 * 型別定義
 * HeaderContext:  Column 標題上下文參數，以下皆為 TanStack Table 提供的屬性
 * @typedef {HeaderContext<RowData, RowData>} HeaderContext
 * @property {Object} column -  Column 資訊，包含 columnDef 等屬性
 * @property {Object} header - 標題相關資訊
 * @property {Object} meta - 包含 columnInfo 和 columnKey 等資料
 */

import { memo } from 'react'

// Types
import { HeaderContext } from '@tanstack/react-table'
import { RowData } from 'src/types/dataTypes';

export const TableColumnFormatter = memo((headerCtx: HeaderContext<RowData, RowData>) => {
  const { columnKey, columnInfo } = headerCtx.column.columnDef.meta ?? {};

  return <>
    { columnInfo.description }
    { import.meta.env.DEV ? <span className='block mt-1 text-xs font-normal'>{columnKey}</span> : '' }
  </>
});