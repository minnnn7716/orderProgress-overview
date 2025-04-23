import { RowData } from "src/types/dataTypes";

export type ApiProps = {
  orderDate: Date[];
  custID?: string
}

export type ApiParams = {
  orderDateFrom: string;
  orderDateTo: string;
  custID?: string
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