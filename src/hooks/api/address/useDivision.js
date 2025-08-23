import { division } from "@/lib/api/address/address";
import { useState, useEffect } from "react";

function useDivision() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDivision() {
      setLoading(true);
      setError(null);
      try {
        const response = await division();
        setData(
          response?.data?.data.map((item) => ({
            ...item,
            name: item?.id,
            value: item?.id,
            label: item?.name,
          }))
        );
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchDivision();
  }, []);

  return { data, loading, error };
}

export default useDivision;
