import { useEffect } from "react";

export const useLoadingObserver = ({ setPage, observerRef, loading, hasMoreData }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMoreData) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    // ✅ cleanup to remove old observer
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, hasMoreData, setPage, observerRef]);
};
