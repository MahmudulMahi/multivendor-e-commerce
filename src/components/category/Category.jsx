import React, { useEffect, useRef, useState } from "react";
import { RxDashboard, IoIosArrowDown, IoIosArrowForward } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import useCategories from "@/hooks/api/Category/useCategory";
import CategorySkeleton from "../loader/skeleton/Home/CategorySkeleton";
import { ROUTES } from "@/constants/route";
const Category = () => {
  const [open, setOpen] = useState(true);
  const { data: categoryList, loading, error } = useCategories();
  if (loading) return <CategorySkeleton />;
  return (
    <div className=" w-full">
      <button
        className="w-full px-4 py-3 text-base font-semibold text-[#030712]  rounded-t-lg  border  border-[#E5E7EB] border-b-0 cursor-pointer flex  items-center justify-between gap-2"
        onClick={() => setOpen(!open)}
      >
        <p className="flex items-center gap-2">
          <span>
            <RxDashboard />
          </span>
          <span>All Categories</span>
        </p>
        <IoIosArrowDown />
      </button>
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          open ? "h-[545px]" : "h-0 overflow-hidden"
        }`}
      >
        <nav className="flex justify-center items-center w-full">
          <ul className="flex flex-col list-none relative bg-white  max-h-[545px]  border rounded-b-lg border-t-0 border-[#E5E7EB] w-full  ">
            {categoryList.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems
                  category={menu}
                  key={index}
                  depthLevel={depthLevel}
                />
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Category;
const MenuItems = ({ category, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    if (window.innerWidth > 960) setDropdown(true);
  };
  const onMouseLeave = () => {
    if (window.innerWidth > 960) setDropdown(false);
  };
  return (
    <li
      className="text-[#030712] bg-white font-medium text-sm leading-5 border-t border-t-[#E5E7EB] py-3"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {category?.children?.length >= 1 ? (
        <>
          <Link
            href={ROUTES?.CATEGORY_DETAILS(category?.category_id)}
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            aria-label="bajar.net"
            className="w-full flex justify-between items-center px-4   cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2">
              {category?.category_image ? (
                <div className="aspect-square">
                  <Image
                    src={`${process?.env.NEXT_PUBLIC_API_SERVER}${category?.category_image}`}
                    width={1000}
                    height={1000}
                    className="w-3 h-3"
                    alt="loading..."
                  />
                </div>
              ) : (
                <RxDashboard />
              )}

              <span> {category?.category_name}</span>
            </div>
            <IoIosArrowForward />
          </Link>
          <Dropdown
            childrens={category.children}
            dropdown={dropdown}
            depthLevel={depthLevel}
          />
        </>
      ) : (
        <Link
          href={ROUTES?.CATEGORY_DETAILS(category?.category_id)}
          aria-label="bajar.net"
          className="  w-full flex justify-between items-center px-4  cursor-pointer focus:outline-none "
        >
          <p className="flex items-center gap-2">
            {category?.category_image ? (
              <Image
                src={`${process?.env.NEXT_PUBLIC_API_SERVER}${category?.category_image}`}
                width={1000}
                height={1000}
                className="w-3 h-3"
                alt="loading..."
              />
            ) : (
              <RxDashboard />
            )}

            <span>{category?.category_name}</span>
          </p>
        </Link>
      )}
    </li>
  );
};

const Dropdown = ({ childrens, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  // সাবমেনু যদি nested হয়, তাহলে parent এর ডানপাশে দেখাব
  const childrenPosition = "left-full top-0 h-full bg-white";
  return (
    <ul
      className={`absolute z-50 min-w-[10rem]  shadow-md rounded  ${
        dropdown ? "block" : "hidden"
      } ${childrenPosition}`}
    >
      {childrens.map((children, index) => (
        <MenuItems category={children} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};
