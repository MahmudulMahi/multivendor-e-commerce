import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SingleShopCard from "@/components/card/SingleShopCard";
import SingleShopSkeleton from "@/components/loader/skeleton/Shop/SingleShopSkeleton";
import PageLayout from "@/components/ui/PageLayout";
import Pagination from "@/components/ui/Pagination";
import useShop from "@/hooks/api/Shop/useShop";

const Shop = () => {
  const router = useRouter();
  // shop list
  const [page, setPage] = useState(1);
  const {
    data: shopList,
    loading,
    information,
  } = useShop({ isFetch: true, page, per_page: 12 });
  // pagination implement with properly dynamic 
  useEffect(() => { 
    router.push(
      {
        pathname: `/shop`,
        query: { shop_page: page },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, [page]);
  useEffect(() => {
    if (router?.query?.shop_page) {
      setPage(Number(router?.query?.shop_page));
    }
  }, [router?.query?.shop_page]);
  return (
    <PageLayout>
      {loading ? (
        <SingleShopSkeleton />
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
          {shopList?.map((shop, idx) => (
            <SingleShopCard shop={shop} key={idx} />
          ))}
        </div>
      )}
      <Pagination
        totalPage={information?.data?.data?.last_page}
        page={information?.data?.data?.current_page}
        setPage={setPage}
      />
    </PageLayout>
  );
};

export default Shop;
