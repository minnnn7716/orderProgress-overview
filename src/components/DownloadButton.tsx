import { useCallback, memo, type ReactNode } from 'react';
import { useCheckOrderExcel, useDownloadOrderExcel } from 'src/features/order';

// Components
import { Button, ButtonPassThroughMethodOptions } from 'primereact/button';

// Types
import { ApiProps } from 'src/features/order/types';

// Utils
import { formatDate } from 'src/utils/formatDate';

// Images
import excelIcon from 'src/assets/icon-excel.svg';

interface CustomButtonPassThroughMethodOptions extends ButtonPassThroughMethodOptions {
  context: {
    disabled: boolean;
  }
}

type DownloadButtonProps = {
  searchParams: ApiProps;
  className: string;
}

export const DownloadButton = memo(({
  searchParams,
  className
}: DownloadButtonProps) => {
  const { data, isLoading, error } = useCheckOrderExcel(searchParams);
  const { mutate: dlExcel, status } = useDownloadOrderExcel();

  const handleClick = useCallback(() => {
    dlExcel(searchParams, {
      onSuccess: (blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `產銷進度追蹤表-${formatDate(searchParams.orderDate[0]).replace(/\//g, '.')}-${formatDate(searchParams.orderDate[1]).replace(/\//g, '.')}.xlsx`);
        link.click();
        URL.revokeObjectURL(url);
      })
    });
  }, [dlExcel, searchParams]);

  return (<div className={className}>
    <Button
      outlined
      label='下載 Excel'
      severity="success"
      icon={ButtonIcon}
      loading={status === 'pending'}
      disabled={!data || error !== null || isLoading}
      onClick={handleClick}
      pt={buttonPt}
    />
  </div>)
});

const ButtonIcon: ReactNode = (
  <img
    src={excelIcon}
    alt="下載 Excel"
    style={{
      width: '18px'
    }} />
);

const buttonPt = {
  root: ({ context }: CustomButtonPassThroughMethodOptions) => ({
    className: 'h-auto lg:h-full py-2 lg:py-0 px-3 w-8rem hover:bg-green-50',
    style: context.disabled ? {
      color: '#3e3e3e',
      background: '#f4fcf7',
      borderColor: '#ffffff ',
      cursor: 'not-allowed',
      pointerEvents: 'visible'
    } : {
      color: '#3c7e55',
      borderColor: '#29a870',
      background: '#e9faf3',
      boxShadow: '0 3px 6px #00000020'
    }
  }),
  label: {
    className: 'text-sm font-medium'
  },
  icon: {
    className: 'text-sm font-normal'
  }
};
