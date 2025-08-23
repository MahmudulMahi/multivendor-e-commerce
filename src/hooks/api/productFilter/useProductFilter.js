 import { filterDynamicApi } from "@/lib/api/filterApi/filterApi";
import { useState, useEffect } from "react";

function useProductFilterMaterial({route,isFetch}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => { 
    async function fetchFilterProduct() {
      if(isFetch) return;
      setLoading(true);
      setError(null);
      try {
        // call category api 
        const response = await filterDynamicApi(route); 
        setData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchFilterProduct();
  }, [route]);

  return { data, loading, error };
}

export default useProductFilterMaterial;
