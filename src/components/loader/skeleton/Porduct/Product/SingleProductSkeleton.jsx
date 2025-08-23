const ProductCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white relative shadow-xs overflow-hidden animate-pulse">
      <div className="w-full h-[187px] bg-gray-200 rounded-t-2xl" />

      <div className="border border-t-0 rounded-b-2xl md:px-3 px-2 space-y-2 py-2">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        <hr className="border" />

        {/* Vendor Name */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        {/* Price Row */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-12">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Add to Cart Button */}
        <div className="h-8 bg-gray-200 rounded w-full"></div>

        {/* Discount Tag */}
        <div className="bg-gray-300 absolute top-0 right-0 rounded-tr-2xl w-14 h-12 rounded-bl-xl" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
