import React, { useState } from "react";
import { Checkbox } from "../ui/Input";
import { productStatus } from "@/constants/ProductStatus";

const ProductStatus = ({ checked, setChecked,setPage }) => {
  const handleChange = (item) => {
    setChecked((prev) => {
      if (checked?.includes(item)) {
        const filter = checked.filter((items) => items != item);
        return filter;
      } else {
        return [...prev, item];
      }
    });
    setPage(1)
  };
  return (
    <div className="shadow-sm space-y-2 md:space-y-3  pb-4 px-2 rounded-md   overflow-hidden   w-full">
      <h1 className="font-semibold text-sm text-[#030712] py-4">
        Product Status
      </h1>
      {productStatus.map((item) => (
        <Checkbox
          checked={checked?.includes(item)}
          onChange={() => handleChange(item)}
          label={item}
          key={item}
        />
      ))}
    </div>
  );
};

export default ProductStatus;
