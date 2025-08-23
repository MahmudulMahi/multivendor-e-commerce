import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "../ui/Input";
import { FaPlus, FaMinus } from "@/icons";
const ProductBrands = ({ brand = [], brandId, setBrandId,setPage }) => {
  const handleChange = (item) => {
    setBrandId((prev) => {
      if (brandId.includes(item?.id)) {
        const filter = brandId.filter((items) => items != item?.id);
        return filter;
      } else {
        return [...prev, item?.id];
      }
    });
    setPage(1)
  };
  return (
    <div className="shadow-sm space-y-2 md:space-y-3  pb-4 px-2 rounded-md   overflow-hidden   w-full">
      <h1 className="font-semibold text-sm text-[#030712] py-4">
        Filter by Brands
      </h1>
      <div>
        {/* brand render component  */}
        {brand.map((brand, idx) => (
          <div className="  space-y-2">
            <div className="flex justify-between items-center space-y-2 md:space-y-3  ">
              <Checkbox
                checked={brandId?.includes(brand.id)}
                onChange={() => handleChange(brand)}
                label={brand?.name}
                key={idx}
              />
              <span className="text-black text-xs">{"(1)"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBrands;
