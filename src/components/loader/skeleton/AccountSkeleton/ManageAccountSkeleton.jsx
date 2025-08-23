import React from "react";

export default function ManageAccountSkeleton() {
  return (
    <div className="max-w-7xl mx-auto text-gray-300 animate-pulse">
      {/* Drawer Placeholder (not visible during loading) */}
      {/* Heading */}
      <div className="h-6 w-60 bg-gray-200 rounded mb-6"></div>

      {/* Profile & Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Personal Profile */}
        <div className="bg-white shadow p-5 rounded border">
          <div className="h-4 w-40 bg-gray-200 mb-4 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 mb-2 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 mb-3 rounded"></div>
          <div className="h-5 w-16 bg-blue-100 rounded-full"></div>
        </div>

        {/* Address Book */}
        <div className="bg-white shadow p-5 rounded border col-span-1 md:col-span-2">
          <div className="h-4 w-48 bg-gray-200 mb-4 rounded"></div>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {[1, 2].map((_, idx) => (
              <div key={idx} className="space-y-2 w-full">
                <div className="h-3 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-64 bg-gray-200 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow p-5 rounded border">
        <div className="h-4 w-40 bg-gray-200 mb-4 rounded"></div>

        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm border-t">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-3 font-semibold">Order #</th>
                <th className="p-3 font-semibold">Placed On</th>
                <th className="p-3 font-semibold">Items</th>
                <th className="p-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {[...Array(2)].map((__, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="w-8 h-8 bg-gray-200 rounded"
                        ></div>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
