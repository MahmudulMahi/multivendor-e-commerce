import React, { useRef, useState } from "react";
import useProduct from "@/hooks/api/Product/useProduct";
import SingleCart from "@/components/card/SingleCart";
import PageLayout from "@/components/ui/PageLayout";
import InfinityLoadingButton from "@/components/ui/InfinityLoadingButton";
import { useLoadingObserver } from "@/utils/loadingObserver";
import ProductCardSkeleton from "@/components/loader/skeleton/Porduct/Product/SingleProductSkeleton";

const Product = () => {
  const loadingRef = useRef();
  const [page, setPage] = useState(1);
  const {
    data: productList,
    loading,
    infinityLoading,
    hasMoreData,
  } = useProduct({ page, per_page: 10 });
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  }); 
  return (
    <PageLayout>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4   gap-3">
          {[...Array(10)].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {productList?.map((product, idx) => (
              <SingleCart product={product} key={idx} />
            ))}
          </div>
          <InfinityLoadingButton
            loadingRef={loadingRef}
            infinityLoading={infinityLoading}
          />
        </>
      )}
    </PageLayout>
  );
};

export default Product;
