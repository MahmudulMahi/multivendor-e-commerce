import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "../ui/Input";
import { FaPlus, FaMinus } from "@/icons";
const ProductCategory = ({ category = [], categoryId, setCategoryId,setPage }) => {
  const handleChange = (item) => {
    setCategoryId((prev) => {
      if (categoryId.includes(item?.category_id)) {
        const filter = categoryId.filter((items) => items != item?.category_id);
        return filter;
      } else {
        return [...prev, item?.category_id];
      }
     
    });
     setPage(1)
  };
  return (
    <div className="shadow-sm space-y-2 md:space-y-3  pb-4 px-2 rounded-md   overflow-hidden   w-full">
      <h1 className="font-semibold text-sm text-[#030712] py-4">
       Product Categories
      </h1>
      <div> 
        {/* category render component  */}
        {category.map((item) => (
          <RecursiveCategory
            category={item}
            handleChange={handleChange}
            categoryId={categoryId}
            key={item?.category_id}
          />
        ))}
      </div>
    </div>
  );
}; 
export default ProductCategory;
const RecursiveCategory = ({ category, categoryId, handleChange }) => {
  const [open, setOpen] = useState(false); 
  return (
    <div className="pl-1 space-y-2">
      <div className="flex justify-between items-center space-y-2 md:space-y-3  ">
        <Checkbox
          checked={categoryId?.includes(category.category_id)}
          onChange={() => handleChange(category)}
          label={category.category_name}
        />

        {category.children?.length > 0 ? (
          <button onClick={() => setOpen(!open)} className="text-black text-xs">
            {open ? <FaMinus /> : <FaPlus />}
          </button>
        ) : (
          <div className="w-4" />  
        )}
      </div>

      {open && category.children?.length > 0 && (
        <div className="pl-2 border-l border-gray-300 ml-2">
          {category.children.map((child) => (
            <RecursiveCategory
              key={child.category_id}
              category={child}
              categoryId={categoryId}
              handleChange={handleChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
