import React from "react";

export default function CartSkeleton() {
  return (
    <div className="animate-pulse space-y-6 text-gray-300">
      {/* Header */}
      <div className="h-8 w-48 bg-gray-200 rounded-md"></div>

      {/* Select All */}
      <div className="flex items-center gap-2 border rounded px-4 py-3">
        <div className="w-5 h-5 bg-gray-200 border rounded-sm"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side */}
        <div className="flex-1 space-y-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 items-center border rounded-lg p-4 gap-y-4 md:gap-0"
            >
              {/* Product Details */}
              <div className="md:col-span-6 flex items-start gap-4">
                <div className="w-5 h-5 bg-gray-200 border rounded-sm"></div>
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Price */}
              <div className="md:col-span-2 text-center">
                <div className="h-4 w-16 bg-gray-200 mx-auto rounded"></div>
              </div>

              {/* Qty buttons */}
              <div className="md:col-span-2 flex justify-center items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="h-4 w-6 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>

              {/* Total */}
              <div className="md:col-span-2 text-right">
                <div className="h-4 w-20 bg-gray-200 ml-auto rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="border rounded-lg p-6 bg-white shadow-md space-y-4">
            <div className="h-5 w-40 bg-gray-200 rounded"></div>

            <div className="flex justify-between text-sm">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-semibold">
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="h-10 w-full bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
