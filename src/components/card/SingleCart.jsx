import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { FiShoppingCart } from "@/icons";
import { offerPricePercent } from "@/utils/priceOfferPercent";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/cart/useCart";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { handlePurchaseProduct } from "@/utils/productPurchase";
const SingleCart = ({ product }) => {
  const { addItem } = useCart();
  const handleAdded = () => {
    const newProduct = {
      ...product,
      color_id: product?.colors[0] ? product?.colors[0]?.id : null,
      attribute_id: product?.attributes[0] ? product?.attributes[0]?.id : null,
    };
    addItem(handlePurchaseProduct(newProduct));
  };
  return (
    <Link
      href={ROUTES?.PRODUCT_DETAILS(product?.slug)}
      className="rounded-2xl bg-white   relative shadow-xs "
      aria-label="bajar.net"
    >
      <div className="w-full aspect-[247/187] rounded-t-2xl  overflow-hidden">
        <Image
          src={`${process?.env.NEXT_PUBLIC_API_SERVER}${product?.thumbnail}`}
          width={1000}
          height={1000}
          className="overflow-hidden w-full rounded-t-2xl h-full object-cover  transition-transform duration-300 ease-in-out hover:scale-110"
          alt={product?.product_name}
          priority
        />
      </div>
      <div className="shadow-[0_0_2px_0_rgba(0,0,0,0.25)] rounded-b-2xl md:px-3 px-2 space-y-2 py-2">
        <h3
          className="text-[#222222] font-poppins font-semibold text-base leading-5 line-clamp-1"
          title={product?.product_name}
        >
          {product?.product_name}
        </h3>
        <hr className="border" />
        <p
          className="text-[#4D5860] font-poppins font-normal text-xs truncate"
          title={product?.vendor?.company_name}
        >
          {product?.vendor?.company_name}
        </p>
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-7">
          <h1 className="text-2xl font-poppins font-bold text-primary md:text-lg lg:text-2xl ">
            {formatPrice(product?.offer_price)}
          </h1>
          <span className="line-through font-poppins font-normal text-[#222222] text-base truncate md:text-sm lg:text-base ">
            {formatPrice(product?.reguler_price)}
          </span>
        </div>
        <Button
          className="w-full  !h-8 !text-xs !font-poppins !font-light text-nowrap text-black "
          bgColor=""
          color="text-primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAdded(product);
          }}
        >
          <FiShoppingCart />
          Add To Cart
        </Button>
        <p className="bg-[#AB1C1C]  text-white absolute top-0 right-0 rounded-tr-2xl w-12 h-10 md:h-12 md:w-14 rounded-bl-xl text-sm flex items-center   font-poppins font-semibold text-wrap text-center leading-3.5 md:leading-4 p-1">
          {offerPricePercent(product?.reguler_price, product?.offer_price)}% OFF
        </p>
      </div>
    </Link>
  );
};

export default SingleCart;
