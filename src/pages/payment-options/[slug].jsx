import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { paymentOption } from "@/constants/paymentOptions";
import { privateRequest } from "@/lib/axios";
import { responseHandler } from "@/utils/helpers";
import PageLayout from "@/components/ui/PageLayout";

const PaymentOption = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await privateRequest.get(
          `/user/order/${router?.query?.slug}`
        );
        if (responseHandler(response)) {
          setOrder(response?.data?.data);
        }
      } catch (error) {}
    };
    fetchOrder();
  }, [router?.query?.slug]);
  const handleCancelOrder = async () => {
    try {
      const response = await privateRequest.get(
        `/user/order/cancel/${router?.query?.slug}`
      );
      router.push("/dashboard/my-order");
    } catch (error) {}
  };
  return (
    <PageLayout>
      {" "}
      <div className="min-h-screen bg-white ">
        <h2 className="text-xl font-bold text-red-600 mb-1">CHECK OUT</h2>
        <p className="text-sm text-gray-600 mb-6">
          Order Number:{" "}
          <span className="font-semibold"># {router?.query?.slug}</span>
        </p>
        {/* Payment Methods */}
        <div className="flex gap-1">
          {paymentOption.map((method, idx) => (
            <div key={idx} className="aspect-square">
              <Image
                src={method.src}
                alt={method.name}
                width={100}
                height={100}
              />
              {/* <p className="text-xs font-medium">{method.name}</p> */}
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => handleCancelOrder()}
          className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 transition"
        >
          CANCEL ORDER
        </button>
        {/* Order Summary Card */}
        <div className="mt-10 lg:absolute right-10 top-20 border rounded-lg shadow-md p-6 w-full lg:w-80">
          <h3 className="text-md font-semibold mb-4 text-gray-700">
            Total Summary
          </h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({order?.items?.length} items)</span>
            <span>{Math.ceil(order?.subtotal)} Tk</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Delivery Charge</span>
            <span>{Math.ceil(order?.shipping_cost)} Tk</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total:</span>
            <span className="text-red-600">
              {Math.ceil(order?.total_amount)} Tk
            </span>
          </div>
          <button className="mt-4 bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded transition">
            PAY NOW
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentOption;
