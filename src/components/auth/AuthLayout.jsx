import Image from "next/image";
import React from "react";

const AuthLayout = ({
  children,
  onsubmit,
  icon = false,
  text = "Welcome to Baajar",
  footer = "",
  link = "",
}) => {
  return (
    <div className="">
      <div className="text-center font-semibold text-2xl text-[#0F172A] pt-8">
        {text}
      </div>
      <div className="my-4 md:my-8 flex justify-center ">
        <form
          onSubmit={onsubmit}
          className="bg-primary space-y-3 py-6 md:py-16 px-14  lg:px-20 rounded-md w-full sm:w-[556px] flex   flex-col relative  "
        >
          
          {icon && (
            <div className="flex justify-center items-center  lg:pb-9 ">
              <Image
                alt="Authentication Icon"
                src="/icons/auth.svg"
                width={100}
                height={100}
                className="w-[110px] h-[110px]"
              />
            </div>
          )}
          {children}
          { footer||link ? <div className="flex flex-col items-center justify-center mt-4 ">
            {footer && (
              <p className="text-white font-semibold text-sm md:text-[15px] mb-2 ">
                {footer}
              </p>
            )}
            {link && link}
          </div>:""}
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;
