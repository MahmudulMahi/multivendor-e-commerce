import { singleAddress } from "@/lib/api/address/address";
import { useEffect, useState } from "react";
function useFetchSingAddressById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const fetchFetchSingAddressById = async () => {
      setLoading(true);
      try {
        const response = await singleAddress(id);
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
    fetchFetchSingAddressById();
  }, [id]);

  return { data, loading, error };
}

export default useFetchSingAddressById;
