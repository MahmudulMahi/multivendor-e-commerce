import { getSingleShopById } from "@/lib/api/shop/shop";
import { useEffect, useState } from "react";

function useSingleShopId(id, query = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infinityLoading, setInfinityLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    if (!id) return;
    const fetchSingleShop = async () => {
      setError(null);
      if (query.page === 1) {
        setLoading(true);
        setHasMoreData(true);
      } else {
        setInfinityLoading(true);
      }
      try {
        const response = await getSingleShopById(id, query);
        // depends on your API structure
        const products = response?.data?.data?.products?.data;
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
        setInfinityLoading(false);
      } finally {
        setLoading(false);
        //
      }
    };

    fetchSingleShop();
  }, [id, JSON.stringify(query)]);

  return { data, loading, error, hasMoreData, infinityLoading };
}

export default useSingleShopId;
