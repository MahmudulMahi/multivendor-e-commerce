import React from "react";

export default function CheckoutPageSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto animate-pulse text-gray-300">
      {/* Left Content */}
      <div className="md:col-span-2 space-y-6">
        {/* Shipping Information Skeleton */}
        <div className="bg-white p-5 rounded shadow space-y-4">
          <div className="h-5 w-40 bg-gray-200 rounded"></div>

          <div className="border p-4 rounded text-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-blue-100 rounded"></div>
              </div>
              <div className="h-6 w-20 bg-blue-100 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-28 bg-gray-100 rounded"></div>
          </div>
        </div>

        {/* Product Summary Skeleton */}
        <div>
          <div className="h-6 w-52 bg-gray-200 rounded mb-4"></div>
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 gap-2 py-2 items-center"
            >
              <div className="col-span-6 flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <div className="h-4 w-12 bg-gray-200 mx-auto rounded"></div>
              </div>
              <div className="col-span-2 text-center">
                <div className="h-4 w-8 bg-gray-200 mx-auto rounded"></div>
              </div>
              <div className="col-span-2 text-right">
                <div className="h-4 w-12 bg-gray-200 ml-auto rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Order Summary */}
      <div className="bg-white p-5 rounded space-y-5 shadow">
        <div className="h-5 w-36 bg-gray-200 rounded"></div>

        <div className="border-t pt-4 text-sm space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="border-t pt-4 text-base font-semibold flex justify-between">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-16 bg-blue-200 rounded"></div>
        </div>

        <div className="w-full h-9 bg-blue-300 rounded-md"></div>
      </div>
    </div>
  );
}
