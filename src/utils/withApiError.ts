/**
 * @file withApiError.ts
 * @description 抽出 API 錯誤處理，用於封裝 API 請求並統一處理錯誤
 * @module utils/withApiError
 * @returns {Function} 匯出 API 錯誤處理函式
 * @example
 * import { withApiError } from 'src/utils/withApiError';
 * 
 * // 包裝 API 請求並提供錯誤上下文
 * const orders = await withApiError(
 *   () => fetchOrders(params),
 *   'fetchOrders 抓取訂單資料'
 * );
 * 
 * // 錯誤時會拋出包含 ctx 的錯誤
 * // 例如: "fetchOrders 抓取訂單資料: 接收失敗 Network Error"
 */

/**
 * 型別定義
 * withApiError: API 錯誤處理函式
 * @function withApiError
 * @param {() => Promise<T>} fn - 要執行的非同步函式
 * @param {string} ctx - 錯誤時的描述
 * @returns {Promise<T>} 原函式的執行結果
 * @throws {Error} 加入錯誤描述與訊息的 Error 物件
 */

export async function withApiError<T>(
  fn: () => Promise<T>,
  ctx: string,
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${ctx}: 接收失敗 ${message}`);
  }
}