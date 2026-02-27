'use client';

import { useEffect, useRef } from 'react';

/** Returns a ref with normalized cursor position { x: -1..1, y: -1..1 } */
export function useCursorPosition() {
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return posRef;
}
