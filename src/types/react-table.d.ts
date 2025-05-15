/**
 * @file react-table.d.ts
 * @description TanStack Table 擴展型別定義檔，為表格欄位新增自訂屬性
 * @module types/react-table
 * @returns {void} 擴展現有型別定義，不匯出新物件
 */

/**
 * 型別定義
 * ColumnMeta: TanStack Table 欄位元數據擴展
 * @typedef {Object} ColumnMeta
 * @property {function} getRemindStyle - 根據 Cell 內容取得樣式的函式
 * @property {filterType} filterVariant - 各 Column 的篩選器類型
 * @property {ColumnDefinition} columnInfo - Column 資訊
 * @property {string} columnKey - Column 鍵值名稱
 */

// Types
import { CellContext } from "@tanstack/react-table";
import { filterType } from "src/config/columnMeta";

// 定義 TanStack Table 的 Virtualized Table 當中 ColumnHelper 字定義的 ColumnMeta 型別
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    getRemindStyle: (cellCtx: CellContext<TData, TValue>) => React.CSSProperties;
    filterVariant: filterType,
    columnInfo: ColumnDefinition;
    columnKey: string;
  }
}