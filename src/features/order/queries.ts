/**
 * @file queries.ts
 * @description 集中管理 TanStack Query 訂單資料查詢 Hooks，提供訂單資料、快取時間及 Excel 檔案操作的 Query Hooks
 * @module features/order/queries
 * @returns {Object} 匯出多個 TanStack Query Hooks
 * @example
 * import { useOrders, useOrderCacheTime, useCheckOrderExcel } from 'src/features/order/queries';
 * 
 * // 查詢訂單資料
 * const { data, isLoading, error } = useOrders({
 *   orderDate: [new Date('2023-01-01'), new Date('2023-12-31')],
 *   custID: 'CUST001'
 * });
 * 
 * // 查詢資料快取時間
 * const { data: cacheTime } = useOrderCacheTime();
 * 
 * // 檢查 Excel 是否可下載
 * const { data: isExcelAvailable } = useCheckOrderExcel(searchParams);
 * 
 * // 下載 Excel 檔案
 * const { mutate: downloadExcel } = useDownloadOrderExcel();
 * downloadExcel(searchParams);
 */

/**
 * 型別定義
 * useOrders: 訂單資料查詢 Hook
 * @function useOrders
 * @param {ApiProps} searchParams - 搜尋參數，包含日期範圍與客戶代碼
 * @returns {UseQueryResult<ApiData>} TanStack Query 結果物件，包含資料、載入狀態等
 * 
 * useOrderCacheTime: 資料快取時間查詢 Hook
 * @function useOrderCacheTime
 * @returns {UseQueryResult<string>} TanStack Query 結果物件，包含快取時間字串
 * 
 * useCheckOrderExcel: 檢查 Excel 檔案是否存在的查詢 Hook
 * @function useCheckOrderExcel
 * @param {ApiProps} searchParams - 搜尋參數，包含日期範圍與客戶代碼
 * @returns {UseQueryResult<boolean>} TanStack Query 結果物件，包含是否有可用的 Excel
 * 
 * useDownloadOrderExcel: 下載 Excel 檔案的 Hook
 * @function useDownloadOrderExcel
 * @returns {UseMutationResult<Blob, Error, ApiProps>} TanStack Query 變異結果物件
 */

import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchOrders, fetchCheckExcel, fetchOrderCacheTime, fetchDownLoadExcel } from "./api";

// Types
import { ApiProps } from "src/features/order/types";

const staleTime = 5 * 60 * 1000;

export const useOrders = (searchParams: ApiProps) => (
  useQuery({
    queryKey: [
      'orders',
      searchParams.orderDate.map(date => date.toString()),
      searchParams.custId ?? ''
    ],
    queryFn: () => fetchOrders(searchParams),
    staleTime,
  })
);

export const useOrderCacheTime = () => (
  useQuery({
    queryKey: ['orderCacheTime'],
    queryFn: fetchOrderCacheTime,
    staleTime
  })
)

export const useCheckOrderExcel = (searchParams: ApiProps) => (
  useQuery({
    queryKey: [
      'checkOrderExcel',
      searchParams.orderDate.map(date => date.toString()),
      searchParams.custId ?? ''
    ],
    queryFn: () => fetchCheckExcel(searchParams),
    staleTime
  })
)

export const useDownloadOrderExcel = () => (
  useMutation({
    mutationKey: ['downloadOrderExcel'],
    mutationFn: fetchDownLoadExcel,
    retry: false,
  })
)