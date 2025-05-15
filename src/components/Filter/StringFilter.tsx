import { useState, useEffect, useCallback, memo, type ChangeEvent } from 'react'

// Components
import { InputText } from "primereact/inputtext";

export type StringFilterProps = {
  columnFilterValue: string | undefined;
  setFilterValue: (updater: string) => void;
}

export const StringFilter = memo(({
  columnFilterValue,
  setFilterValue
}: StringFilterProps) => {
  const [value, setValue] = useState<string>(columnFilterValue ?? '');

  useEffect(() => {
    setValue(columnFilterValue ?? '');
  }, [columnFilterValue]);

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      setFilterValue(event.target.value)
    }
    , [setFilterValue]);

  return <InputText
    placeholder='Search...'
    value={value}
    onChange={handleTextChange}
    pt={inputTextPt}
  />
}, (oldProps, newProps) => oldProps.columnFilterValue === newProps.columnFilterValue);

const inputTextPt = {
  root: {
    className: "relative w-full py-2 text-sm"
  }
}