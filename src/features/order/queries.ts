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
      searchParams.custID ?? ''
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
      searchParams.custID ?? ''
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