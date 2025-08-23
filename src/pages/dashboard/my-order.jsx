import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Order from "@/components/order/Order";

const MyOrder = () => {
  const tabs = [
    "",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const router = useRouter();
  const { tab } = router.query;
  const [activeTab, setActiveTab] = useState("All");
  // Set tab from query on mount
  useEffect(() => {
    if (tab && tabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [tab]);

  // Update URL query on tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: tabName },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <>
      <div className="bg-[#f3f4f6] min-h-screen p-5 rounded-2xl text-[#030712] border-[#E5E7EB]">
        <div className="border-b text-[#030712] border-[#E5E7EB] mb-4">
          <h2 className="text-xl font-semibold   mb-2">My Orders</h2>
          <ul className="flex space-x-4 text-sm font-medium  ">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-2 cursor-pointer capitalize ${
                  activeTab === tab
                    ? "border-b-2   text-[#030712] border-[#E5E7EB]  "
                    : "hover:text-blue-600"
                }`}
              >
                {tab == "" ? "All" : tab}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow p-5 rounded border border-[#E5E7EB]">
          <h3 className="text-lg font-medium mb-4"> Orders</h3>
          <Order queryParams={router?.query?.tab} />
        </div>
      </div>
    </>
  );
};
MyOrder.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default MyOrder;
