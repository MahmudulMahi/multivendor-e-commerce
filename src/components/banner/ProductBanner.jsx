import Image from "next/image";
import React from "react";

const ProductBanner = ({
  title = "Nearby Groceries Products <br/>Tailored for you",
  subTitle = "",
  img = "",
}) => {
  return (
    <div className="w-full flex justify-between gap-4 md:gap-6 lg:gap-8 items-center max-h-72 overflow-hidden">
      <div className="w-1/2 space-y-1">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[30px]  text-[#111827]">
          {title}
        </h1>
        <p className="font-normal text-[13px] md:text-sm lg:text-base text-[#6B7280]">
          {subTitle}
        </p>
      </div>
      <div className="relative w-1/2 aspect-[247/117]  overflow-hidden  ">
        {/* Image */}
        <Image
          src={img}
          alt="loading"
          fill
          className=" w-full object-cover [clip-path:polygon(40px_0,100%_0,100%_100%,0%_100%)] rounded-tr-md rounded-br-md"
        />
      </div>
    </div>
  );
};

export default ProductBanner;
