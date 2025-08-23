import { singleProduct } from "@/lib/api/product/product";
import { useEffect, useState } from "react"; 
function useProductId(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const fetchProductId = async () => {
      setLoading(true);
      try {
        const response = await singleProduct(id);
        setData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false); 
      }
    };
    fetchProductId();
  }, [id]);

  return { data, loading, error };
}

export default useProductId;
