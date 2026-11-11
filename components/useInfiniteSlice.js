"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteSlice(total, pageSize, resetKey) {
  const [shown, setShown] = useState(pageSize);
  const sentinel = useRef(null);

  useEffect(() => {
    setShown(pageSize);
  }, [resetKey, pageSize]);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || shown >= total) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown((count) => Math.min(total, count + pageSize));
        }
      },
      { rootMargin: "480px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown, total, pageSize]);

  return { shown: Math.min(shown, total), sentinel, hasMore: shown < total };
}
