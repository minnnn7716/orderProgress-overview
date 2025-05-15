/**
 * @file stateTypes.ts
 * @description Table 狀態型別定義檔，包含表格釘選、排序狀態與初始狀態的型別
 * @module types/stateTypes
 * @returns {Object} 匯出表格狀態相關的型別定義
 */

/**
 * 型別定義
 * TablePinSortState: 表格釘選與排序狀態
 * @typedef {Object} TablePinSortState
 * @property {boolean} isPinned - 表格是否有被釘選的欄位
 * @property {boolean} isSorted - 表格是否有被排序的欄位
 * 
 * TablePinSortHandler: 表格釘選與排序處理函式
 * @typedef {Object} TablePinSortHandler
 * @property {function} handleClearAllPin - 清除所有欄位釘選的函式
 * @property {function} handleClearAllSort - 清除所有欄位排序的函式
 * 
 * InitialState: Table 初始狀態
 * @typedef {Object} InitialState
 * @property {Date[]} dateRange - 日期範圍
 * @property {DataLengthProps} dataLength - 表格資料長度資訊
 * @property {TablePinSortState} pinSortState - 表格釘選與排序狀態
 * @property {TablePinSortHandler} pinSortHandler - 表格釘選與排序處理函式
 * @property {InitialTableState} table - TanStack Table 的初始狀態
 */

import { InitialTableState } from '@tanstack/react-table';
import { type DataLengthProps } from 'src/components/DataLength';

export type TablePinSortState = {
  isPinned: boolean,
  isSorted: boolean,
}

export type TablePinSortHandler = {
  handleClearAllPin: () => void,
  handleClearAllSort: () => void
}

export type InitialState = {
  dateRange: Date[],
  dataLength: DataLengthProps,
  pinSortState: TablePinSortState,
  pinSortHandler: TablePinSortHandler,
  table: InitialTableState
}