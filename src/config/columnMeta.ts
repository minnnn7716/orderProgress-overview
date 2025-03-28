export enum filterType {
  text,
  select,
  textSelect,
  numberRange,
  dateRange,
}

export const columnMeta = {
  "department": {
    "type": "string",
    "description": "部門名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.textSelect
  },
  "facName": {
    "type": "string",
    "description": "收料工廠",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.textSelect
  },
  "realCustID_c": {
    "type": "string",
    "description": "客戶代碼",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.textSelect
  },
  "mpO_c": {
    "type": "string",
    "description": "MPO",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.text
  },
  "orderNum": {
    "type": "number",
    "description": "訂單編號",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "styleNumber_c": {
    "type": "string",
    "description": "款式名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.text
  },
  "orderDate": {
    "type": "string",
    "description": "下單日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "requestDate": {
    "type": "string",
    "description": "客戶交期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "buyInfo_c": {
    "type": "string",
    "description": "BuyInfo",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.text
  },
  "ordSaleQty": {
    "type": "number",
    "description": "訂單數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "orderPrice": {
    "type": "string",
    "description": "成品單價是否有值",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.select
  },
  "bomFab": {
    "type": "string",
    "description": "主料是否確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.select
  },
  "bomFabDayMin": {
    "type": "string",
    "description": "主料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "bomFabDayMax": {
    "type": "string",
    "description": "主料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "bomFabError",
    "filterType": filterType.dateRange
  },
  "bomFabError": {
    "type": "string",
    "description": "主料確認最晚日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": null
  },
  "ordMarkCreateDate": {
    "type": "string",
    "description": "馬克最後匯入日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "poFabDate": {
    "type": "string",
    "description": "主料採購最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "poFabPromiseDate": {
    "type": "string",
    "description": "主料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "poFabComments": {
    "type": "string",
    "description": "主料採購單最晚確認日的備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.text
  },
  "ordSugQty": {
    "type": "number",
    "description": "主料建議需求量(含損)",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "poFabQty": {
    "type": "number",
    "description": "主料採購量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "tranFabQty": {
    "type": "number",
    "description": "主料撥用量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "poRate": {
    "type": "number",
    "description": "主料採購率",
    "format": "",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "poRcvItem": {
    "type": "string",
    "description": "主料到料項次比例",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": filterType.select
  },
  "rcvFabQty": {
    "type": "number",
    "description": "主料-工廠收貨量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "rcvFabRate": {
    "type": "number",
    "description": "主料-工廠收貨率",
    "format": "",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "poFabETA": {
    "type": "string",
    "description": "主料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "forFabETA": {
    "type": "string",
    "description": "主料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "shipFabETA": {
    "type": "string",
    "description": "主料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.text
  },
  "estCutDate": {
    "type": "string",
    "description": "預計開裁日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "cutError",
    "filterType": filterType.dateRange
  },
  "cutError": {
    "type": "string",
    "description": "預計開裁日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": null
  },
  "actCutDate": {
    "type": "string",
    "description": "實際開裁日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "schRemarks": {
    "type": "string",
    "description": "排程備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.text
  },
  "accBom": {
    "type": "string",
    "description": "副料確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.select
  },
  "bomAccDayMin": {
    "type": "string",
    "description": "副料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "bomAccDayMax": {
    "type": "string",
    "description": "副料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "bomAccError",
    "filterType": filterType.dateRange
  },
  "bomAccError": {
    "type": "string",
    "description": "副料確認最晚日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": null
  },
  "poAccDate": {
    "type": "string",
    "description": "副料採購單最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "poAccPromiseDate": {
    "type": "string",
    "description": "副料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "poAccComments": {
    "type": "string",
    "description": "副料採購單最晚確認日期備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.text
  },
  "poAccETA": {
    "type": "string",
    "description": "副料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "forAccETA": {
    "type": "string",
    "description": "副料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "shipAccETA": {
    "type": "string",
    "description": "副料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "shipAccETAError",
    "filterType": filterType.text
  },
  "shipAccETAError": {
    "type": "string",
    "description": "副料實際ETA錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": null
  },
  "prodQty": {
    "type": "number",
    "description": "工單件數",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "subQty": {
    "type": "number",
    "description": "整件外發數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "a100": {
    "type": "number",
    "description": "裁剪數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "b100": {
    "type": "number",
    "description": "車縫數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "e100": {
    "type": "number",
    "description": "終檢數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "f100": {
    "type": "number",
    "description": "包裝數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "g100": {
    "type": "number",
    "description": "整件外發",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "inQty": {
    "type": "number",
    "description": "成品入庫",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.numberRange
  },
  "estFirstOutputDate": {
    "type": "string",
    "description": "預計首件產出日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "estSewingOffDate": {
    "type": "string",
    "description": "預計車縫下線日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "estSewingOffDateError",
    "filterType": filterType.dateRange
  },
  "estSewingOffDateError": {
    "type": "string",
    "description": "預計車縫下線日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": null
  },
  "inDate": {
    "type": "string",
    "description": "最早入庫日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  },
  "shipDate": {
    "type": "string",
    "description": "最早出貨日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": filterType.dateRange
  }
} as const;