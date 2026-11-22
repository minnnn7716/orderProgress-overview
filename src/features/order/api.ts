// 展示版只使用本機模擬資料，不建立公司 API 連線。
import { ApiData, ApiProps } from './types';
import { mockOrders, mockGeneratedAt } from './mockOrders';
import { columnMeta } from 'src/config/columnMeta';
import { RowData } from 'src/types/dataTypes';

const selectOrders = ({ orderDate: [from, to], custId }: ApiProps) => {
  const start = new Date(from).setHours(0, 0, 0, 0);
  const end = new Date(to).setHours(23, 59, 59, 999);
  return mockOrders.filter(row => row.orderDate !== null &&
    +row.orderDate >= start && +row.orderDate <= end &&
    (!custId || row.realCustID_c === custId));
};
export const fetchOrders = async (params: ApiProps): Promise<ApiData> => {
  await new Promise(resolve => setTimeout(resolve, 250));
  return { status: 'success', data: { context: { order: selectOrders(params) } } };
};
export const fetchOrderCacheTime = async (): Promise<string> => mockGeneratedAt.toISOString();
export const fetchCheckExcel = async (params: ApiProps): Promise<boolean> => selectOrders(params).length > 0;

// UTF-8 CSV 可由 Excel 開啟，使用正確的副檔名。
export const fetchDownLoadExcel = async (params: ApiProps): Promise<Blob> => {
  const keys = (Object.keys(columnMeta) as (keyof RowData)[]).filter(key => columnMeta[key].visible);
  const escape = (value: unknown) => {
    const text = value instanceof Date ? value.toLocaleDateString('sv-SE') : String(value ?? '');
    const safe = /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
    return '"' + safe.replace(/"/g, '""') + '"';
  };
  const lines = [keys.map(key => escape(columnMeta[key].description)).join(','),
    ...selectOrders(params).map(row => keys.map(key => escape(row[key])).join(','))];
  return new Blob(['\uFEFF', lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
};
