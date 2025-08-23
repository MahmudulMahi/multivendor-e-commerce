import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
const SingleShopCard = ({ shop }) => { 
  return (
    <Link
      href={ROUTES?.SHOP_DETAILS(shop?.id)}
      className="rounded-2xl bg-white    relative shadow-xs "
      aria-label="bajar.net"
    >
      <div className="w-full aspect-[247/187] overflow-hidden rounded-t-2xl">
        <Image
          src={`${process?.env.NEXT_PUBLIC_API_SERVER}${shop?.logo}`}
          width={1000}
          height={1000}
          alt="shop logo"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          priority
        />
      </div>
      <div className="shadow-[0_0_2px_0_rgba(0,0,0,0.25)]  rounded-b-2xl md:px-3 px-2 space-y-2 py-5 sm:py-7 md:py-9">
        <h3
          className="text-[#222222] font-poppins font-semibold text-base leading-5 truncate "
          title={shop?.company_name}
        >
          {shop?.company_name}
        </h3>
        <hr className="border" />
        <p
          className="text-[#4D5860] font-poppins font-normal text-xs truncate"
          title={shop?.shoptype}
        >
          {shop?.shoptype||shop?.company_name}
        </p>

        <p
          className="text-[#4D5860]  font-poppins font-normal text-xs truncate"
          title={shop?.company_location}
        >
          {shop?.company_location}
        </p>
      </div>
    </Link>
  );
};

export default SingleShopCard;
