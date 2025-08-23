import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaCheck } from "@/icons";
import { useCart } from "@/hooks/cart/useCart";
import { notifyError } from "@/utils/toast";
import { useDeleteModal } from "@/context/DeleteModalContext";
import { handlePurchaseProduct } from "@/utils/productPurchase";
import PageLayout from "@/components/ui/PageLayout";
import { FaShoppingCart } from "@/icons";
import CartSkeleton from "@/components/loader/skeleton/AccountSkeleton/CartSkeleton";
import { ROUTES } from "@/constants/route";
const Cart = () => {
  const { openModal } = useDeleteModal();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const {
    items: productItem,
    updateItem,
    removeItem,
    loading: updateLoading,
    productLoading: loading,
  } = useCart();
  // checkout to go next order page
  const handleCheckout = () => {
    try {
      if (!productItem?.length) {
        return notifyError("No product to order item");
      }
      const result = productItem?.map((item) => {
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
  // calculate subtotal and total
  const calculateSubtotal = () => {
    if (!productItem?.length) return;
    const total = productItem.reduce((sum, item) => {
      const price = item?.price ?? item?.product?.offer_price ?? 0;
      return sum + price * item?.quantity;
    }, 0);
    return total;
  };
  // sell price found

  // set selected product default added all
  useEffect(() => {
    setSelectedProduct(productItem);
  }, [productItem]);
  // check product exist or not
  const isChecked = (items) =>
    selectedProduct?.some((item) => item?.id === items?.id);
  // all selected function
  const handleAllSelect = () => {
    if (selectedProduct?.length !== productItem?.length) {
      setSelectedProduct(productItem);
    } else {
      setSelectedProduct([]);
    }
  };
  // single select product added
  const handleAddedProduct = (product) => {
    if (isChecked(product)) {
      setSelectedProduct(
        selectedProduct.filter((item) => item?.id !== product?.id)
      );
    } else {
      setSelectedProduct([...selectedProduct, product]);
    }
  };

  //   if (loading && !productItem?.length) return <CartSkeleton />;
  if (!productItem?.length || loading)
    return (
      <>
        {loading ? (
          <CartSkeleton />
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-4 ">
            <Image
              height={250}
              width={250}
              className="mx-auto "
              src="/empty_cart.png"
              alt="Logo"
            />
            <Link
              className="mt-5 px-6 py-2 bg-primary text-white rounded-lg"
              href={ROUTES?.PRODUCTS}
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </>
    );
  return (
    <PageLayout>
      {productItem?.length && updateLoading && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"></div>
      )}
      <h2 className="text-2xl font-normal mb-4 flex items-center gap-1 bg-gray-200/50 rounded-md px-2 py-1 text-[#030712]">
        <FaShoppingCart /> Cart List
      </h2>
      {/* Select All */}
      <label className="flex items-center gap-2 border rounded px-4 py-3 mb-4">
        <input
          type="checkbox"
          onChange={() => handleAllSelect()}
          checked={selectedProduct?.length === productItem?.length}
          className="form-checkbox h-5 w-5 text-pink-500 hidden "
        />

        <div
          className={`border border-[#E5E7EB] w-5 h-5 p-0.5 flex items-center rounded-sm ${
            selectedProduct?.length === productItem?.length ? "bg-primary" : ""
          }`}
        >
          {selectedProduct?.length === productItem?.length && (
            <FaCheck className="text-white" />
          )}
        </div>
        <span className="text-lg text-black">Select all </span>
      </label>
      <div className="flex flex-col lg:flex-row gap-6 text-[#030712] border-[#E5E7EB]">
        {/* Left Side - Product List */}
        <div className="flex-1 space-y-4">
          {/* Headers - hidden on mobile */}
          <div className="hidden md:grid grid-cols-12 text-gray-700 bg-yellow-50 px-4 py-3 font-semibold text-sm rounded">
            <div className="col-span-6">Product Details</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">QTY</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Product Item */}
          {productItem.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 items-center border border-[#E5E7EB] rounded-lg p-4 gap-y-4 md:gap-0"
            >
              <div className="md:col-span-6 flex items-start gap-4">
                <div
                  onClick={() => handleAddedProduct(item)}
                  className={`border border-[#E5E7EB] w-5 h-5 p-0.5 flex items-center rounded-sm ${
                    isChecked(item) ? "bg-primary" : ""
                  }`}
                >
                  {isChecked(item) && <FaCheck className="text-white" />}
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.product?.thumbnail}`}
                  alt={item?.product?.product_name}
                  className="w-16 h-16 object-cover rounded"
                  width={100}
                  height={100}
                />
                <div>
                  <p className="font-medium">{item?.product?.product_name}</p>
                  <button
                    onClick={() => openModal(() => removeItem(item?.id))}
                    className="text-xs text-red-500 mt-1 cursor-pointer hover:bg-red-200/70 rounded-md p-0.5"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 text-center md:text-left">
                <p className="text-gray-800 font-semibold">
                  ৳ {Math.ceil(item?.price)}{" "}
                </p>
              </div>
              {/* cart item increament decrement system  */}
              <CartItem
                item={item}
                updateItem={updateItem}
                updateLoading={updateLoading}
                removeItem={removeItem}
              />

              <div className="md:col-span-2 text-right font-medium">
                ৳ {item?.price * item?.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="border  border-[#E5E7EB] rounded-lg p-6 bg-white shadow-md">
            <h3 className="text-lg font-semibold mb-4">Order Summary:</h3>

            <div className="flex justify-between text-sm mb-2">
              <span>Product Price:</span>
              <span>৳ {calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Charge:</span>
              <span>Based on E-courier</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total Payment:</span>
              <span>৳ {calculateSubtotal()} </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-2 rounded hover:opacity-90 transition"
              disabled={!selectedProduct?.length}
            >
              Checkout
            </button>

            {/* Payment Methods */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
const CartItem = ({ item, updateItem }) => {
  const handleQty = (type) => {
    if (type === "dec") {
      updateItem({ id: item?.id, action: "decrement" });
    } else if (type === "inc") {
      updateItem({ id: item?.id, action: "increment" });
    }
  };
  return (
    <div className="md:col-span-2 flex justify-center md:justify-start items-center gap-2">
      <button
        onClick={() => handleQty("dec")}
        className="border border-[#E5E7EB] px-2 rounded hover:bg-gray-100"
      >
        −
      </button>
      <span className="w-6 text-center">{item?.quantity}</span>
      <button
        onClick={() => handleQty("inc")}
        className="border  border-[#E5E7EB] px-2 rounded hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};
