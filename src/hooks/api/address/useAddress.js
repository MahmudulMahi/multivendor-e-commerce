import { address } from "@/lib/api/address/address";
import { useState, useEffect, useCallback } from "react";

function useAddress() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddress = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await address();
      setData(response?.data?.data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return { data, loading, error, refetch: fetchAddress };
}

export default useAddress;
