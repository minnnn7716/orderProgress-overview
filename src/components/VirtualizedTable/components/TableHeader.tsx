import { memo } from 'react'

// Types
import { HeaderContext } from '@tanstack/react-table'
import { RowData } from 'src/types/dataTypes';

// styles
import style from 'src/components/VirtualizedTable/style.module.scss'
import { classNames } from 'primereact/utils';


export const TableHeader = memo((headerCtx: HeaderContext<RowData, RowData>) => {
  const { columnKey, columnInfo } = headerCtx.column.columnDef.meta ?? {};

  return (
    <div className={classNames(
      style.headerContent,
      'toolTip-target'
    )}
    data-pr-tooltip={columnInfo.description.length > 11 ? columnInfo.description : ''}
    >
      <p className='mx-0 my-1 font-medium'>{columnInfo.description}</p>
      { import.meta.env.DEV ? <p className='m-0 text-xs font-normal'>{columnKey}</p> : '' }
    </div>)
});