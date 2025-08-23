const  OrderSkeleton=() =>{
  return (
    <div className="bg-white rounded-md border p-4 shadow-sm mt-2 animate-pulse text-gray-200">
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-6 w-20 bg-blue-100 rounded-full"></div>
      </div>

      <div className="flex justify-between items-start space-x-4 border-t pt-4">
        <div className="flex gap-1">
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
          <div className="flex flex-col space-y-2 flex-1">
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
export default OrderSkeleton