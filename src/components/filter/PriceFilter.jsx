import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
const PriceFilter = ({ min = 0, max = 1000, setPrice, price ,setPage}) => {
  const [value, setValue] = useState([min, max]);
  const handleSliderChange = (val) => {
    setValue(val);
  };

  // When user types manually in inputs
  const handleInputChange = (index, val) => {
    let newVal = [...value];
    let numVal = Number(val);
    if (isNaN(numVal)) return;
    if (numVal < min) numVal = min;
    if (numVal > max) numVal = max;
    if (index === 0 && numVal > newVal[1]) numVal = newVal[1];
    if (index === 1 && numVal < newVal[0]) numVal = newVal[0];
    newVal[index] = numVal;
    setValue(newVal);
  };
  useEffect(() => {
    if (price?.minPrice !== undefined && price?.maxPrice !== undefined) {
      setValue([price.minPrice, price.maxPrice]);
    }
  }, [price]); 
  return (
    <div className="shadow-sm space-y-6 md:space-y-10 pb-4 px-2 rounded-md  overflow-hidden   w-full">
      <h1 className="font-semibold text-sm text-[#030712]">Price Filter</h1>
      <div className="space-y-5">
        {/* price input field  */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1 w-1/2">
            <span className="text-[#6B7280] font-normal text-xs ">
              Min Price
            </span>
            <input
              className="rounded-lg border border-[#D1D5DB] py-3 px-2 outline-none text-[#020617] text-sm shadow-sm backdrop-blur-sm w-full"
              value={value[0] || min}
              min={min}
              max={value[1]}
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
          </div>
          <span className="text-[#030712] pt-4 block ">-</span>
          <div className="flex flex-col gap-1 w-1/2">
            <span className="text-[#6B7280] font-normal text-xs">
              Max Price
            </span>
            <input
              className="rounded-lg border border-[#D1D5DB] py-3 px-2 outline-none text-[#020617] text-sm shadow-sm backdrop-blur-sm w-full"
              value={value[1] || max}
              min={value[0]}
              max={max}
              onChange={(e) => handleInputChange(1, e.target.value)}
            />
          </div>
        </div>
        {/* range slider  */}
        <div>
          <RangeSlider
            className="custom-slider"
            id="custom-slider-color"
            min={min}
            max={max}
            value={[value[0] || min, value[1] || max]}
            pearling
            minDistance={1}
            onInput={handleSliderChange}
            onThumbDragEnd={(val) => {
              setPrice({
                minPrice: value[0] || min,
                maxPrice: value[1] || max,
              });
              setPage(1)
            }}
          />
        </div>
        {/* filter button  */}
        <div className="flex justify-between items-center gap-1">
          <span className="font-normal text-sm text-[#030712]">
            Price: ৳ {value[0] || min} — ৳ {value[1] || max}
          </span> 
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
