import { memo, useCallback, useState } from 'react';

import { useCheckOrderExcel, fetchDownLoadExcel } from 'src/api/fetchData';

// Components
import { Button, ButtonPassThroughMethodOptions } from 'primereact/button';

// Types
import { apiProps } from 'src/api/fetchData';

// Utilities
import { formatDate } from 'src/utilities/formatDate';

// Images
import excelIcon from 'src/assets/icon-excel.svg';

interface CustomButtonPassThroughMethodOptions extends ButtonPassThroughMethodOptions {
  context: {
    disabled: boolean;
  }
}

export const DownloadButton = memo(({ searchParams, className }: { searchParams: apiProps, className: string }) => {
  const { data, isLoading, error } = useCheckOrderExcel(searchParams);
  const [isDlLoading, setIsDlLoading] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsDlLoading(true);

    fetchDownLoadExcel(searchParams)
      .then((res) => {
        setIsDlLoading(false);
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
  
        link.href = url;
        link.setAttribute('download', `產銷進度追蹤表-${formatDate(searchParams.orderDate[0]).replace(/\//g, '.')}-${formatDate(searchParams.orderDate[1]).replace(/\//g, '.')}.xlsx`);
  
        document.body.appendChild(link);
        link.click();
  
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  }, [searchParams, setIsDlLoading]);

  return (<div className={className}>
    <Button
      outlined
      label='下載 Excel'
      severity="success"
      icon={ButtonIcon}
      loading={isDlLoading}
      disabled={!data || error !== null || isLoading}
      onClick={handleClick}
      pt={buttonPt}
    />
  </div>)
});

const ButtonIcon: React.ReactNode = (
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
