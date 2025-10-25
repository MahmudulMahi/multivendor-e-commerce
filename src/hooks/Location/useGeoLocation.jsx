import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [latLng, setLatLng] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError("Permission denied or location unavailable");
        setLatLng({})
      }
    );
  }, []);

  return { latLng, error };
};

export default useGeolocation;
