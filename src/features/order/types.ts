import { RowData } from "src/types/dataTypes";

export type ApiProps = {
  orderDate: Date[];
  custId?: string
}

export type ApiParams = {
  orderDateFrom: string;
  orderDateTo: string;
  custId?: string
}

export type ApiData = {
  status: string,
  data?: {
    context: {
      order: RowData[]
    }
  },
  message?: string
}

export type ApiCacheTime = {
  data: {
    cacheTimeStamp: string
  }
}

export type ApiCheckExcel = {
  data: {
    isExist: boolean
  }
}