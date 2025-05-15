/**
 * @file zod.table.schema.ts
 * @description Zod 驗證模式定義檔，基於 columnMeta 動態產生表格資料的驗證規則
 * @module types/zod.table.schema
 * @returns {Object} 匯出 API Response 的 Zod 驗證模式
 * @example
 * import { APIResponseSchema } from 'src/types/zod.table.schema';
 * 
 * // 驗證 API 回應資料
 * const parseResult = APIResponseSchema.safeParse(apiResponse);
 * 
 * if (parseResult.success) {
 *   const { data } = parseResult.data;
 *   // 處理成功回應的資料
 *   const orders = data.context.order;
 * } else {
 *   // 處理錯誤回應
 *   console.error('驗證失敗:', parseResult.error);
 * }
 */

/**
 * 型別定義
 * generateOrderSchema: 產生訂單資料驗證模式的函式
 * @function generateOrderSchema
 * @description 根據 columnMeta 設定動態產生訂單資料的 Zod 驗證模式
 * @returns {z.ZodObject} 訂單資料驗證物件
 * 
 * APIResponseSchema: API 回應驗證模式
 * @constant {z.ZodUnion}
 * @description 用於驗證整個 API Response 的聯合模式，包含成功與錯誤兩種狀態
 * @property {z.ZodObject} success - 成功回應的驗證模式，包含 status 和 data 屬性
 * @property {z.ZodObject} error - 錯誤回應的驗證模式，包含 status 和 message 屬性
 */

import { z } from 'zod';
import { columnMeta } from 'src/config/columnMeta';
import { ColumnType } from './dataTypes';

const generateOrderSchema = () => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  for(const [key, meta] of Object.entries(columnMeta)) {
    const type = meta.type as ColumnType;
    let fieldSchema: z.ZodTypeAny;

    switch (type) {
      case 'string': 
        fieldSchema = z.string();
        break;
      case 'number':
        fieldSchema = z.number();
        break;
      default:
        fieldSchema = z.any();
    }

    if (meta.nullable) {
      fieldSchema = fieldSchema.nullable();
    }
    
    schemaShape[key] = fieldSchema;
  }
  return z.object(schemaShape)
};

const orderSchema = generateOrderSchema();

export const APIResponseSchema = z.union([
  z.object({
    status: z.literal("success"),
    data: z.object({
      context: z.object({
        order: z.array(orderSchema)
      })
    })
  }),
  z.object({
    status: z.literal("error"),
    message: z.string()
  })
]);