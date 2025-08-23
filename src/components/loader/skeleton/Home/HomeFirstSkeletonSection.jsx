import React from "react";

const HomeFirstSkeletonSection = () => {
  return (
    <div className="flex justify-between pb-2 md:pb-4 animate-pulse">
      {/* Left header text skeleton */}
      <div className="inline-block relative">
        <div className="h-6 w-40 bg-gray-200 rounded-md mb-2" />
        <div className="h-[3px] bg-primary w-[140px] rounded-full" />
      </div>

      {/* Right text + icons */}
      <div className="flex items-center gap-2 text-sm md:text-base leading-[18px] text-[#222222]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
          <div className="h-4 w-24 bg-gray-200 rounded-md" />
        </div>
        <div className="flex items-center gap-2 pl-6">
          <div className="h-4 w-16 bg-gray-200 rounded-md" />
          <div className="w-4 h-4 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default HomeFirstSkeletonSection;
