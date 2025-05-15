/**
 * @file buildParams.ts
 * @description 抽出傳入訂單相關的 API 參數的格式轉換函式
 * @module features/order/buildParams
 * @returns {ApiParams} 格式化後的 API 參數物件
 * @example
 * import { buildOrderParams } from 'src/features/order/buildParams';
 * 
 * const apiParams = buildOrderParams({
 *   orderDate: [new Date('2023-01-01'), new Date('2023-12-31')],
 *   custId: 'CUST001'
 * });
 * 
 * // 結果: { orderDateFrom: '2023-01-01', orderDateTo: '2023-12-31', custId: 'CUST001' }
 */

/**
 * 型別定義
 * buildOrderParams: 格式化訂單 API 參數的函式
 * @function buildOrderParams
 * @param {ApiProps} params - 訂單 API 參數
 * @param {Date[]} params.orderDate - 訂單日期範圍陣列 [起始日期, 結束日期]
 * @param {string} [params.custId] - 選填的客戶代碼
 * @returns {ApiParams} 格式化後的 API 參數物件
 */

import { formatDate } from "src/utils/formatDate";
import { ApiProps, ApiParams } from "src/features/order/types";

export const buildOrderParams = ({ orderDate, custId }: ApiProps): ApiParams => ({
  orderDateFrom: formatDate(orderDate[0]),
  orderDateTo: formatDate(orderDate[1]),
  ...(custId && { custId })
})