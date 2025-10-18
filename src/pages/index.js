import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { spcialOffer } from "@/constants/serviceSpecialOffer";
import { useLoadingObserver } from "@/utils/loadingObserver";
import Banner from "@/components/banner/Banner";
import Category from "@/components/category/Category";
import SingleCart from "@/components/card/SingleCart";
import SingleShopCard from "@/components/card/SingleShopCard";
import HomePageHeaderText from "@/components/ui/HomePageHeaderText";
import useShop from "@/hooks/api/Shop/useShop";
import useProduct from "@/hooks/api/Product/useProduct";
import SingleShopSkeleton from "@/components/loader/skeleton/Shop/SingleShopSkeleton";
import HomeFirstSkeletonSection from "@/components/loader/skeleton/Home/HomeFirstSkeletonSection";
import ProductCardSkeleton from "@/components/loader/skeleton/Porduct/Product/SingleProductSkeleton";
import CustomError from "@/components/error/CustomError";
import PageLayout from "@/components/ui/PageLayout";
import Modal from "@/components/ui/modal";
import NearestShop from "@/components/shop/Nearest-Shop";
import InfinityLoadingButton from "@/components/ui/InfinityLoadingButton";

export default function Home() {
  const [page, setPage] = useState(1);
  const loadingRef = useRef();
  // shop list
  const {
    data: shopList,
    loading: shopLoading,
    error,
  } = useShop({ per_page: 12, isFetch: true });
  // product list
  const {
    data: productList,
    loading: productLoading,
    error: productError,
    infinityLoading,
    hasMoreData,
  } = useProduct({ page, per_page: 10 });
  // loading observer function
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  });
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  }; 
  if (error || productError) return <CustomError />;
  return (
    <PageLayout>
      {/* nearest shop modal created   */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        children={
          <>
            <NearestShop />
          </>
        }
      />
      <div className="  space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8  ">
        {/* catgory and banner section  */}
        <section className="flex gap-4">
          <div className="hidden md:block md:w-4/12 lg:w-3/12 ">
            <Category />
            <Image
              src="/homeImage/1.png"
              width={1000}
              height={1000}
              className="mb-2 mt-2"
              alt="loading..."
            />
            {/* <Image
              src="/homeImage/2.png"
              width={1000}
              height={1000}
              alt="loading..."
            /> */}
          </div>
          {/* product and banner section  */}
          <div className="w-full md:w-8/12 lg:w-9/12 ">
            <div>
              <Banner />
              <div className="pt-4 sm:pt-8 md:pt-10">
                {shopLoading ? (
                  <HomeFirstSkeletonSection />
                ) : (
                  <div className="flex justify-between pb-6 md:pb-8 ">
                    <HomePageHeaderText>
                      Nearest <span className="text-primary">Shop Profile</span>
                    </HomePageHeaderText>
                    <div className=" flex items-center gap-2 text-sm md:text-base leading-[18px] text-[#222222]">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                      >
                        <img
                          src="/icons/homeLocation.svg"
                          alt="location icon"
                          className=""
                        />
                        <span className="font-medium truncate text-sm md:text-base">
                          Nearest Shops
                        </span>
                      </div>
                      <Link
                        href={ROUTES.SHOP}
                        aria-label="bajar.net"
                        className="flex items-center lg:pl-6  cursor-pointer truncate text-sm md:text-base"
                      >
                        <span className="hidden md:flex">View All</span>
                        <img
                          className="hidden md:flex"
                          src="/icons/leftArrow.svg"
                          alt="location icon"
                        />
                      </Link>
                    </div>
                  </div>
                )}
                {shopLoading ? (
                  <SingleShopSkeleton />
                ) : (
                  <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-3 ">
                    {shopList?.map((shop, idx) => (
                      <SingleShopCard shop={shop} key={idx} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* offer image  */}
        <section className="  ">
          {/* offer image  */}
          <div className="flex gap-4">
            <div className="w-full aspect-auto">
              <Image
                src={"/offer/1.jpg"}
                width={1000}
                height={1000}
                alt="loading..."
                className="w-full rounded-md"
                priority
              />
            </div>
            <div className="w-full aspect-auto">
              <Image
                src={"/offer/2.jpg"}
                width={1000}
                height={1000}
                alt="loading..."
                className="w-full rounded-md"
                priority
              />
            </div>
          </div>
        </section>
        {/* 2nd product and shop show field  */}
        <section className="flex gap-4   ">
          <div className="hidden md:block md:w-4/12 lg:w-3/12 ">
            {/* <Category /> */}
            <Image
              src="/homeImage/3.png"
              width={1000}
              height={1000}
              alt="loading..."
              priority
            />
          </div>
          <div className="w-full md:w-8/12 lg:w-9/12 ">
            <div className=" ">
              <div className="flex justify-between pb-2 md:pb-4">
                <HomePageHeaderText>
                  Hot Product <span className="text-primary ">Nearby</span>
                </HomePageHeaderText>
                <div className="flex items-center gap-2 text-sm md:text-base leading-[18px] text-[#222222]">
                  <Link
                    href={ROUTES.PRODUCTS}
                    aria-label="bajar.net"
                    className="flex items-center pl-6 cursor-pointer"
                  >
                    <span>View All</span>
                    <img src="/icons/leftArrow.svg" alt="location icon" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {productList?.map((product, idx) => (
                  <SingleCart product={product} key={idx} />
                ))}
               
              </div>
               {productLoading && (
                  <div className="pt-5 grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-3">
                    {[...Array(10)].map((_, idx) => (
                      <ProductCardSkeleton key={idx} />
                    ))}
                  </div>
                )}
              <InfinityLoadingButton
                loadingRef={loadingRef}
                infinityLoading={infinityLoading}
              />
            </div>
          </div>
        </section> 
        {/* special service section  */}
        <section className="  gap-4 hidden md:gap-3 lg:gap-5   grid-cols-1 md:grid lg:grid-cols-4  md:grid-cols-2   ">
          {spcialOffer.map((item) => (
            <div
              key={item?.logo}
              className="flex gap-4 items-center rounded-xl justify-center py-5 shadow-custom"
            >
              <Image
                height={40}
                width={40}
                src={item?.logo}
                alt="authentic"
                priority
              />
              <div>
                <p className="text-base font-bold text-[#030712]">
                  {item?.title}
                </p>
                <p className="text-xs text-[#6B7280] ">{item?.comment}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PageLayout>
  );
}
