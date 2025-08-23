// components/AddressSkeleton.js
export default function AddressSkeleton() {
  return (
    <div className="bg-white shadow pb-10 px-4 pt-4 rounded border border-[#E5E7EB] relative animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-10 bg-gray-200 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-3 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>

      <div className="flex gap-2 absolute bottom-2 left-0 px-4 w-full">
        <div className="h-8 w-full bg-gray-200 rounded" />
        <div className="h-8 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}
