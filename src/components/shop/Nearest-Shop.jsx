import React, { useState } from "react";
import useShop from "@/hooks/api/Shop/useShop";
import useGeolocation from "@/hooks/Location/useGeoLocation";
import SingleShopCard from "../card/SingleShopCard";
import SingleShopSkeleton from "../loader/skeleton/Shop/SingleShopSkeleton";
import Pagination from "../ui/Pagination"; 
const NearestShop = () => {
  const [page, setPage] = useState(1);
  const { latLng } = useGeolocation();
  const {
    data: shopList,
    loading: shopLoading,
    information,
  } = useShop({
    ...latLng,
    per_page: 12,
    page,
    isFetch: latLng ? true : false,
  });

  return (
    <div className="text-[#1e1e1f] ">
      {shopLoading ? (
        <SingleShopSkeleton />
      ) : (
        <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-3 ">
          {shopList?.map((shop, idx) => (
            <SingleShopCard shop={shop} key={idx} />
          ))}
        </div>
      )}
      <Pagination
        page={information?.data?.data?.current_page}
        setPage={setPage}
        totalPage={information?.data?.data?.last_page}
      />
    </div>
  );
};

export default NearestShop;
