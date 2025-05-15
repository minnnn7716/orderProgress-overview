/**
 * @file NumberFilter.tsx
 * @description 數字範圍篩選元件，用於表格 Column 中篩選數字範圍
 * @module components/Filter/NumberFilter
 * @returns {React.ReactElement} 回傳兩個 PrimeReact 的 InputNumber 元件，分別為最小值與最大值的輸入框
 * @example
 * 傳入範例可見 src/components/VirtualizedTable/components/TableColumn.tsx
 * <NumberFilter
 *   facetedMinValue={0}
 *   facetedMaxValue={100}
 *   columnFilterValue={[10, 50]}
 *   setFilterValue={setNumberRange}
 * />
 */

/**
 * 型別定義
 * InputNumberType: 輸入框類型
 * @typedef {'Min' | 'Max'} InputNumberType - 表示是最小值輸入框還是最大值輸入框
 * 
 * NumberFilterProps: 數字篩選器傳入參數
 * @typedef NumberFilterProps
 * @property {number | undefined} facetedMinValue - 資料集中的最小值
 * @property {number | undefined} facetedMaxValue - 資料集中的最大值
 * @property {[number, number] | undefined} columnFilterValue - 傳入目前已選擇的數字範圍，若無則會傳入 undefined
 * @property {function} setFilterValue - 用於將新的篩選值設置到表格狀態的回呼函式
 */

import { useState, useEffect, useCallback, memo } from 'react'

// Components
import { InputNumber, type InputNumberValueChangeEvent } from 'primereact/inputnumber';

// Types
import { Nullable } from 'primereact/ts-helpers';

type InputNumberType = 'Min' | 'Max';

type NumberFilterProps = {
  facetedMinValue: number | undefined;
  facetedMaxValue: number | undefined;
  columnFilterValue: [number, number] | undefined;
  setFilterValue: (updater: [number, number] | "") => void;
}

export const NumberFilter = memo(({
  facetedMinValue,
  facetedMaxValue,
  columnFilterValue,
  setFilterValue,
}: NumberFilterProps) => {
  const [inputValue, setInputValue] = useState<[number, number]>([facetedMinValue ?? 0, facetedMaxValue ?? 0]);
  
  const [inputMinValue, inputMaxValue] = inputValue;
  const [columnFilterMin, columnFilterMax] = columnFilterValue ?? [undefined, undefined];

  // 當 columnFilter, facetedValue 改變時，手動更新 inputValue
  useEffect(() => {
    const minInputValue = columnFilterMin ?? facetedMinValue ?? 0;
    const maxInputValue = columnFilterMax ?? facetedMaxValue ?? 0;

    setInputValue([minInputValue, maxInputValue]);
  }, [setInputValue, columnFilterMin, columnFilterMax, facetedMinValue, facetedMaxValue]);


  const handleChange = useCallback((value: Nullable<number | null>, type: InputNumberType) => {
    let newInputValue: [number, number];

    // 設定新的輸入值，但若為 null 或 undefined 則輸入 facetedValue，若也無則為 0
    if (type === 'Min') {
      newInputValue = [value ?? facetedMinValue ?? 0, inputMaxValue];
    } else if (type === 'Max') {
      newInputValue = [inputMinValue, value ?? facetedMaxValue ?? 0];
    } else {
      return;
    }

    const [newInputMin, newInputMax] = newInputValue;

    // 若輸入框的與資料集的最大值跟最小值都相等，則表示沒有篩選，因此需要用空字串來清除 Table 的篩選狀態
    if (newInputMin === facetedMinValue && newInputMax === facetedMaxValue) {
      setInputValue(newInputValue);
      setFilterValue('');
      return;
    }

    // 若輸入框的與資料集的最大值跟最小值不相等則寫入資料進行篩選
    setInputValue(newInputValue);
    setFilterValue(newInputValue);
  }, [inputMinValue, inputMaxValue, facetedMinValue, facetedMaxValue, setFilterValue]);

  // 最大值最小值的篩選器有許多類似的設定，將共通屬性抽出至函式
  const getInputNumberProperty = useCallback((value: number, type: InputNumberType) => {
    const isInputMinMaxEqual = inputMinValue === inputMaxValue;
    const disableBtnClassName = 'bg-gray-300 border-gray-300 hover:bg-gray-300';

    // 判斷是否顯示禁用按鈕樣式
    const disableIncrementBtn = (type === 'Min' ? isInputMinMaxEqual : false) || value === facetedMaxValue;
    const disableDecrementBtn = (type === 'Max' ? isInputMinMaxEqual : false) || value === facetedMinValue;

    // 動態依據另一個篩選框計算最小值與最大值
    const getMinNumber = Math.max(inputMinValue, facetedMinValue ?? -Infinity);
    const getMaxNumber = Math.min(inputMaxValue, facetedMaxValue ?? Infinity);

    // 若 facetedMinValue 或 facetedMaxValue 為 undefined，則表示沒有資料可以篩選，因此禁用按鈕
    if (facetedMinValue === undefined || facetedMaxValue === undefined) {
      return {
        value,
        placeholder: type,
        showButtons: true,
        format: false,
        min: 0,
        max: 0,
        pt: inputNumberPt,
        incrementButtonClassName: disableBtnClassName,
        decrementButtonClassName: disableBtnClassName,
        onValueChange: () => {}
      };
    }

    return {
      value,
      placeholder: type,
      showButtons: true,
      format: false,
      min: !facetedMinValue ? 0 : type === 'Min' ? facetedMinValue : getMinNumber,
      max: !facetedMaxValue ? 0 : type === 'Min' ? getMaxNumber : facetedMaxValue,
      pt: inputNumberPt,
      incrementButtonClassName: disableIncrementBtn ? disableBtnClassName : '',
      decrementButtonClassName: disableDecrementBtn ? disableBtnClassName : '',
      onValueChange: (e: InputNumberValueChangeEvent) => handleChange(e.value, type)
    };
  }, [inputMinValue, inputMaxValue, facetedMaxValue, facetedMinValue, handleChange]);

  return <div className='flex column-gap-2'>
    <InputNumber {...getInputNumberProperty(inputMinValue, 'Min')} />
    <InputNumber {...getInputNumberProperty(inputMaxValue, 'Max')} />
  </div>
}, (oldProps, newProps) => {
  return (
    JSON.stringify(oldProps.columnFilterValue) === JSON.stringify(newProps.columnFilterValue)
    && oldProps.facetedMinValue === newProps.facetedMinValue
    && oldProps.facetedMaxValue === newProps.facetedMaxValue
  );
});

const inputNumberPt = {
  root: {
    className: "relative"
  },
  input: {
    root: {
      className: "w-full text-sm py-2 px-2"
    }
  },
  incrementButton: {
    className: "w-1rem bg-blue-400 hover:bg-blue-500 border-blue-400",
  },
  decrementButton: {
    className: "w-1rem bg-blue-400 hover:bg-blue-500 border-blue-400",
  },
}
