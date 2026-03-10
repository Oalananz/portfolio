import { useEffect, useRef, useState, useCallback } from 'react';

export function useInView(threshold = 0.15): [React.RefCallback<HTMLDivElement>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || isVisible) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerRef.current?.disconnect();
          }
        },
        { threshold }
      );

      observerRef.current.observe(node);
    },
    [threshold, isVisible]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return [ref, isVisible];
}
