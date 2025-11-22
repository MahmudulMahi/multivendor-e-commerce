import { fetchArea } from "@/lib/api/address/address";
import { useEffect, useState } from "react";
function useAreaById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const fetchAreaById = async () => {
      setLoading(true);
      try {
        const response = await fetchArea(id); 
        if (response?.data?.data?.areas?.length) {
          setData(
            response?.data?.data?.areas?.map((item) => {
              return {
                ...item,
                name: item?.id,
                label: item?.name,
                value: item?.id,
              };
            })
          );
        } else {
          setData([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchAreaById();
  }, [id]);

  return { data, loading, error };
}

export default useAreaById;
