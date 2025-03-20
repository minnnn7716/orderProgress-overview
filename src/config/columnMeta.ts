export const columnMeta = {
  "department": {
    "type": "string",
    "description": "部門名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "facName": {
    "type": "string",
    "description": "收料工廠",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "realCustID_c": {
    "type": "string",
    "description": "客戶代碼",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "mpO_c": {
    "type": "string",
    "description": "MPO",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "orderNum": {
    "type": "number",
    "description": "訂單編號",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "styleNumber_c": {
    "type": "string",
    "description": "款式名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "orderDate": {
    "type": "string",
    "description": "下單日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "requestDate": {
    "type": "string",
    "description": "客戶交期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "buyInfo_c": {
    "type": "string",
    "description": "購買資訊",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "ordSaleQty": {
    "type": "number",
    "description": "訂單數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "orderPrice": {
    "type": "string",
    "description": "成品單價是否有值",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "bomFab": {
    "type": "string",
    "description": "主料是否確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "bomFabDayMin": {
    "type": "string",
    "description": "主料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "bomFabDayMax": {
    "type": "string",
    "description": "主料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": "bomFabError"
  },
  "bomFabError": {
    "type": "string",
    "description": "主料確認最晚日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "errorInfo": ""
  },
  "ordMarkCreateDate": {
    "type": "string",
    "description": "馬克最後匯入日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "poFabDate": {
    "type": "string",
    "description": "主料採購最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "poFabPromiseDate": {
    "type": "string",
    "description": "主料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "poFabComments": {
    "type": "string",
    "description": "主料採購單最晚確認日的備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "ordSugQty": {
    "type": "number",
    "description": "主料建議需求量(含損)",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "poFabQty": {
    "type": "number",
    "description": "主料採購量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "tranFabQty": {
    "type": "number",
    "description": "主料撥用量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "poRate": {
    "type": "number",
    "description": "主料採購率",
    "format": "",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "poRcvItem": {
    "type": "string",
    "description": "主料到料項次比例",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "rcvFabQty": {
    "type": "number",
    "description": "主料-工廠收貨量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "rcvFabRate": {
    "type": "number",
    "description": "主料-工廠收貨率",
    "format": "",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "poFabETA": {
    "type": "string",
    "description": "主料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "forFabETA": {
    "type": "string",
    "description": "主料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "shipFabETA": {
    "type": "string",
    "description": "主料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "estCutDate": {
    "type": "string",
    "description": "預計開裁日",
    "format": "",
    "nullable": true,
    "visible": true,
    "errorInfo": "cutError"
  },
  "cutError": {
    "type": "string",
    "description": "預計開裁日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "errorInfo": ""
  },
  "actCutDate": {
    "type": "string",
    "description": "實際開裁日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "schRemarks": {
    "type": "string",
    "description": "排程備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "accBom": {
    "type": "string",
    "description": "副料確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "bomAccDayMin": {
    "type": "string",
    "description": "副料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "bomAccDayMax": {
    "type": "string",
    "description": "副料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": "bomAccError"
  },
  "bomAccError": {
    "type": "string",
    "description": "副料確認最晚日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "errorInfo": ""
  },
  "poAccDate": {
    "type": "string",
    "description": "副料採購單最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "poAccPromiseDate": {
    "type": "string",
    "description": "副料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "poAccComments": {
    "type": "string",
    "description": "副料採購單最晚確認日期備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "poAccETA": {
    "type": "string",
    "description": "副料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "forAccETA": {
    "type": "string",
    "description": "副料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "shipAccETA": {
    "type": "string",
    "description": "副料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": "shipAccETAError"
  },
  "shipAccETAError": {
    "type": "string",
    "description": "副料實際ETA錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "errorInfo": ""
  },
  "prodQty": {
    "type": "number",
    "description": "工單件數",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "subQty": {
    "type": "number",
    "description": "整件外發數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "a100": {
    "type": "number",
    "description": "裁剪數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "b100": {
    "type": "number",
    "description": "車縫數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "e100": {
    "type": "number",
    "description": "終檢數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "f100": {
    "type": "number",
    "description": "包裝數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "g100": {
    "type": "number",
    "description": "整件外發",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "inQty": {
    "type": "number",
    "description": "成品入庫",
    "format": "",
    "nullable": false,
    "visible": true,
    "errorInfo": ""
  },
  "estFirstOutputDate": {
    "type": "string",
    "description": "預計首件產出日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "estSewingOffDate": {
    "type": "string",
    "description": "預計車縫下線日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": "estSewingOffDateError"
  },
  "estSewingOffDateError": {
    "type": "string",
    "description": "預計車縫下線日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "errorInfo": ""
  },
  "inDate": {
    "type": "string",
    "description": "最早入庫日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  },
  "shipDate": {
    "type": "string",
    "description": "最早出貨日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "errorInfo": ""
  }
} as const;