import React from "react";
import OrderDetails from "@/components/order/OrderDetails";
import PageLayout from "@/components/ui/PageLayout";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
const Details = () => {
  return <OrderDetails />;
};
Details.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Details;
