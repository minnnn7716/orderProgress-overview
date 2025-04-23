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