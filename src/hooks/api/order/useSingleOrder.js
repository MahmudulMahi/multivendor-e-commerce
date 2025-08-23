 
import { singleOrder } from "@/lib/api/order/order";
import { useEffect, useState } from "react";
function useFetchSingOrderById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const fetchFetchSingOrderById = async () => {
      setLoading(true);
      try {
        const response = await singleOrder(id);
        if (response?.data?.data ) {
          setData(response?.data?.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchFetchSingOrderById();
  }, [id]);

  return { data, loading, error };
}

export default useFetchSingOrderById;
