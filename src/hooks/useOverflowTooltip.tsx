import { useState, useRef, useCallback, useLayoutEffect, LegacyRef } from "react";

export const useOverflowTooltip = (defaultPosition: 'right' | 'left' = 'right'): {
  contentRef: LegacyRef<HTMLDivElement>,
  headerRef: LegacyRef<HTMLDivElement>,
  needsTooltip: boolean;
  tooltipContent: string;
  tooltipPosition: 'right' | 'left';
  checkOverflow: () => void;
} => {
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const [needsTooltip, setNeedsTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState(defaultPosition);

  const calculateTooltipPosition = useCallback(() => {
    if (!headerRef.current) return defaultPosition;

    const element = headerRef.current as HTMLElement;
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    const spaceRight = viewportWidth - rect.right;

    if (spaceRight < 150) {
      return 'left';
    }

    return defaultPosition;
  }, [defaultPosition]);

  const checkOverflow = useCallback(() => {
    if (contentRef.current && headerRef.current) {
      const headerContent = contentRef.current as HTMLElement;
      const isOverflowing = headerContent.scrollWidth > headerContent.clientWidth;

      setNeedsTooltip(isOverflowing);

      if (isOverflowing) {
        setTooltipContent(headerContent.innerText || '');
        setTooltipPosition(calculateTooltipPosition());
      }
    }
  }, [calculateTooltipPosition]);

  useLayoutEffect(() => {
    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkOverflow]);

  return {
    contentRef,
    headerRef,
    needsTooltip,
    tooltipContent,
    tooltipPosition,
    checkOverflow
  };
};