import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import SingleCart from "../card/SingleCart";
import useSingleShopId from "@/hooks/api/Shop/useSingleShop";
import ProductBanner from "../banner/ProductBanner";
import Drawer from "react-modern-drawer";
import { CiFilter } from "@/icons";
import ProductCardSkeleton from "../loader/skeleton/Porduct/Product/SingleProductSkeleton";
import BannerSkeleton from "../loader/skeleton/Home/BannerSkeleton";
import { useLoadingObserver } from "@/utils/loadingObserver";
import Spinner from "../loader/Spinner";
import { FilterArea } from "../filter/FilterArea";
import useProductFilterMaterial from "@/hooks/api/productFilter/useProductFilter";
import InfinityLoadingButton from "../ui/InfinityLoadingButton";
const ShopProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef();
  let params = {
    ...(checked.includes("In Stock") && { in_stock: true }),
    ...(checked.includes("On Sale") && { on_sale: true }),
    ...(categoryId?.length > 0 && { category_ids: categoryId }),
    page,
    per_page: 10,
  };
  if (price?.maxPrice) {
    params = {
      ...params,
      max_price: price?.maxPrice,
      min_price: price?.minPrice,
    };
  }
  // fetch single shop data
  const { data, loading, error, infinityLoading, hasMoreData } =
    useSingleShopId(query?.slug, params);
  // filter api call here
  const { data: filterData, loading: filterLoading } = useProductFilterMaterial(
    { route: `user/vendor/${query?.slug}`, isFetch: query?.slug ? false : true }
  ); 
  // drawer function
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(!open);
  };
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  }); 
  return (
    <div className="flex gap-2 md:gap-3">
      <div className="md:w-[230px] lg:w-[259px] md:block hidden shrink-0">
        <FilterArea
          data={filterData}
          loading={!filterData?.max_price || filterLoading}
          setPrice={setPrice}
          price={price}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          brandId={brandId}
          setBrandId={setBrandId}
          checked={checked}
          setChecked={setChecked}
          setPage={setPage}
        />
      </div>
      <Drawer
        open={open}
        onClose={handleOpenDrawer}
        direction="left"
        style={{
          width: "100%",
          maxWidth: "280px",
        }}
        className="w-full sm:w-[280px]"
      >
        <div className="px-4 py-4 overflow-y-scroll h-screen">
          <FilterArea
            data={filterData}
            loading={filterLoading || !filterData?.max_price}
            setPrice={setPrice}
            price={price}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            brandId={brandId}
            setBrandId={setBrandId}
            checked={checked}
            setChecked={setChecked}
            setPage={setPage}
          />
        </div>
      </Drawer>
      <div className=" w-full space-y-4 md:space-y-5 lg:space-y-6">
        <button
          className="md:hidden text-black bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1"
          onClick={handleOpenDrawer}
        >
          <CiFilter /> Filter
        </button>
        {/* banner set for cateogory section  */}
        {!loading ? (
          <ProductBanner
            title={<span>{filterData?.vendor?.company_name}</span>}
            subTitle={<>{filterData?.vendor?.company_location}</>}
            img={`${process?.env.NEXT_PUBLIC_API_SERVER}${filterData?.vendor?.logo}`}
          />
        ) : (
          <BannerSkeleton />
        )}
        {/* show product here
         */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : data?.map((product, idx) => (
                <SingleCart product={product} key={idx} />
              ))}
        </div>
        <InfinityLoadingButton
          loadingRef={loadingRef}
          infinityLoading={infinityLoading}
        />
      </div>
    </div>
  );
};

export default ShopProduct;
