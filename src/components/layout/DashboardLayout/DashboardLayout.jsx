import React, { useState } from "react";
import AccountSidebar from "./ProfileSidebar";
import PageLayout from "@/components/ui/PageLayout";
import Drawer from "react-modern-drawer";
import { RxHamburgerMenu } from "@/icons";
const DashboardLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  return (
    <PageLayout>
      <div className="bg-gray-50 text-center text-lg font-normal text-[#030712] rounded-md shadow-md mb-3 md:hidden overflow-hidden">
        <div className="flex items-center h-10 overflow-hidden relative">
          <button
            onClick={toggleDrawer}
            className="h-full rounded-l-md px-3 flex items-center justify-center shadow hover:bg-primary/20 z-10 relative bg-white"
          >
            <RxHamburgerMenu className="text-black text-xl" />
          </button>

          <div className="whitespace-nowrap animate-marquee text-gray-800 font-medium text-[15px] ml-2">
            <span className="inline-block px-4">
              🛍️ Bajar Net is the best online shopping platform in Sylhet 🛍️
              Bajar Net is the best online shopping platform in Sylhet
            </span>
          </div>
        </div>
      </div>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="left"
        className="w-[80%] max-w-[300px] p-4"
      >
        <AccountSidebar />
      </Drawer>
      <section className="flex gap-2 lg:gap-3  ">
        {" "}
        <div className="hidden md:block shrink-0 h-full">
          <AccountSidebar />
        </div>
        <div className="w-full h-[calc(100vh-200px)] md:h-[calc(100vh-98px)] overflow-y-scroll hide-scrollbar ">
          {children}
        </div>
      </section>
    </PageLayout>
  );
};

export default DashboardLayout;
