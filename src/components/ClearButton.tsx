import { memo, type ReactNode } from 'react';

// Components
import { Button } from 'primereact/button';

type ClearButtonProps = {
  label: string;
  isShow: boolean;
  clearHandler: () => void;
  className?: string;
}

export const ClearButton = memo(({
  label,
  isShow,
  clearHandler,
  className,
}: ClearButtonProps): ReactNode => {
  if (!isShow) {
    return null
  }

  return (<Button
    rounded
    label={label}
    severity="warning"
    icon="pi pi-times"
    onClick={clearHandler}
    pt={buttonPt}
    className={className ?? ''}
  />)
});

const buttonPt = {
  root: {
    className: 'py-0 px-2 outline-none transition-all transition-duration-200 transition-ease-in',
  },
  label: {
    className: 'text-sm font-normal'
  }
};