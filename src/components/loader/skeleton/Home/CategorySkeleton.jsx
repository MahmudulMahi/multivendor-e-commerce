const CategorySkeleton = () => {
  return (
    <div className="w-full pb-5">
      <div className="w-full px-4 py-3 rounded-t-lg border border-[#E5E7EB] border-b-0 flex items-center justify-between gap-2 bg-gray-100 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-full max-h-[calc(100vh-0px)] transition-all duration-500 ease-in-out">
        <nav className="flex justify-center items-center w-full">
          <ul className="flex flex-col list-none bg-white max-h-[calc(100vh-80px)] border rounded-b-lg border-t-0 w-full">
            {[...Array(12)].map((_, index) => (
              <li
                key={index}
                className="px-4 py-3 border-b border-gray-100 animate-pulse flex justify-between"
              >
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CategorySkeleton;
