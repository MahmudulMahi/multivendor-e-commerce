// hooks/useDefaultAddress.js
import { postDefaultAddress } from "@/lib/api/address/address";
import { useState } from "react";

function useDefaultAddress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDefaultAddress = async (payload) => {
    setLoading(true);
    setError(null);
    try { 
      const response = await postDefaultAddress(payload);
      setData(response)
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleDefaultAddress, data, loading, error };
}

export default useDefaultAddress;
