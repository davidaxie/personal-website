'use client';

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

interface ScrollProgressContextValue {
  /** Ref holding current scroll progress 0–1 (for useFrame / synchronous reads) */
  progressRef: React.RefObject<number>;
  /** Subscribe to scroll progress changes */
  subscribe: (cb: (progress: number) => void) => () => void;
  /** Get current progress synchronously */
  get: () => number;
}

const ScrollProgressContext = createContext<ScrollProgressContextValue | null>(null);

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const progressRef = useRef(0);
  const subscribersRef = useRef<Set<(p: number) => void>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      progressRef.current = progress;
      subscribersRef.current.forEach((cb) => cb(progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial read
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subscribe = useCallback((cb: (progress: number) => void) => {
    subscribersRef.current.add(cb);
    return () => { subscribersRef.current.delete(cb); };
  }, []);

  const get = useCallback(() => progressRef.current, []);

  return (
    <ScrollProgressContext.Provider value={{ progressRef, subscribe, get }}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

export function useScrollProgress() {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) throw new Error('useScrollProgress must be used within ScrollProgressProvider');
  return ctx;
}
