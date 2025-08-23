import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="w-full h-full max-h-[320px] overflow-hidden">
      <div className="flex space-x-4 animate-pulse">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full  bg-gray-200 rounded-lg h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px]"
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSkeleton;
