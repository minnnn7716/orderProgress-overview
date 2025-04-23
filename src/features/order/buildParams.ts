import { formatDate } from "src/utils/formatDate";
import { ApiProps, ApiParams } from "src/features/order/types";

export const buildOrderParams = ({ orderDate, custID }: ApiProps): ApiParams => ({
  orderDateFrom: formatDate(orderDate[0]),
  orderDateTo: formatDate(orderDate[1]),
  ...(custID && { custID })
})