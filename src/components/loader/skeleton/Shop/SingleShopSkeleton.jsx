import React from "react";

const SingleShopSkeleton = () => {
  return (
    <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-3 ">
      {[...Array(10)].map((_, idx) => (
        <ShopCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default SingleShopSkeleton;
const ShopCardSkeleton = () => (
  <div className="rounded-2xl bg-white shadow-xs overflow-hidden animate-pulse">
    {/* Image placeholder */}
    <div className="w-full h-[187px] bg-gray-200 rounded-t-2xl" />

    {/* Text placeholders */}
    <div className="border border-t-0 rounded-b-2xl md:px-3 px-2 pt-2 pb-6 space-y-2">
      {/* Title */}
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <hr className="border" />
      {/* Shop Type */}
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
      {/* Location */}
      <div className="h-3 w-2/3 bg-gray-200 rounded" />
    </div>
  </div>
);
