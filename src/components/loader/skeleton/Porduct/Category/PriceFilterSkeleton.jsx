import React from "react";

const PriceFilterSkeleton = () => {
  return (
    <div>
      <div className="shadow-sm space-y-6 md:space-y-10 pb-4 px-2 rounded-md   w-full animate-pulse">
        {/* Title skeleton */}
        <div className="h-4 w-24 bg-gray-300 rounded"></div>

        {/* Input fields */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1 w-1/2">
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded-lg"></div>
          </div>
          <span className="pt-5 block h-4 w-4 bg-gray-300 rounded"></span>
          <div className="flex flex-col gap-1 w-1/2">
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded-lg"></div>
          </div>
        </div>

        {/* Slider skeleton */}
        <div className="h-4 bg-gray-300 rounded-full w-full mt-4"></div>

        {/* Button & text row */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-9 w-20 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterSkeleton;
