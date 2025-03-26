export const columnMeta = {
  "department": {
    "type": "string",
    "description": "部門名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "facName": {
    "type": "string",
    "description": "收料工廠",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "realCustID_c": {
    "type": "string",
    "description": "客戶代碼",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "mpO_c": {
    "type": "string",
    "description": "MPO",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "orderNum": {
    "type": "number",
    "description": "訂單編號",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "styleNumber_c": {
    "type": "string",
    "description": "款式名稱",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "orderDate": {
    "type": "string",
    "description": "下單日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "requestDate": {
    "type": "string",
    "description": "客戶交期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "buyInfo_c": {
    "type": "string",
    "description": "BuyInfo",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "ordSaleQty": {
    "type": "number",
    "description": "訂單數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "orderPrice": {
    "type": "string",
    "description": "成品單價是否有值",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "bomFab": {
    "type": "string",
    "description": "主料是否確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "bomFabDayMin": {
    "type": "string",
    "description": "主料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "bomFabDayMax": {
    "type": "string",
    "description": "主料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "bomFabError"
  },
  "bomFabError": {
    "type": "string",
    "description": "主料確認最晚日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "correspondColumn": ""
  },
  "ordMarkCreateDate": {
    "type": "string",
    "description": "馬克最後匯入日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "poFabDate": {
    "type": "string",
    "description": "主料採購最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "poFabPromiseDate": {
    "type": "string",
    "description": "主料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "poFabComments": {
    "type": "string",
    "description": "主料採購單最晚確認日的備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "ordSugQty": {
    "type": "number",
    "description": "主料建議需求量(含損)",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "poFabQty": {
    "type": "number",
    "description": "主料採購量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "tranFabQty": {
    "type": "number",
    "description": "主料撥用量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "poRate": {
    "type": "number",
    "description": "主料採購率",
    "format": "",
    "nullable": true,
    "visible": false,
    "correspondColumn": ""
  },
  "poRcvItem": {
    "type": "string",
    "description": "主料到料項次比例",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "rcvFabQty": {
    "type": "number",
    "description": "主料-工廠收貨量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "rcvFabRate": {
    "type": "number",
    "description": "主料-工廠收貨率",
    "format": "",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "poFabETA": {
    "type": "string",
    "description": "主料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "forFabETA": {
    "type": "string",
    "description": "主料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "shipFabETA": {
    "type": "string",
    "description": "主料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "estCutDate": {
    "type": "string",
    "description": "預計開裁日",
    "format": "",
    "nullable": true,
    "visible": true,
    "correspondColumn": "cutError"
  },
  "cutError": {
    "type": "string",
    "description": "預計開裁日錯誤狀態",
    "format": "date-time",
    "nullable": false,
    "visible": false,
    "correspondColumn": ""
  },
  "actCutDate": {
    "type": "string",
    "description": "實際開裁日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "schRemarks": {
    "type": "string",
    "description": "排程備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "accBom": {
    "type": "string",
    "description": "副料確認完成",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "bomAccDayMin": {
    "type": "string",
    "description": "副料確認最早日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "bomAccDayMax": {
    "type": "string",
    "description": "副料確認最晚日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "bomAccError"
  },
  "bomAccError": {
    "type": "string",
    "description": "副料確認最晚日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": ""
  },
  "poAccDate": {
    "type": "string",
    "description": "副料採購單最晚下單日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "poAccPromiseDate": {
    "type": "string",
    "description": "副料採購單確認日期1/2/3的最晚日期",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "poAccComments": {
    "type": "string",
    "description": "副料採購單最晚確認日期備註",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "poAccETA": {
    "type": "string",
    "description": "副料預估ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "forAccETA": {
    "type": "string",
    "description": "副料貨代ETA",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "shipAccETA": {
    "type": "string",
    "description": "副料實際ETA",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": "shipAccETAError"
  },
  "shipAccETAError": {
    "type": "string",
    "description": "副料實際ETA錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": ""
  },
  "prodQty": {
    "type": "number",
    "description": "工單件數",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "subQty": {
    "type": "number",
    "description": "整件外發數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "a100": {
    "type": "number",
    "description": "裁剪數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "b100": {
    "type": "number",
    "description": "車縫數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "e100": {
    "type": "number",
    "description": "終檢數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "f100": {
    "type": "number",
    "description": "包裝數量",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "g100": {
    "type": "number",
    "description": "整件外發",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "inQty": {
    "type": "number",
    "description": "成品入庫",
    "format": "",
    "nullable": false,
    "visible": true,
    "correspondColumn": ""
  },
  "estFirstOutputDate": {
    "type": "string",
    "description": "預計首件產出日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "estSewingOffDate": {
    "type": "string",
    "description": "預計車縫下線日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": "estSewingOffDateError"
  },
  "estSewingOffDateError": {
    "type": "string",
    "description": "預計車縫下線日錯誤狀態",
    "format": "",
    "nullable": false,
    "visible": false,
    "correspondColumn": ""
  },
  "inDate": {
    "type": "string",
    "description": "最早入庫日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  },
  "shipDate": {
    "type": "string",
    "description": "最早出貨日",
    "format": "date-time",
    "nullable": true,
    "visible": true,
    "correspondColumn": ""
  }
} as const;