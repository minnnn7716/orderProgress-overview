import { columnMeta } from 'src/config/columnMeta'

export type ColumnMeta = typeof columnMeta;

export type ColumnMetaKey = keyof ColumnMeta;

export type ColumnDefinition = {
  type: "string" | "number" | "boolean";
  description: string;
  nullable: boolean;
  format: string;
  visible: boolean;
  errorInfo?: string;
}

export type ColumnValueType<T extends ColumnDefinition> =
  T['type'] extends 'string'
    ? T["nullable"] extends true
      ? string | null
      : string
    : T['type'] extends 'number'
      ? T['nullable'] extends true
        ? number | null
        : number
      : T['type'] extends 'boolean'
        ? T['nullable'] extends true
          ? boolean | null
          : boolean
        : unknown;

export type CellDataFor = {
  [K in ColumnMetaKey]: ColumnValueType<ColumnMeta[K]>;
}

export type RowDataFor = CellDataFor[];