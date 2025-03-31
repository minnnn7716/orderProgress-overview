// Types
import { CellContext } from "@tanstack/react-table";
import { filterType } from "src/config/columnMeta";

// 定義 TanStack Table 的 Virtualized Table 當中 ColumnHelper 字定義的 ColumnMeta 型別
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    getContentLength: (cellCtx: CellContext<TData, TValue>) => boolean;
    getRemindStyle: (cellCtx: CellContext<TData, TValue>) => React.CSSProperties;
    filterVariant: filterType | null,
    columnInfo: ColumnDefinition;
    columnKey: string;
  }
}