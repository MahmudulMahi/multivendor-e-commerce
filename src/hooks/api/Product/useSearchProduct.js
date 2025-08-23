import { searchProduct } from "@/lib/api/product/product";
import { useState, useEffect } from "react";
function useSearchProduct(query = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infinityLoading, setInfinityLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    async function fetchSearchProduct() {
      setError(null);
      if (!query?.search) return;
      if (query.page === 1) {
        setLoading(true);
      } else {
        setInfinityLoading(true);
      } 
      try {
        const response = await searchProduct(query);
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
        setLoading(false);
      } finally {
        setLoading(false);
        setInfinityLoading(false);
      }
    }
    fetchSearchProduct();
  }, [JSON.stringify(query)]);

  return { data, loading, error, infinityLoading, hasMoreData };
}
export default useSearchProduct;
