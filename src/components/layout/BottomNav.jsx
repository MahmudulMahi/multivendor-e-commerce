import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { bottomNavLink } from "@/constants/bottomNav";
import useCategories from "@/hooks/api/Category/useCategory";
import Drawer from "react-modern-drawer";
import { IoArrowBack, IoIosArrowDown, IoIosArrowForward } from "@/icons";
import Image from "next/image";
import { ROUTES } from "@/constants/route";
const BottomNav = ({ items }) => {
  const { pathname } = useRouter();
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const { data: category } = useCategories();
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setItemWidth(width / bottomNavLink.length); // dynamically calculate each icon's width
    }
  }, [containerRef.current?.offsetWidth]);
  // ACTIVE LOGIC CODE HERE
  useEffect(() => {
    const idx = bottomNavLink.findIndex((route) => route?.href === pathname);
    setActiveIndex(idx);
  }, [pathname]);
  const handleOpenDrawer = () => {
    setOpen(!open);
    setActiveIndex(1);
    if (open) {
      const idx = bottomNavLink.findIndex((route) => route?.href === pathname);
      setActiveIndex(idx);
    }
  }; 
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[70px] bg-white z-50 flex items-center justify-center"
      style={{
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)", // ⬆️ Top Shadow
      }}
    >
      <div className="relative flex w-full h-full" ref={containerRef}>
        {/* Indicator */}
        <div
          className="absolute top-[0px] left-1  w-[60px] h-[50px] transition-transform duration-300 pointer-events-none  bg-transparent"
          style={{
            transform: `translateX(${
              activeIndex * itemWidth + itemWidth / 2 - 35
            }px)`,
          }}
        >
          <div className="relative w-full h-full bg-white rounded-b-full border-4 border-gray-100">
            <span className="absolute left-[1px] top-[-5px] w-[50px] h-[50px]    rounded-full  scale-90"></span>
          </div>
        </div>
        {bottomNavLink.map((item, index) => (
          <div
            key={index}
            className="flex-1 h-full flex items-center justify-center z-10"
          >
            {item?.label == "category" ? (
              <button
                onClick={handleOpenDrawer}
                className={`text-2xl transition-all duration-300 flex flex-col items-center  cursor-pointer ${
                  activeIndex === index
                    ? "text-primary -translate-y-[12px] -translate-x-[1px]"
                    : "text-gray-600  "
                }`}
              >
                {item.icon}
                {activeIndex !== index ? (
                  <span className="text-xs sm:text-sm">{item?.label}</span>
                ) : (
                  ""
                )}
              </button>
            ) : (
              <Link
                href={item?.href}
                 aria-label="bajar.net"
                className={`  text-2xl transition-all duration-300 flex flex-col items-center  cursor-pointer ${
                  activeIndex === index
                    ? "text-primary -translate-y-[12px] -translate-x-[1px]"
                    : "text-gray-600  "
                }`}
              >
                <span className="relative">
                  {item.icon}
                  {item?.label === "cart" && items?.length>0 && (
                    <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center bg-primary text-white text-xs font-bold px-1.5 aspect-square rounded-full">
                      {items?.length}
                    </span>
                  )}
                </span>
                {activeIndex !== index ? (
                  <span className="text-xs sm:text-sm line-clamp-1">
                    {item?.label}
                  </span>
                ) : (
                  ""
                )}
              </Link>
            )}
          </div>
        ))}
      </div>
      <Drawer
        open={open}
        onClose={handleOpenDrawer}
        direction="left"
        style={{
          width: "100%",
        }}
        className=" !w-[300px] sm:!w-[450px]"
      >
        <div className="">
          <div className="flex items-center gap-2 px-2 py-4  rounded shadow-sm ">
            <button
              onClick={handleOpenDrawer}
              className="flex items-center text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <IoArrowBack className="text-xl mr-1" />
              <span>Categories</span>
            </button>
          </div>
          <div className="max-w-2xl mx-auto p-4 max-h-[calc(100vh-100px)] h-full  overflow-y-auto ">
            {category.map((item) => (
              <RecursiveCategory category={item} key={item?.category_id} />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default BottomNav;
const RecursiveCategory = ({ category }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-1 py-1 space-y-2 text-gray-500 border my-1  rounded-md border-gray-400">
      <div className="flex justify-between items-center    ">
        <Link
          href={ROUTES?.CATEGORY_DETAILS(category?.category_id)}
           aria-label="bajar.net"
          className="flex  items-center gap-2   w-full  "
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${category?.category_image}`}
            alt={category?.category_name}
            className="w-8 h-8 object-cover rounded"
            width={100}
            height={100}
          />
          <span>{category?.category_name}</span>
        </Link>
        {category.children?.length > 0 ? (
          <button
            onClick={() => setOpen(!open)}
            className="  text-xl hover:bg-primary/5 h-full p-2"
          >
            {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
        ) : (
          <div className="w-4" />
        )}
      </div>
      {open && category.children?.length > 0 && (
        <div className="p-1    border-gray-300 ml-1  ">
          {category.children.map((child) => (
            <RecursiveCategory key={child.category_id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
};
