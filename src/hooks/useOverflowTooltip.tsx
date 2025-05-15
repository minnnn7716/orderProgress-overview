/**
 * @file useOverflowTooltip.tsx
 * @description 內容溢出顯示 Tooltip Hook，用於檢測文字內容是否溢出並顯示 Tooltip
 * @module hooks/useOverflowTooltip
 * @returns {Object} 回傳用於處理內容溢出並顯示 Tooltip 的參考物件與狀態
 */

/**
 * 型別定義
 * useOverflowTooltip: 內容溢出顯示 Tooltip Hook
 * @function useOverflowTooltip
 * @param {('right'|'left')} [defaultPosition='right'] - Tooltip 的顯示位置
 * @returns {OverflowTooltipResult} 內容溢出 Tooltip 控制物件
 * 
 * OverflowTooltipResult: 內容溢出顯示 Tooltip Hook 回傳值
 * @typedef OverflowTooltipResult
 * @property {LegacyRef<HTMLDivElement>} contentRef - 內容元素參考物件
 * @property {LegacyRef<HTMLDivElement>} headerRef - 包含內容的容器元素參考物件
 * @property {boolean} needsTooltip - 是否需要顯示 Tooltip
 * @property {string} tooltipContent - Tooltip 顯示的文字內容
 * @property {('right'|'left')} tooltipPosition - Tooltip 顯示的位置
 * @property {function} checkOverflow - 手動檢查是否溢出的函式
 */

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