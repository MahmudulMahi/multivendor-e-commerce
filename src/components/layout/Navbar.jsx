import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "../ui/Input";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { useRouter } from "next/router";
import CartMenu from "../cart/CartMenu";
import BottomNav from "./BottomNav";
import { useCart } from "@/hooks/cart/useCart";
import { CiSearch, CiFaceSmile, CiShop, CiLogout } from "@/icons";
import Image from "next/image";
import LinkButton from "../ui/LinkButton";
import { useAuth } from "@/context/AuthContext";
import NavbarSkeleton from "../loader/skeleton/Navbar/NavbarSkeleton";
const Navbar = () => {
  const { items } = useCart();
  const { user: userProfile, logout, loading: authLoading } = useAuth();
  const [isFixed, setIsFixed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  const router = useRouter();
  // Scroll detector
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const menuRef = useRef(null);
  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  if (authLoading) return <NavbarSkeleton />;
  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${isFixed && "shadow"}`}>
      {/* navingation header  */}
      <section
        className={` hidden md:block bg-primary w-full z-40 transition-all duration-500 ease-in-out overflow-hidden `}
      >
        <div className=" container-custom flex justify-between text-white items-center text-sm font-medium leading-[18px] h-8 underline">
          <Link
            href={ROUTES?.HOME}
            aria-label="bajar.net"
            className="hover:underline"
          >
            Welcome to Baajar!
          </Link>
          <Link
            href={ROUTES.TRACK}
            aria-label="bajar.net"
            className="flex items-center gap-1 hover:underline"
          >
            <img src="/icons/track_car.svg" alt="loading" />
            <span>Track Your Order</span>
          </Link>
        </div>
      </section>
      {/* second header  */}
      <section
        className={`bg-white z-50 w-full transition-all duration-500 ease-in-out transform py-2 `}
      >
        <div className=" container-custom h-full flex items-center justify-between gap-3">
          <div className="flex gap-3 items-center flex-shrink-0">
            <img src="/icons/location.svg" alt="loading" />
            <NavbarText text1="Deliver to" text2="all sylhet" />
          </div>
          {/* search area  */}
          <div className="w-full relative">
            <TextInput
              placeholder="Search  products,categories... "
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className="text-xs sm:text-sm truncate overflow-hidden"
            />
            <span
              className="absolute text-3xl font-bold text-black right-0 top-0 h-full 
             flex items-center cursor-pointer bg-primary/5 rounded-r-md 
             px-2 transition-all duration-300 ease-in-out 
             hover:bg-primary/15 hover:scale-105 hover:shadow-md"
              onClick={() =>
                searchText &&
                router.push(`/search-product?search=${searchText}`)
              }
            >
              <CiSearch />
            </span>
          </div>
          {/* cart and profile icon  */}
          {userProfile?.phone||userProfile?.name ? (
            <div className="hidden md:flex  items-center flex-shrink-0 gap-2 ">
              <div className="relative flex items-center" ref={menuRef}>
                <button onClick={() => setProfileMenu(!profileMenu)}>
                  {" "}
                  {userProfile?.image ? (
                    <Image
                      width={25}
                      height={25}
                      src={`${process?.env.NEXT_PUBLIC_API_SERVER}${userProfile?.image}`}
                      alt="loading"
                      priority
                      className="rounded-full object-cover w-7 h-7"
                    />
                  ) : (
                    <Image
                      width={25}
                      height={25}
                      src="/icons/account.svg"
                      alt="loading"
                    />
                  )}
                </button>
                <div
                  className={`absolute right-2 top-5 mt-2     rounded-md shadow-lg origin-top-right z-50 overflow-hidden
        transform transition-all duration-300 ease-out border w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-300/30 
        ${
          profileMenu
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        }`}
                ></div>

                {/* profile menu show here  */}
                <div
                  className={`absolute -right-20 top-7 mt-2 w-60 bg-white rounded-md shadow-lg origin-top-right z-50 overflow-hidden
        transform transition-all duration-300 ease-out border 
        ${
          profileMenu
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        }`}
                  onMouseLeave={() => setProfileMenu(false)} // Hover outside => close
                >
                  {" "}
                  <div className="py-6 text-sm text-gray-700  ">
                    {/* indicator make  */}

                    <Link
                      href={ROUTES?.ACCOUNT}
                      aria-label="bajar.net"
                      className="px-4 py-2   cursor-pointer flex gap-1 items-center text-[15px] font-normal hover:text-primary/80 hover:underline"
                    >
                      <CiFaceSmile className="text-xl" />
                      <span className=""> Manage My Account</span>
                    </Link>
                    <Link
                      href={ROUTES?.ORDERS}
                      aria-label="bajar.net"
                      className="px-4 py-2   cursor-pointer flex gap-1 items-center text-[15px] font-normal hover:text-primary/80 hover:underline"
                    >
                      <CiShop className="text-xl" />
                      My Orders
                    </Link>
                    <div
                      className="px-4 py-2 cursor-pointer flex gap-1 items-center text-[15px] font-normal hover:text-primary/80 hover:underline  "
                      onClick={() => logout()}
                    >
                      <CiLogout className="text-xl" />
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
              <NavbarText text1="Deliver to" text2="all sylhet" />
              {/* cart route  */}
              <div className="relative  group py-2 ">
                <Link className="" aria-label="bajar.net" href={ROUTES?.CART}>
                  <Image
                    width={25}
                    height={25}
                    src="/icons/cart.svg"
                    alt="loading"
                  />
                  {items?.length ? (
                    <span className="absolute top-1.5 -right-1 inline-flex items-center justify-center bg-primary text-white text-xs font-bold px-1 aspect-square rounded-full">
                      {items?.length}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
                {items?.length > 0 && (
                  <div className="absolute top-8 -right-4  w-56 bg-white shadow-lg rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-[9999] pointer-events-none group-hover:pointer-events-auto shadow">
                    <div className="absolute -top-1 right-5 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-300"></div>
                    <CartMenu cartProduct={items} />
                  </div>
                )}
                {/* hover for full body overlay with background  */}
                {/* {items?.length > 0 && (
                  <div
                    className="fixed inset-0 bg-black opacity-20 z-[9998] h-[calc(100vh-80px)] top-16 hidden group-hover:block 
  translate-y-[-100%] group-hover:translate-y-0 
  transition-all duration-500 ease-in-out 
  pointer-events-none group-hover:pointer-events-auto"
                  ></div>
                )} */}
              </div>
            </div>
          ) : (
            <div className="md:flex gap-2 hidden md:gap-3 ">
              <LinkButton
                href={ROUTES?.LOGIN}
                className="text-nowrap uppercase text-sm  font-medium"
                bgColor=" "
                color="text-black"
              >
                <span className="relative  group">
                  login
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 origin-left" />
                </span>
              </LinkButton>
              <LinkButton
                href={ROUTES?.REGISTER}
                className="text-nowrap uppercase text-sm  font-medium"
                bgColor="bg-r "
                color="text-[#030712]"
              >
                <span className="relative  group">
                  Sign Up
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 origin-left" />
                </span>
              </LinkButton>
            </div>
          )}
        </div>
      </section>
      <div className="md:hidden  ">
        <BottomNav items={items} />
      </div>
    </div>
  );
};
export default Navbar;

const NavbarText = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col text-[#030712] ">
      <span className="text-sm leading-4 font-normal opacity-75">{text1}</span>
      <span className="font-medium text-sm leading-4 "> {text2}</span>
    </div>
  );
};
