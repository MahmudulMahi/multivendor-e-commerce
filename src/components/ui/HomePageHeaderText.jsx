import React from "react";

const HomePageHeaderText = ({ children }) => {
  return (
    <div className="inline-block relative text-[#666666]">
      <div className=" text-base sm:tex-lg md:text-xl lg:text-2xl font-normal leading-8 inline-block relative after:block after:h-[3px] after:bg-primary after:mt-1 lg:after:w-[calc(100%+100px)] md:after:w-[calc(100%+30px)] after:w-[calc(100%+30px)]  ">
        {children}
      </div>
    </div>
  );
};

export default HomePageHeaderText;
