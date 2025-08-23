const SkeletonProductDetails = () => {
  return (
    <div className="max-w-[1360px] mx-auto p-4 space-y-4 animate-pulse">
      {/* Discount badge */}
      <div className="w-14 h-6 rounded-full bg-red-300" />

      {/* Organic badge */}
      <div className="w-24 h-6 rounded-full bg-green-200" />

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-1/2 aspect-[247/187] bg-gray-200 rounded-xl" />

        {/* Content */}
        <div className="space-y-4 w-full md:w-1/2">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          {/* Vendor & SKU */}
          <div className="h-4 bg-gray-200 rounded w-full" />
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>
          {/* Price */}
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>
          {/* Quantity & Buttons */}
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-28 bg-gray-200 rounded" />
            <div className="h-10 w-24 bg-gray-200 rounded" />
          </div>
          {/* Info */}
          <div className="space-y-1">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
          {/* Payment Info */}
          <div className="flex items-start gap-2 border border-gray-200 p-3 rounded">
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductDetails;
