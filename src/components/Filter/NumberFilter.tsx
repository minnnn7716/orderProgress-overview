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

  useEffect(() => {
    const minInputValue = columnFilterMin ?? facetedMinValue ?? 0;
    const maxInputValue = columnFilterMax ?? facetedMaxValue ?? 0;

    setInputValue([minInputValue, maxInputValue]);
  }, [setInputValue, columnFilterMin, columnFilterMax, facetedMinValue, facetedMaxValue]);

  const handleChange = useCallback((value: Nullable<number | null>, type: InputNumberType) => {
    let newInputValue: [number, number];

    if (type === 'Min') {
      newInputValue = [value ?? facetedMinValue ?? 0, inputMaxValue];
    } else if (type === 'Max') {
      newInputValue = [inputMinValue, value ?? facetedMaxValue ?? 0];
    } else {
      return;
    }

    const [newInputMin, newInputMax] = newInputValue;

    if (newInputMin === facetedMinValue && newInputMax === facetedMaxValue) {
      setInputValue(newInputValue);
      setFilterValue('');
      return;
    }

    setInputValue(newInputValue);
    setFilterValue(newInputValue);

  }, [inputMinValue, inputMaxValue, facetedMinValue, facetedMaxValue, setFilterValue]);

  const getInputNumberProperty = useCallback((value: number, type: InputNumberType) => {
    const isInputMinMaxEqual = inputMinValue === inputMaxValue;
    const disableBtnClassName = 'bg-gray-300 border-gray-300 hover:bg-gray-300';
    const disableIncrementBtn = (type === 'Min' ? isInputMinMaxEqual : false) || value === facetedMaxValue;
    const disableDecrementBtn = (type === 'Max' ? isInputMinMaxEqual : false) || value === facetedMinValue;

    const getMinNumber = Math.max(inputMinValue, facetedMinValue ?? -Infinity);
    const getMaxNumber = Math.min(inputMaxValue, facetedMaxValue ?? Infinity);

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
