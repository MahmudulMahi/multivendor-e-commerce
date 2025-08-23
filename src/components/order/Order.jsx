import React, { useState } from "react";
import Pagination from "../ui/Pagination";
import useOrder from "@/hooks/api/order/useOrder"; 
import { formatDate } from "@/utils/utils";
import OrderSkeleton from "../loader/skeleton/AccountSkeleton/OrderSkeleton";
import { ROUTES } from "@/constants/route";
import Link from "next/link";
import { RiEyeLine } from "react-icons/ri";
import { CiCircleChevDown } from "react-icons/ci";
import { TbCurrencyTaka } from "react-icons/tb";

const Order = ({ queryParams }) => {
  const [page, setPage] = useState(1);
  const { data: order, loading } = useOrder({
    per_page: 12,
    page: page,
    order_status: queryParams,
  });
  console.log(order,"---------->",queryParams);
  const [openOrderId, setOpenOrderId] = useState(null);
  if (loading) return <OrderSkeleton />;

  return (
    <div className="overflow-x-auto">
      {order?.data?.map((orderItem, idx) => (
        <OrderRow
          key={idx}
          order={orderItem}
          setOpenOrderId={setOpenOrderId}
          openOrderId={openOrderId}
        />
      ))}
     { order?.length!==0&& <Pagination totalPage={order?.last_page} page={page} setPage={setPage} />}
    </div>
  );
};

export default Order;

const OrderRow = ({ order, openOrderId, setOpenOrderId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subOrder, setSubOrder] = useState([]);

  const handleOrderDetailsShow = (data) => {
    const result = [];
    data?.sub_orders?.forEach((vendor) => {
      vendor?.items?.forEach((item) => {
        result.push({
          product_images: item?.product?.product_image,
          product_name: item?.product?.product_name,
          ...vendor,
          ...item,
        });
      });
    });
    setSubOrder(result);
    if (openOrderId === order.id) {
      setOpenOrderId(null); // close if already open
    } else {
      setOpenOrderId(order.id); // open this and close others
    }
  };
  console.log(openOrderId);
  return (
    <div
      onClick={() => handleOrderDetailsShow(order)}
      className="w-full min-w-[500px] flex flex-col border-b border-gray-400 py-4 gap-2 cursor-pointer"
    >
      <div className="flex justify-between w-full flex-wrap">
        {/* Order Info */}
        <div className="w-full sm:w-1/4 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Order ID:</span>{" "}
            <span className="text-blue-600 font-bold">#{order?.id}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Name:</span> {order?.address?.name}
          </p>
        </div>

        {/* Price */}
        <div className="w-full sm:w-1/4">
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-lg font-bold text-primary flex items-center">
            {Math.ceil(order?.total_amount)} <TbCurrencyTaka />
          </p>
        </div>

        {/* Quantity */}
        <div className="w-full sm:w-1/4 flex gap-2">
          <p className="text-sm text-gray-500">Qty:</p>
          <p className="text-lg font-bold text-primary">
            {order?.sub_orders?.length}
          </p>
        </div>

        {/* Actions */}
        <div className="w-full sm:w-1/4 flex justify-end items-center gap-2">
          <button
            onClick={() => handleOrderDetailsShow(order)}
            className="p-2 bg-primary text-white hover:bg-gray-100 hover:text-primary rounded-md transition"
            title="Toggle Items"
          >
            <CiCircleChevDown
              className={`text-xl transition-transform ${
                openOrderId === order.id ? "rotate-180" : ""
              }`}
            />
          </button>
          <Link
            href={ROUTES.ORDER_DETAILS(order?.id)}
            className="p-2 bg-blue-500 text-white hover:bg-gray-100 hover:text-blue-600 rounded-md transition"
            title="View Details"
          >
            <RiEyeLine className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Collapse Section */}
      {openOrderId === order.id && <OrderTable flatData={subOrder} />}
    </div>
  );
};

const OrderTable = ({ flatData }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] sm:min-w-[550px]">
        <table className="w-full text-left text-sm border-t border-[#E5E7EB]">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-gray-100">
              <th className="p-3 font-semibold">Product Name</th>
              <th className="p-3 font-semibold">Placed On</th>
              <th className="p-3 font-semibold">Items</th>
              <th className="p-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {flatData.map((item, idx) => (
              <tr
                className="border-b border-[#E5E7EB] hover:bg-gray-50"
                key={idx}
              >
                <td className="p-3">{item?.product_name}</td>
                <td className="p-3">{formatDate(item?.created_at)}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    {item?.product_images?.map((img, i) => (
                      <img
                        key={i}
                        src={`${process.env.NEXT_PUBLIC_API_SERVER}${img}`}
                        alt="item"
                        className="w-8 h-8 object-cover rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="p-3">৳ {item?.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
