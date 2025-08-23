export const geoLocation = async()=>{
     if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
       return {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        } ;
      },
      (err) => {
        return {}
      }
    );
}