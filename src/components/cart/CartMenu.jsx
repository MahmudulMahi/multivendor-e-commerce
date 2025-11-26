import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/router";
import { notifyError } from "@/utils/toast";
import { handlePurchaseProduct } from "@/utils/productPurchase";
// import LinkButton from "../ui/LinkButton";
const CartMenu = ({ cartProduct = [] }) => {
  const router = useRouter();
  // checkout
  const handleCheckout = () => {
    try {
      if (!cartProduct?.length) {
        return notifyError("No product to order item");
      }
      const result = cartProduct?.map((item) => {
        return handlePurchaseProduct({
          ...item,
          thumbnail: item?.product?.thumbnail,
          id: item?.product_id,
          attribute_id: item?.selected_attribute_id,
          color_id: item?.selected_color_id,
          offer_price: item?.price,
        });
      });
      localStorage.setItem("order_items", JSON.stringify(result));
      router.push("/checkout?bestApplied=true");
    } catch (error) {
      notifyError(error?.message);
    }
  };
  return (
    <div className="bg-white fixed top-0 z-[99999999999] right-0.5 p-8 w-[380px] md:w-[425px] rounded-lg shadow">
      <div className="hover:overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-400 overflow-hidden">
        {cartProduct?.map((product, idx) => (
          <div
            className="flex gap-2 md:gap-4 items-center border-b-2 md:py-3 py-2"
            key={idx}
          >
            <div className="aspect-square w-[73px] h-[73px] flex items-center">
              <Image
                src={`${process?.env.NEXT_PUBLIC_API_SERVER}${product?.product?.thumbnail}`}
                alt="loading"
                width={1000}
                height={1000}
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="flex-shrink-0">
              <h3 className="text-[#0F172A] font-medium text-sm leading-3.5 pb-2 md:pb-3">
                {product?.product?.product_name}
              </h3>
              <div className="flex md:gap-4 gap-2">
                <p className="text-[#6B7280] font-bold text-xs leading-3.5">
                  {product?.vendor?.company_name}
                </p>
                <p className="flex gap-2 font-medium text-xs text-[#AAAAAA]">
                  {product?.color?.name && (
                    <span>Color : {product?.color?.name}</span>
                  )}
                  {product?.attribute?.name && (
                    <span>Size : {product?.attribute?.name}</span>
                  )}
                </p>
              </div>
              <span className="text-primary font-bold md:text-base text-sm leading-3.5">
                BDT {Math.round(product?.price)}/-
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={handleCheckout}
        rounded="rounded-md"
        className="py-2 h-11"
        textSize="text-sm md:text-[15px]"
      >
        Proceed To Checkout
      </Button>
    </div>
  );
};

export default CartMenu;
