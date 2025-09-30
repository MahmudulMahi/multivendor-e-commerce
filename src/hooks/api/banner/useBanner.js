import { banner } from "@/lib/api/banner/banner"; 
import { useState, useEffect } from "react";

function useBanner() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchBanner() {
      setLoading(true);
      setError(null);
      try {
        // call category api 
        const response = await banner();
        setData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchBanner();
  }, []);

  return { data, loading, error };
}

export default useBanner;
