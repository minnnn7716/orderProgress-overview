/**
 * @file useOrderData.ts
 * @description 訂單資料處理 Hook，整合 useOrders 查詢結果，轉換 API 回傳的資料轉化為所需的回傳資訊
 * @module features/order/useOrderData
 * @returns {OrderDataResult} 回傳處理後的訂單資料及狀態
 * @example
 * import { useOrderData } from 'src/features/order/useOrderData';
 * 
 * // 獲取處理後的訂單資料
 * const { 
 *   orders,
 *   isLoading, 
 *   isCaching, 
 *   error, 
 *   message 
 * } = useOrderData({
 *   orderDate: [new Date('2023-01-01'), new Date('2023-12-31')],
 *   custID: 'CUST001'
 * });
 */

/**
 * 型別定義
 * OrderDataResult: 訂單資料處理 Hook 的回傳結果
 * @typedef OrderDataResult
 * @property {RowData[]} orders - 處理後的訂單資料陣列
 * @property {boolean} isLoading - 資料是否正在載入中
 * @property {boolean} isCaching - 資料是否正在快取中
 * @property {Error | null} error - 錯誤物件，若無錯誤則為 null
 * @property {string} message - API 回傳訊息
 * 
 * useOrderData: 訂單資料處理勾子
 * @function useOrderData
 * @param {ApiProps} Props - 搜尋參數，包含日期範圍與客戶代碼
 * @returns {OrderDataResult} 處理後的訂單資料及狀態
 */

import { useMemo } from "react";
import { useOrders } from "src/features/order";

// Types
import { RowData } from "src/types/dataTypes";
import { ApiProps } from "src/features/order/types";

export type OrderDataResult = {
  orders: RowData[];
  isLoading: boolean;
  isCaching: boolean;
  error: Error | null;
  message: string;
}

export const useOrderData = (Props: ApiProps): OrderDataResult => {
  const { data, isLoading, error } = useOrders(Props);

  return useMemo(() => {
    const orders: RowData[] = data?.data?.context?.order ?? [];
    const message: string = data?.message ?? '';
  
    const isCaching: boolean = data?.status === 'error' && data?.message === '資料抓取中';
  
    return { orders, isLoading, isCaching, error, message }
  }, [data, isLoading, error]);
}