import { fetchCity } from "@/lib/api/address/address";
import { useEffect, useState } from "react";
function useCityById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const fetchCityById = async () => {
      setLoading(true);
      try {
        const response = await fetchCity(id);
        if (response?.data?.data?.city?.length) {
          setData(
            response?.data?.data?.city?.map((item) => {
              return {
                ...item,
                name: item?.city_id,
                label: item?.name,
                value: item?.city_id,
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
    fetchCityById();
  }, [id]);

  return { data, loading, error };
}

export default useCityById;
