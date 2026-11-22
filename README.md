# Order Progress Overview｜產銷進度追蹤表

以 React 與 TypeScript 製作的訂單進度查詢介面，從原有內部系統整理為可獨立執行的面試展示版本。展示版完全使用虛構資料，不需登入、API key 或公司網路。

## 執行

需要 Node.js 22 或以上版本。

```sh
npm ci
npm run dev
```

正式建置：`npm run build`；預覽：`npm run preview`。產物位於 `dist/`，採相對資源路徑，可部署至靜態網站的子目錄。

## 展示操作

- 預設顯示過去一年共 2,000 筆模擬訂單，日期隨開啟當天移動。
- 透過下單日期與五個虛構客戶查詢；無符合資料時顯示空狀態。
- 欄位提供文字、選單、日期與數字範圍篩選；採購率與收貨率以百分比呈現。
- 可排序、釘選、拖曳欄位、調整欄寬並清除操作狀態。
- 使用虛擬捲動呈現大量列，避免一次建立所有列的 DOM。
- 匯出 UTF-8 BOM CSV，可用 Excel 開啟；匯出範圍依上方日期與客戶查詢條件，不包含表格內的欄位篩選與排序。

## 技術與架構

React 18、TypeScript、Vite、PrimeReact、TanStack Table / Virtual / Query、dnd-kit、SCSS。

- `src/features/order/api.ts`：非同步資料介面、日期與客戶篩選及 CSV 匯出。保留 Query hooks 的呼叫方式。
- `src/features/order/mockOrders.ts`：固定分布的模擬資料，包含進度差異、缺漏日期與警示情境。
- `src/config/columnMeta.ts`：集中描述欄位型別、格式、篩選及警示關聯。
- `src/components/VirtualizedTable/`：表格狀態、虛擬捲動、拖曳與呈現。
- `src/types/zod.table.schema.ts`：原有 API 字串資料的驗證結構，展示版產生本機 Date 物件，未接入此 schema。

## 開發歷史

展示儲存庫保留原有開發順序、分支合併結構與重要 commit 說明，包含類型化篩選器、釘選與欄寬、拖曳欄位、百分比與數字範圍修正。為移除歷史中的內部設定、客戶資料、文件與識別資訊，展示歷史經清理，commit SHA 與原始儲存庫不同。原始本機儲存庫仍保留原始歷史。

目前為前端展示，資料重新整理後會重建，無真實後端或持久化；CSV 不提供原公司 Excel 模板。
