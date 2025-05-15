import { memo, useMemo, useCallback } from 'react'

// Components
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';

type StringFilterProps = {
  enableFilter: boolean;
  facetedUniqueKeys: string[];
  columnFilterValue: string | undefined;
  setFilterValue: (updater: string) => void;
}

export const SelectFilter = memo(({
  enableFilter,
  facetedUniqueKeys,
  columnFilterValue,
  setFilterValue
}: StringFilterProps) => {
  const sortedUniqueValues = useMemo(() => facetedUniqueKeys.sort(), [facetedUniqueKeys])

  const handleSetDropdownValue = useCallback(
    (e: DropdownChangeEvent) => setFilterValue(e.value)
    , [setFilterValue]);

  return <Dropdown
    showClear
    showFilterClear={enableFilter}
    filter={enableFilter}
    value={columnFilterValue ?? null}
    onChange={handleSetDropdownValue}
    options={sortedUniqueValues}
    placeholder="Dropdown..."
    pt={dropdownPt}
  />
}, (oldProps, newProps) => oldProps.columnFilterValue === newProps.columnFilterValue
  && JSON.stringify(oldProps.facetedUniqueKeys) === JSON.stringify(newProps.facetedUniqueKeys));

const dropdownPt = {
  root: {
    className: "w-full"
  },
  input: {
    className: "py-2 text-sm text-left"
  },
  trigger: {
    style: {
      width: "2rem"
    }
  },
  clearIcon: {
    style: {
      right: "2rem",
    }
  },
  filterInput: {
    className: "py-2 text-sm"
  },
  itemLabel: {
    className: "text-sm"
  },

};