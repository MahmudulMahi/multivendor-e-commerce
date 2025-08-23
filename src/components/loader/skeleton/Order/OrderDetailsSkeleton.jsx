import React from "react";

const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
);

const OrderDetailsSkeleton = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 text-gray-300">
        <SkeletonBox className="h-8 w-32" />
      </div>

      {/* Order Info */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 shadow rounded gap-4">
        <SkeletonBox className="h-6 w-40" />
        <div className="flex gap-2">
          <SkeletonBox className="h-8 w-20" />
          <SkeletonBox className="h-8 w-40" />
        </div>
      </div>

      {/* Dates */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonBox className="h-5 w-full" />
        <SkeletonBox className="h-5 w-full" />
        <SkeletonBox className="h-5 w-full" />
      </div>

      {/* Customer, Shipping, Billing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="bg-white shadow p-4 rounded space-y-2">
            <SkeletonBox className="h-5 w-32" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      {/* Items Ordered */}
      <div className="mt-6 bg-white shadow p-4 rounded">
        <SkeletonBox className="h-6 w-32 mb-4" />
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="border-b p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          >
            <SkeletonBox className="h-16 w-16" />
            <div className="flex-1 space-y-2">
              <SkeletonBox className="h-4 w-40" />
              <div className="flex gap-2">
                <SkeletonBox className="h-4 w-16" />
                <SkeletonBox className="h-4 w-16" />
              </div>
            </div>
            <div>
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-4 w-24" />
            </div>
          </div>
        ))}
        <div className="mt-4">
          <SkeletonBox className="h-5 w-32" />
        </div>
      </div>

      {/* Invoices */}
      <div className="mt-6 bg-white shadow p-4 rounded">
        <SkeletonBox className="h-6 w-32 mb-4" />
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {[...Array(5)].map((_, idx) => (
            <SkeletonBox key={idx} className="h-4 w-40" />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap justify-end gap-4">
        <SkeletonBox className="h-10 w-24" />
        <SkeletonBox className="h-10 w-32" />
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;