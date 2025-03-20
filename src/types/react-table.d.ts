import { CellContext } from "@tanstack/react-table";

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    getContentLength: (cellCtx: CellContext<TData, TValue>) => boolean;
    getErrorStyle: (cellCtx: CellContext<TData, TValue>) => React.CSSProperties;
    getInfo: ColumnDefinition;
    getKey: string;
  }
}