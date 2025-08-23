import { product } from "@/lib/api/product/product";
import { useState, useEffect } from "react";

function useProduct(query = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infinityLoading, setInfinityLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    async function fetchProduct() {
      if (query.page === 1) {
        setLoading(true); 
      } else {
        setInfinityLoading(true);
      } 
      setError(null);
      try {
        const response = await product(query);
        const result = response?.data?.data?.data || []; 
        if (Array.isArray(result)) {
          if(result?.length===0){
            setHasMoreData(false);
          }
          setData((prev) => (query.page === 1 ? result : [...prev, ...result]));
        }
        setInfinityLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
        setInfinityLoading(false);
      } finally {
        setLoading(false);
        // setInfinityLoading(false);
        // setHasMoreData(false);
      }
    }

    fetchProduct();
  }, [JSON?.stringify(query)]);

  return { data, loading, error, hasMoreData, infinityLoading };
}

export default useProduct;
