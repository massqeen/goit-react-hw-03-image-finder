import { useEffect, useCallback, useRef } from 'react';

const useInfiniteScroll = (scrollRef, setPage) => {
  const observerRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setPage((state) => state + 1);
          }
        });
      });
      observerRef.current.observe(node);
    },
    [setPage]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};

export default useInfiniteScroll;
