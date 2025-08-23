export default function ProductStatusSkeleton() {
  return (
    <div className="shadow-sm space-y-2 md:space-y-3 pb-4 px-2 rounded-md w-full animate-pulse">
      {/* Title */}
      <div className="h-4 w-32 bg-gray-300 rounded mt-4 mb-2"></div> 
      {[1, 2].map((_, idx) => (
        <div key={idx} className="flex items-center gap-2"> 
          <div className="w-5 h-5 bg-gray-300 rounded-md"></div>
 
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}
