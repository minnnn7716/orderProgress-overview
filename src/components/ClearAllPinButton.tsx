import { memo, ReactNode, useCallback } from 'react';

// Components
import { Button } from 'primereact/button';

// Type
import { Table } from '@tanstack/react-table';
import { RowData } from 'src/types/dataTypes';
import { classNames } from 'primereact/utils';

export type pinListProps = {
  hasPin: boolean;
  table: Table<RowData> | null;
}

export const ClearAllPinButton = memo(({ pinListProps }: { pinListProps: pinListProps }): ReactNode => {
  const { hasPin, table } = pinListProps;

  const handleClearAllPin = useCallback(() => {
    table?.setColumnPinning({});
    table?.resetColumnPinning();
  }, [table])

  if (!table) {
    return null
  }

  return (<Button
    rounded
    severity="danger"
    label="清除釘選"
    icon="pi pi-times"
    onClick={handleClearAllPin}
    pt={{
      root: {
        className: classNames('hidden md:block py-0 px-2 outline-none transition-all transition-duration-200 transition-ease-in',
          hasPin ? 'opacity-100' : 'opacity-0'),
        style: {
          pointerEvents: hasPin ? 'auto' : 'none',
        }
      },
      label: {
        className: 'text-sm font-normal'
      }
    }}
  />)
});