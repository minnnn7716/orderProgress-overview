import { memo } from 'react'

// Types
import { HeaderContext } from '@tanstack/react-table'
import { RowData } from 'src/types/dataTypes';

// styles
import style from 'src/components/VirtualizedTable/style.module.scss'
import { classNames } from 'primereact/utils';


export const TableHeader = memo((headerCtx: HeaderContext<RowData, RowData>) => {
  const { meta } = headerCtx.column.columnDef;
  const info = meta?.getInfo ?? '';
  const key = meta?.getKey ?? '';

  return (
    <div className={classNames(
      style.headerContent,
      'toolTip-target'
    )}
    data-pr-tooltip={info.description.length > 11 ? info.description : ''}
    >
      <p className='mx-0 my-1 font-medium'>{info.description}</p>
      { import.meta.env.DEV ? <p className='m-0 text-xs font-normal'>{key}</p> : '' }
    </div>)
});