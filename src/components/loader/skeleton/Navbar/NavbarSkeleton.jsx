import React from "react";

const NavbarSkeleton = () => {
  return (
    <div className="mb-5 animate-pulse fixed top-0 left-0 w-full z-50 bg-white">
      {/* Top nav (welcome + track) */}
      <div className="hidden md:block bg-primary w-full h-8">
        <div className="  h-8 flex items-center justify-between px-4">
          <div className="h-4 w-32 bg-white rounded-md" />
          <div className="h-4 w-40 bg-white rounded-md" />
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white w-full shadow-md h-20 md:h-16">
        <div className="  h-full flex items-center justify-between gap-3 px-4">
          {/* Left: Location icon + text */}
          <div className="flex gap-2 items-center flex-shrink-0">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
          </div>

          {/* Search bar */}
          <div className="w-full relative">
            <div className="h-10 bg-gray-200 rounded-md w-full" />
            <div className="absolute top-0 right-0 h-10 w-10 bg-gray-300 rounded-r-md" />
          </div>

          {/* Right: Profile + Cart */}
          <div className="hidden md:flex items-center gap-4">
            {/* Profile */}
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="h-4 w-20 bg-gray-200 rounded-md" />

            {/* Cart */}
            <div className="relative">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav (optional) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-14 bg-white shadow-md flex items-center justify-around px-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-gray-300 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default NavbarSkeleton;
