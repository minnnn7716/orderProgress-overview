export enum FilterTypeEnum {
  text = 'text',
  select = 'select',
  textSelect = 'textSelect',
  numberRange = 'numberRange',
  dateRange = 'dateRange',
  disable = 'disable',
}

export const columnMeta = {
  "department": {
    "type": "string",
    "description": "部門名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.textSelect
  },
  "facName": {
    "type": "string",
    "description": "收料工廠",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.textSelect
  },
  "realCustID_c": {
    "type": "string",
    "description": "客戶代碼",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.textSelect
  },
  "mpO_c": {
    "type": "string",
    "description": "MPO",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "orderNum": {
    "type": "number",
    "description": "訂單編號",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "styleNumber_c": {
    "type": "string",
    "description": "款式名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "orderDate": {
    "type": "string",
    "description": "下單日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "requestDate": {
    "type": "string",
    "description": "客戶交期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "buyInfo_c": {
    "type": "string",
    "description": "BuyInfo",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "ordSaleQty": {
    "type": "number",
    "description": "訂單數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "orderPrice": {
    "type": "string",
    "description": "成品單價是否有值",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.select
  },
  "bomFab": {
    "type": "string",
    "description": "主料是否確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.select
  },
  "bomFabDayMin": {
    "type": "string",
    "description": "主料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "bomFabDayMax": {
    "type": "string",
    "description": "主料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "bomFabError",
    "filterType": FilterTypeEnum.dateRange
  },
  "bomFabError": {
    "type": "string",
    "description": "主料確認最晚日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.disable
  },
  "ordMarkCreateDate": {
    "type": "string",
    "description": "馬克最後匯入日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "poFabDate": {
    "type": "string",
    "description": "主料採購最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "poFabPromiseDate": {
    "type": "string",
    "description": "主料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "poFabComments": {
    "type": "string",
    "description": "主料採購單最晚確認日的備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "ordSugQty": {
    "type": "number",
    "description": "主料建議需求量(含損)",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "poFabQty": {
    "type": "number",
    "description": "主料採購量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "tranFabQty": {
    "type": "number",
    "description": "主料撥用量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "poRate": {
    "type": "number",
    "description": "主料採購率",
    "format": "",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "poRcvItem": {
    "type": "string",
    "description": "主料到料項次比例",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.select
  },
  "rcvFabQty": {
    "type": "number",
    "description": "主料-工廠收貨量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "rcvFabRate": {
    "type": "number",
    "description": "主料-工廠收貨率",
    "format": "",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "poFabETA": {
    "type": "string",
    "description": "主料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "forFabETA": {
    "type": "string",
    "description": "主料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "shipFabETA": {
    "type": "string",
    "description": "主料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "estCutDate": {
    "type": "string",
    "description": "預計開裁日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "cutError",
    "filterType": FilterTypeEnum.dateRange
  },
  "cutError": {
    "type": "string",
    "description": "預計開裁日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.disable
  },
  "actCutDate": {
    "type": "string",
    "description": "實際開裁日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "schRemarks": {
    "type": "string",
    "description": "排程備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "accBom": {
    "type": "string",
    "description": "副料確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.select
  },
  "bomAccDayMin": {
    "type": "string",
    "description": "副料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "bomAccDayMax": {
    "type": "string",
    "description": "副料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "bomAccError",
    "filterType": FilterTypeEnum.dateRange
  },
  "bomAccError": {
    "type": "string",
    "description": "副料確認最晚日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.disable
  },
  "poAccDate": {
    "type": "string",
    "description": "副料採購單最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "poAccPromiseDate": {
    "type": "string",
    "description": "副料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "poAccComments": {
    "type": "string",
    "description": "副料採購單最晚確認日期備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "poAccETA": {
    "type": "string",
    "description": "副料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "forAccETA": {
    "type": "string",
    "description": "副料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "shipAccETA": {
    "type": "string",
    "description": "副料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.text
  },
  "prodQty": {
    "type": "number",
    "description": "工單件數",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "subQty": {
    "type": "number",
    "description": "整件外發數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "a100": {
    "type": "number",
    "description": "裁剪數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "b100": {
    "type": "number",
    "description": "車縫數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "e100": {
    "type": "number",
    "description": "終檢數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "f100": {
    "type": "number",
    "description": "包裝數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "g100": {
    "type": "number",
    "description": "整件外發",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "inQty": {
    "type": "number",
    "description": "成品入庫",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.numberRange
  },
  "estFirstOutputDate": {
    "type": "string",
    "description": "預計首件產出日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "estSewingOffDate": {
    "type": "string",
    "description": "預計車縫下線日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "estSewingOffDateError",
    "filterType": FilterTypeEnum.dateRange
  },
  "estSewingOffDateError": {
    "type": "string",
    "description": "預計車縫下線日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.disable
  },
  "inDate": {
    "type": "string",
    "description": "最早入庫日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  },
  "shipDate": {
    "type": "string",
    "description": "最早出貨日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "",
    "filterType": FilterTypeEnum.dateRange
  }
} as const;