import React, { useEffect, useMemo, useRef, useState } from "react";
import useCategoryId from "@/hooks/api/Category/useSingleCategory";
import { useRouter } from "next/router";
import SingleCart from "../card/SingleCart";
import ProductBanner from "../banner/ProductBanner";
import { useLoadingObserver } from "@/utils/loadingObserver";
import ProductCardSkeleton from "../loader/skeleton/Porduct/Product/SingleProductSkeleton";
import { FilterArea } from "../filter/FilterArea";

import Drawer from "react-modern-drawer";
import useProductFilterMaterial from "@/hooks/api/productFilter/useProductFilter";
import InfinityLoadingButton from "../ui/InfinityLoadingButton";
const CategoryProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef();
  const queryParams = useMemo(() => {
    let params = {
      ...(checked.includes("In Stock") && { in_stock: true }),
      ...(checked.includes("On Sale") && { on_sale: true }),
      ...(categoryId.length > 0 && { category_ids: categoryId }),
      per_page: 10,
      page,
    };
    if (price?.maxPrice) {
      params.max_price = price.maxPrice;
      params.min_price = price.minPrice;
    }
    return params;
  }, [checked, categoryId, price, page]);
  const { data, loading, infinityLoading, hasMoreData } = useCategoryId(
    query?.slug,
    queryParams
  );
  // loading observer api
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  });
  // filter api call here
  const { data: filterData, loading: filterLoading } = useProductFilterMaterial(
    {
      route: `user/category-products/${query?.slug}`,
      isFetch: query?.slug ? false : true,
    }
  ); 
  // drawer logic
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="flex gap-4 md:gap-8 ">
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
      </Drawer>
      <div className="flex-1 space-y-4 md:space-y-5 lg:space-y-6 ">
        {/* banner set for cateogory section  */}
        <ProductBanner
          title={<>{filterData?.category?.category_name}</>}
          subTitle={<>{filterData?.category?.description}</>}
          img={`${process?.env.NEXT_PUBLIC_API_SERVER}${filterData?.category?.category_image}`}
        />
        {/* show product here
         */}
        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data?.map((product, idx) => (
              <SingleCart product={product} key={idx} />
            ))}
          </div>
        )}
        {/* infinity loading  */}
        <InfinityLoadingButton
          loadingRef={loadingRef}
          infinityLoading={infinityLoading}
        />
      </div>
    </div>
  );
};

export default CategoryProduct;
