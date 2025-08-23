import { shop } from "@/lib/api/shop/shop";
import { useState, useEffect } from "react";

function useShop(query = { }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [information, setAllInformation] = useState(null);
  useEffect(() => {
    async function fetchShop() {
      if (!query.isFetch) return;
      setLoading(true);
      setError(null);
      try {
        // fetch shop api
        const response = await shop(query);
        setAllInformation(response);
        setData(response?.data?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchShop();
  }, [JSON.stringify(query)]);

  return { data, loading, error, information };
}

export default useShop;
