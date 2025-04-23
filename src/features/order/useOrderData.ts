import { useOrders } from "src/features/order";

// Types
import { RowData } from "src/types/dataTypes";
import { ApiProps } from "src/features/order/types";

export const useOrderData = (Props: ApiProps) => {
  const { data, isLoading, error } = useOrders(Props);

  const orders: RowData[] = data?.data?.context?.order ?? [];
  const message: string = data?.message ?? '';
  const isCaching: boolean = data?.status === 'error' && data?.message === '資料抓取中'

  return { orders, isLoading, isCaching, error, message }
}