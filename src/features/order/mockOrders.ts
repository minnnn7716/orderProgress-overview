import { columnMeta } from 'src/config/columnMeta';
import { custIdList } from 'src/config/custIDList';
import { RowData } from 'src/types/dataTypes';

export const mockGeneratedAt = new Date();
mockGeneratedAt.setHours(0, 0, 0, 0);
const dateAt = (days: number) => {
  const date = new Date(mockGeneratedAt);
  date.setDate(date.getDate() + days);
  return date;
};
// 固定分布、日期隨開啟日移動，未來面試時仍可查到資料。
export const mockOrders: RowData[] = Array.from({ length: 2000 }, (_, index) => {
  const age = index % 365;
  const quantity = 500 + (index % 30) * 100;
  const progress = (index % 11) / 10;
  const row = Object.fromEntries(Object.entries(columnMeta).map(([key, meta]) => [key,
    meta.type === 'number' ? 0 : meta.nullable ? null : ''
  ])) as unknown as RowData;
  for (const [key, meta] of Object.entries(columnMeta)) {
    if (meta.format === 'date-time' && meta.nullable) {
      Object.assign(row, { [key]: index % 9 === 0 ? null : dateAt(-age + 14) });
    }
  }
  return Object.assign(row, {
    department: ['業務一部', '業務二部', '業務三部'][index % 3],
    facName: ['示範工廠 A', '示範工廠 B', '示範工廠 C'][index % 3],
    realCustID_c: custIdList[index % custIdList.length].code,
    mpO_c: 'DEMO-PO-' + String(index + 1).padStart(5, '0'),
    orderNum: 100001 + index,
    styleNumber_c: ['輕量外套', '機能長褲', '保暖背心', '防風上衣'][index % 4],
    orderDate: dateAt(-age), requestDate: dateAt(-age + 90),
    buyInfo_c: ['春夏系列', '秋冬系列'][index % 2],
    ordSaleQty: quantity, orderPrice: index % 5 === 0 ? '未確認' : '已確認',
    bomFab: index % 4 === 0 ? '未完成' : '已完成',
    accBom: index % 3 === 0 ? '未完成' : '已完成',
    bomFabError: index % 7 === 0 ? 'error' : '',
    cutError: index % 13 === 0 ? 'error' : '',
    estSewingOffDateError: index % 17 === 0 ? 'error' : '',
    poFabComments: index % 7 === 0 ? '示範：待確認交期' : '',
    schRemarks: index % 13 === 0 ? '示範：排程需追蹤' : '',
    ordSugQty: quantity, poFabQty: Math.round(quantity * progress), tranFabQty: 0,
    poRate: index % 19 === 0 ? 1.05 : progress,
    poRcvItem: (index % 5) + '/5', rcvFabQty: Math.round(quantity * progress * 0.9),
    rcvFabRate: index % 23 === 0 ? null : progress * 0.9,
    shipFabETA: index % 4 === 0 ? '待安排' : '已到料',
    prodQty: quantity, subQty: 0, g100: 0,
    a100: Math.round(quantity * progress), b100: Math.round(quantity * progress * 0.9),
    e100: Math.round(quantity * progress * 0.8), f100: Math.round(quantity * progress * 0.7),
    inQty: Math.round(quantity * progress * 0.6),
  });
});
