import { useCallback, useMemo, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';

export const CustomBreadCrumb = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleRouter = useCallback((currentPath: string) => {
    if (currentPath === pathname) return;
    navigate(currentPath)
  }, [navigate, pathname]);

  const generateItems = useCallback((pathname: string): MenuItem[] => {
    if (pathname === '/') return [];

    const pathSegments = pathname.split('/').slice(1);
    const fullPath = (index: number) => `/${pathSegments.slice(0, index + 1).join('/')}`;

    return pathSegments.map((segment: string, index) => {
      const isCurrent = index === pathSegments.length - 1;
      const className = isCurrent ? "text-primary font-semibold" : "";
      const currentPath = fullPath(index);

      const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault()
        handleRouter(currentPath)
      };

      const linkTemplate = () => (
        <a href="#" key={segment} className={className} onClick={handleLinkClick}>
          {segment}
        </a>)

      return {
        label: segment,
        template: linkTemplate,
      }
    })
  }, [handleRouter]);

  const home: MenuItem = useMemo(() => ({
    icon: 'pi pi-home',
    command: () => handleRouter('/'),
  }), [handleRouter]);

  const items: MenuItem[] = useMemo(() => generateItems(pathname), [generateItems, pathname]);

  return (<BreadCrumb
    model={items}
    home={home}
    pt={{
      root: {
        className: 'p-2',
        style: {
          width: 'fit-content'
        }
      },
    }}
  />)
})