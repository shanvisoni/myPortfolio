import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    width,
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1100,
    isDesktop: width >= 1100,
  };
}

export function getLayoutOffsets(width = window.innerWidth) {
  if (width < 640) return { icons: 0, taskbar: 72, side: 8 };
  if (width < 1100) return { icons: 0, taskbar: 72, side: 12 };
  return { icons: 340, taskbar: 80, side: 16 };
}
