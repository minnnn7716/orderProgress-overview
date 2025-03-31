// 透過本地端 columnMeta 定義 Column、Row、Cell 型別
import { columnMeta, filterType } from 'src/config/columnMeta'
export type ColumnMeta = typeof columnMeta;
export type ColumnMetaKey = keyof ColumnMeta;
export type ColumnType = ColumnMeta[ColumnMetaKey]['type'];

/* 
  ColumnDefinition 描述 Column 的資訊
    type: 型別
    description: 描述
    nullable: 是否可為 null
    format: 格式，目前只有 'date-time' 用於判斷字串是否為日期
    visible: 是否顯示於畫面，例如 bomFabError 的值用來判斷 bomFabDayMax 欄位是否反黃，因此 bomFabError 不需要顯示於畫面上
    correspondColumn: 對應欄位，以上面的例子 bomFabError 的對應是 bomFabDayMax，若不需要則為空字串
*/
export type ColumnDefinition = {
  type: ColumnType;
  description: string;
  nullable: boolean;
  format: string;
  visible: boolean;
  correspondColumn: string;
  filterType: filterType | null;
}

// ColumnValueType 描述依據 ColumnDefinition 判斷欄位「值」對應的型別
export type ColumnValueType<T extends ColumnDefinition> =
  T['type'] extends 'string'
    ? T["format"] extends 'date-time'
      ? (T["nullable"] extends true ? Date | null : Date)
      : (T["nullable"] extends true ? string | null : string)
      
    : T['type'] extends 'number'
      ? (T['nullable'] extends true ? number | null : number)

      : T['type'] extends 'boolean'
        ? (T['nullable'] extends true ? boolean | null : boolean)
        : unknown;

// RowData 描述 Key-Value 對應型別
export type RowData = {
  [K in ColumnMetaKey]: ColumnValueType<ColumnMeta[K]>;
}
