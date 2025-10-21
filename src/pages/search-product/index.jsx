import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Drawer from "react-modern-drawer";
import useSearchProduct from "@/hooks/api/Product/useSearchProduct";
import SingleCart from "@/components/card/SingleCart";
import ProductCardSkeleton from "@/components/loader/skeleton/Porduct/Product/SingleProductSkeleton";
import { CiFilter } from "@/icons";
import PageLayout from "@/components/ui/PageLayout";
import { FilterArea } from "@/components/filter/FilterArea";
import { useLoadingObserver } from "@/utils/loadingObserver";
import InfinityLoadingButton from "@/components/ui/InfinityLoadingButton";
import useProductFilterMaterial from "@/hooks/api/productFilter/useProductFilter";

const SearchProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const loadingRef = useRef();

  // Build params
  let params = {
    search: query?.search,
    ...(checked.includes("In Stock") && { in_stock: true }),
    ...(checked.includes("On Sale") && { on_sale: true }),
    ...(categoryId?.length > 0 && { category_ids: categoryId }),
    ...(brandId?.length > 0 && { brand_ids: brandId }),
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

  // Fetch search product data
  const { data, loading, infinityLoading, hasMoreData } = useSearchProduct(params);

  // Fetch filter data
  const { data: filterData, loading: filterLoading } = useProductFilterMaterial({
    route: `product/search?search=${query?.search}`,
    isFetch: query?.search ? false : true,
  });

  const handleOpenDrawer = () => {
    setOpen(!open);
  };

  // Infinity loading observer
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  });

  return (
    <PageLayout>
      <div className="flex gap-4 md:gap-3">
        {/* Sidebar Filter */}
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

        {/* Mobile Drawer Filter */}
        <Drawer
          open={open}
          onClose={handleOpenDrawer}
          direction="left"
          style={{
            width: "100%",
            maxWidth: "280px",
          }}
          className="w-full sm:w-[350px]"
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

        {/* Product Grid */}
        <div className="space-y-4 md:space-y-5 lg:space-y-6">
          <button
            className="md:hidden text-black bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1"
            onClick={handleOpenDrawer}
          >
            <CiFilter /> Filter
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {loading
              ? [...Array(10)].map((_, idx) => <ProductCardSkeleton key={idx} />)
              : data?.map((product, idx) => <SingleCart product={product} key={idx} />)}
          </div>

          {/* Infinite Scroll Loader */}
          <InfinityLoadingButton
            loadingRef={loadingRef}
            infinityLoading={infinityLoading}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchProduct;
