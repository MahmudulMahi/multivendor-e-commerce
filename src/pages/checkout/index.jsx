import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaHome, CiEdit, MdLocationOff, IoArrowBack, FaSpinner } from "@/icons";
import { privateRequest } from "@/lib/axios";
import { responseHandler } from "@/utils/helpers";
import { notifySuccess } from "@/utils/toast";
import { useCart } from "@/hooks/cart/useCart";
import CreateAddress from "@/components/address/CreateAddress";
import useAddress from "@/hooks/api/address/useAddress";
import DefaultAddress from "@/components/address/DefaultAddress";
import EditAddress from "@/components/address/EditAddress";
import PageLayout from "@/components/ui/PageLayout";
import CheckoutPageSkeleton from "@/components/loader/skeleton/AccountSkeleton/CheckoutSkeleton";

const Checkout = () => {
  const { clear: cartClear, items } = useCart();
  const router = useRouter();
 
  const [orderItems, setOrderItems] = useState([]);
  const [orderAttribute, setOrderAttribute] = useState({
    subtotal: 0,
    orderItems: 0,
  });
  const [orderLoadinBtn, setOrderLoadingBtn] = useState(false);
  const { data: addressData, loading, refetch } = useAddress();
  const defaultAddress = addressData?.find(
    (item) => item?.default_address == 1
  );
  //   setup for order item in state
  useEffect(() => { 
    const result = JSON?.parse(localStorage?.getItem("order_items"))||[];
     if(!result?.length) router?.push("/");
    const subtotal = result?.reduce((acc, cur) => {
      return acc + (cur?.price || 0) * (cur?.quantity || 0);
    }, 0);
    setOrderAttribute({
      ...orderAttribute,
      subtotal,
      orderItems: result?.length,
    });
    setOrderItems(result);
  }, []);
  const deliveryAmount = () => {
    return 120;
  };
  //   order create successfully
  const handleOrder = async () => {
    setOrderLoadingBtn(true);
    try {
      const response = await privateRequest.post("/user/order", {
        items: orderItems,
        payment_method: "cod",
        shipping_address: defaultAddress?.id,
      });
      if (responseHandler(response)) {
        notifySuccess(response?.data?.message);
        cartClear();
        localStorage.removeItem("order_items");
        router?.push(`/payment-options/${response?.data?.data?.id}`);
        setOrderLoadingBtn(false);
      }
    } catch (error) {
      setOrderLoadingBtn(false);
    }
  };
  // drawer code
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openType, setOpenType] = useState("");
  const handleOpenDrawer = () => {
    setOpenType("default");
    setOpenDrawer(!openDrawer);
  };
  return (
    <PageLayout>
      {loading ? (
        <CheckoutPageSkeleton />
      ) : (
        <div className="grid md:grid-cols-3 gap-6 text-[#030712] border-[#E5E7EB]">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white p-5 rounded shadow">
              {/* <h2 className="text-lg font-semibold mb-4">Shipping Information</h2> */}
              {/* drawer design  */}
              <Drawer
                open={openDrawer}
                onClose={handleOpenDrawer}
                direction="right"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                }}
                className="w-full sm:w-[450px]"
              >
                <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-sm h-full max-h-screen overflow-y-auto ">
                  <div className="flex items-center gap-2 pb-2  ">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className="flex items-center text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                      <IoArrowBack className="text-xl mr-1" />
                      <span>Back to Checkout</span>
                    </button>
                  </div>
                  {openType === "create" && (
                    <CreateAddress
                      refetch={refetch}
                      setOpenDrawer={setOpenDrawer}
                    />
                  )}
                  {openType === "edit" && (
                    <EditAddress
                      refetch={refetch}
                      setOpenDrawer={setOpenDrawer}
                      addressId={defaultAddress?.id}
                    />
                  )}

                  {openType === "default" && (
                    <DefaultAddress
                      setOpenDrawer={setOpenDrawer}
                      setOpenType={setOpenType}
                      addressData={addressData}
                      refetch={refetch}
                    />
                  )}
                </div>
              </Drawer>
              {/* shipping information show  */}
              {addressData?.length > 0 ? (
                <div className="border border-[#E5E7EB] p-4 rounded text-sm space-y-1 ">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">
                        {defaultAddress?.name}
                      </span>
                      <span className="bg-blue-200/50 rounded-md ml-1 px-1">
                        Default address
                      </span>
                    </div>
                    <button
                      className="border border-[#E5E7EB] rounded-md px-1 py-0.5 font-normal cursor-pointer  bg-blue-200/50 text-nowrap flex gap-1 flex-nowrap items-center justify-center"
                      onClick={handleOpenDrawer}
                    >
                      <FaHome className="text-blue-600" /> address
                    </button>
                  </div>
                  <div>
                    <p>{defaultAddress?.address_line1}</p>
                    <p>
                      {defaultAddress?.division?.name} -{" "}
                      {defaultAddress?.city?.name} -{" "}
                      {defaultAddress?.area?.name}
                    </p>
                  </div>

                  <button
                    className="border  border-[#E5E7EB] rounded-md px-1 py-0.5 font-normal cursor-pointer bg-gray-100 text-nowrap flex gap-1 flex-nowrap item-center justify-center"
                    onClick={() => {
                      setOpenType("edit");
                      setOpenDrawer(true);
                    }}
                  >
                    <CiEdit /> edit address
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center   px-4  w-full">
                  <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                    <MdLocationOff className="text-red-500 text-6xl mx-auto mb-4" />
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                      Address Not Found
                    </h1>
                    <p className="text-gray-600">
                      No address is currently saved. Please add an address to
                      continue.
                    </p>
                    <button
                      onClick={() => {
                        setOpenType("create");
                        setOpenDrawer(true);
                      }}
                      className="text-white hover:underline text-sm bg-blue-500/80 px-3 py-2 rounded-md mt-1 hover:bg-blue-500/50 "
                    >
                      Add new address
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* here show product details  */}
            <div>
              <h1 className="text-black border-b-2 border-[#E5E7EB] shadow-sm font-semibold px-4 pb-2 text-lg">
                Order Summary - {orderAttribute?.orderItems} items
              </h1>
              <div className="flex-1 space-y-4 mt-2">
                {/* Headers - hidden on mobile */}
                <div className="grid grid-cols-12 overflow-x-auto gap-2 bg-gray-200 px-2 py-2 rounded-lg">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">QTY</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                {/* product show  */}
                {orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 overflow-x-auto gap-2"
                  >
                    <div className=" col-span-6 flex items-start gap-4">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.thumbnail}`}
                        alt={item?.product_name}
                        className="w-16 h-16 object-cover rounded"
                        width={100}
                        height={100}
                      />
                      <div>
                        {" "}
                        <p
                          className="font-medium line-clamp-2"
                          title={item?.product?.product_name}
                        >
                          {item?.product?.product_name}
                        </p>
                        <span className="font-medium line-clamp-3">
                          {item?.category?.category_name}
                        </span>
                      </div>
                    </div>

                    <div className=" col-span-2 text-center ">
                      <p className="text-gray-800 font-semibold text-nowrap">
                        ৳ {Math.ceil(item?.offer_price)}{" "}
                      </p>
                    </div>
                    <p className="text-nowrap  col-span-2 text-center">
                      {item?.quantity}
                    </p>
                    <div className=" col-span-2 text-right font-medium text-nowrap">
                      ৳ {Math.ceil(item?.offer_price) * item?.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="bg-white p-5 rounded   space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="border-t  border-[#E5E7EB] pt-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal {orderAttribute?.orderItems} items </span>
                <span className="text-nowrap">
                  ৳ {orderAttribute?.subtotal}
                </span>
              </div>
              <div className="flex justify-between ">
                <span>Shipping </span>
                <span className="text-nowrap">৳ {deliveryAmount()}</span>
              </div>
            </div>
            <div className="border-t border-[#E5E7EB] pt-4 text-base font-semibold flex justify-between">
              <span>Total</span>
              <span className="text-blue-600 text-nowrap">
                ৳ {deliveryAmount() + orderAttribute?.subtotal}
              </span>
            </div>
            <button
              className="  w-full bg-gradient-to-r from-primary to-primary/50 text-white font-semibold h-9 rounded hover:opacity-90 transition cursor-pointer flex justify-center items-center"
              onClick={handleOrder}
              disabled={orderLoadinBtn}
            >
              {orderLoadinBtn ? (
                <FaSpinner className="animate-spin " />
              ) : (
                "place order "
              )}
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Checkout;
