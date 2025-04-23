import { memo, ReactNode } from 'react';

// Components
import { Button } from 'primereact/button';

// Type
import { classNames } from 'primereact/utils';

export type dataLengthProps = {
  columnLength: number;
  rowLength: number;
  isFilter: boolean;
  filterRowLength: number;
  handelClearAllFilters: () => void
}

export const DataLength = memo(({ dataLengthProps }: { dataLengthProps: dataLengthProps }): ReactNode => {
  const { columnLength, rowLength, isFilter, filterRowLength, handelClearAllFilters } = dataLengthProps;

  return (<div className='m-0 flex flex-column md:flex-row align-items-start column-gap-2'>
    <p className='m-0 mb-2 md:mb-0 py-1 px-3 bg-bluegray-500 text-sm text-white border-round-2xl'>
      總共 {columnLength} 欄、<span className='inline-block text-center'>{rowLength}</span> 筆資料
    </p>
    <div className={classNames('transition-all transition-duration-300 transition-ease-in',
      isFilter ? 'max-w-max h-auto opacity-100' : 'max-w-0 overflow-hidden opacity-0'
    )}
    style={{
      height: isFilter ? 'auto' : 0,
    }}
    >
      <p
        className={classNames('flex m-0 py-0 pl-3 bg-yellow-300 text-sm border-round-2xl transition-all transition-duration-200 transition-ease-in'
        )}
        style={{
          pointerEvents: isFilter ? 'auto' : 'none',
        }}
      >
        <span className='py-1 mr-2 inline-block'>
          篩選後共 <strong>{filterRowLength}</strong> 筆
        </span>
        <Button
          rounded
          severity="warning"
          label="清除篩選"
          icon="pi pi-times"
          onClick={handelClearAllFilters}
          pt={{
            root: {
              className: 'py-0 px-2 outline-none'
            },
            label: {
              className: 'text-sm font-normal'
            }
          }}
        />
      </p>
    </div>
  </div>)
})


