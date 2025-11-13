import { getCategoryById } from "@/lib/api/category/category";
import { useEffect, useState } from "react";

function useCategoryId(id, query = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infinityLoading, setInfinityLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    if (!id) return;
    const fetchCategory = async () => {
      setError(null);
      if (query.page === 1) {
        setLoading(true);
      } else {
        setInfinityLoading(true);
      }
      try {
        const response = await getCategoryById(id, query);
        const products = response?.data?.data?.data;
        if (Array.isArray(products)) {
          if (products.length === 0) {
            setHasMoreData(false);
          }
          setData((prev) =>
            query?.page === 1 ? products : [...prev, ...products]
          );
        }
        setLoading(false);
        setInfinityLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
        setInfinityLoading(false);
      }
    };
    fetchCategory();
  }, [id, JSON.stringify(query)]);

  return { data, loading, error, infinityLoading, hasMoreData };
}

export default useCategoryId;
