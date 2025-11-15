 
import { order } from "@/lib/api/order/order";
import { useState, useEffect } from "react";

function useOrder(query={}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        // call category api 
        const response = await order(query); 
        setData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [JSON.stringify(query)]);

  return { data, loading, error };
}

export default useOrder;
