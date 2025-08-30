import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/ui/Button";
import useProductId from "@/hooks/api/Product/useSinglePorduct";
import { AiOutlineShopping, MdOutlinePayment } from "@/icons";
import { offerPricePercent } from "@/utils/priceOfferPercent";
import SkeletonProductDetails from "@/components/loader/skeleton/Porduct/Product/SkeletonProductDetails";
import CustomError from "@/components/error/CustomError";
import { formatPrice } from "@/utils/formatPrice";
import { handlePurchaseProduct } from "@/utils/productPurchase";
import { useCart } from "@/hooks/cart/useCart";
import { notifyError } from "@/utils/toast";
import PageLayout from "@/components/ui/PageLayout";
import { publicRequest } from "@/lib/axios";
import { responseHandler } from "@/utils/helpers";
import SingleCart from "@/components/card/SingleCart";
import Pagination from "@/components/ui/Pagination";
import ProductCardSkeleton from "@/components/loader/skeleton/Porduct/Product/SingleProductSkeleton";
import { Checkbox } from "@/components/ui/Input";

const ProductDetails = () => {
  const { addItem, items } = useCart();
  const router = useRouter();
  const {
    data: productItem,
    loading,
    error,
  } = useProductId(router?.query?.slug);
  const product = productItem?.product;
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState({
    color_id:  null,
    attribute_id:   null,
  });
  useEffect(() => {
    setVariantId({
      color_id: productItem?.colors[0]?.id || null,
      attribute_id: productItem?.attributes[0]?.id || null,
    });
  }, [productItem]); 
  const [page, setPage] = useState(1);
  // purchasae product handler
  const handlePurchase = (vl) => {
    let color_id, attribute_id;
    if (!productItem?.colors?.length) {
      color_id = null;
    } else {
      color_id = variantId?.color_id
        ? variantId?.color_id
        : productItem?.colors[0]?.id;
    }
    if (!productItem?.attributes?.length) {
      attribute_id = null;
    } else {
      attribute_id = variantId?.attribute_id
        ? variantId?.attribute_id
        : productItem?.attributes[0]?.id;
    }
    if (vl === "add") {
      addItem(
        handlePurchaseProduct({ ...product, quantity, color_id, attribute_id })
      );
    } else {
      localStorage.setItem(
        "order_items",
        JSON.stringify([
          handlePurchaseProduct({
            ...product,
            quantity,
            color_id,
            attribute_id,
          }),
        ])
      );
      router?.push(`/checkout?buy_now=${product?.slug}`);
    }
  }; 
  // fetch releted product
  const [reletedProduct, setReletedProduct] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  useEffect(() => {
    const fetchReletedProduct = async () => {
      setRelatedLoading(true);
      try {
        const response = await publicRequest.get(
          `/user/related-products?category_id=${productItem?.product?.category_id}&vendor_id=${productItem?.product?.vendor_id}&per_page=10&page=${page}`
        );
        if (responseHandler(response)) {
          setReletedProduct(response?.data?.data);
        }
        setRelatedLoading(false);
      } catch (error) {
        setRelatedLoading(false);
      }
    };
    fetchReletedProduct();
  }, [productItem, page]);
  // pagination system more user friendly
  useEffect(() => {
    if (!router?.query?.slug) return;
    router.push(
      {
        pathname: `/product-details/${router?.query?.slug}`,
        query: { related_page: page },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, [page]);
  useEffect(() => {
    if (router?.query?.related_page) {
      setPage(Number(router?.query?.related_page));
    }
  }, [router?.query?.related_page]);
  if (loading) return <SkeletonProductDetails />;
  if (error) return <CustomError />;
  return (
    <PageLayout>
      {/* product details call here  */}
      <div className="flex flex-col md:flex-row justify-between md:gap-10">
        <div className="flex justify-center w-full md:w-1/2 aspect-[247/187]">
          <Image
            src={`${process?.env.NEXT_PUBLIC_API_SERVER}${product?.thumbnail}`}
            alt="Organic Banana"
            className="w-full rounded-xl"
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className="space-y-2 md:space-y-3 lg:space-y-5 w-full md:w-1/2">
          <div className="flex items-center gap-2 flex-wrap text-xl md:text-2xl lg:text-4xl font-bold text-[#030712]">
            <span className="whitespace-normal">
              Marketside Fresh Organic Bananas, Bunch
            </span>

            {/* <div className="bg-gradient-to-r from-[#D4FC79] to-[#96E6A1] text-[#166534] text-xs font-extrabold flex items-center py-1 px-2 rounded-full gap-1">
              <Image
                src="/products/1.png"
                alt="organic"
                className="w-3.5 h-3.5"
                width={14}
                height={14}
              />
              ORGANIC
            </div> */}
          </div>

          <p className="text-sm border-b pb-2  flex gap-2 items-center">
            {/* <span className="font-thin text-[#6B7280]">|</span> */}
            <strong className="text-[#6B7280] ">Vendor:</strong>
            <span className="text-[13px] font-medium text-[#030712] ">
              {product?.vendor?.company_name}
            </span>
            <span className="font-thin text-[#6B7280]">|</span>
            <strong className="text-[13px] font-medium text-[#6B7280]">
              SKU:
            </strong>
            <span className="text-[#030712]">{product?.sku}</span>
          </p>
          <p className="text-sm text-[#4B5563] leading-relaxed line-clamp-3 font-normal">
            {product?.short_description ||
              "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent tacitisociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper."}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-primary text-2xl font-bold">
              {formatPrice(product?.reguler_price, "BDT")}{" "}
            </span>
            <span className="text-[#111827] line-through text-xl font-medium">
              {formatPrice(product?.offer_price, "BDT")}
            </span>
            <div className="bg-primary/20 text-black/80 text-xs  flex items-center justify-center py-1 px-3 rounded-full w-14 mb-2 text-[10px] font-extrabold">
              {offerPricePercent(product?.reguler_price, product?.offer_price)}%
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 md:gap-3">
            <div className="flex items-center justify-between px-5 bg-[#FFFFFF] border border-[#D1D5DB] min-w-[155px] w-full  rounded-md  text-base sm:text-lg md:text-xl lg:text-2xl  text-[#020617]  ">
              <button
                className="rounded-full shadow-md border border-gray-300 w-8 h-8 flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                onClick={() =>
                  setQuantity((prev) => {
                    return prev === 1 ? 1 : prev - 1;
                  })
                }
              >
                -
              </button>
              <span className="text-lg font-semibold px-3">{quantity}</span>
              <button
                className="rounded-full shadow-md border border-gray-300 w-8 h-8 flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-100 transition "
                onClick={() => {
                  if (product?.stock <= quantity) {
                    return notifyError("Quantity is over the stock");
                  }
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>
            <Button
              className="text-white font-semibold px-5 py-2 rounded text-nowrap  "
              bgColor="bg-[#16A34A]"
              rounded="rounded-md"
              textSize="text-sm"
              onClick={() => handlePurchase("add")}
            >
              <AiOutlineShopping />
              <span> Add to cart</span>
            </Button>
            <Button
              className="text-white font-semibold px-5 py-2 rounded text-nowrap  "
              bgColor="bg-[#212529]"
              rounded="rounded-md"
              textSize="text-sm"
              onClick={() => handlePurchase("buy")}
            >
              <AiOutlineShopping />
              <span>Buy Now</span>
            </Button>
          </div>
          <div className="text-sm text-gray-600 space-y-2 ">
            {productItem?.attributes?.length > 0 && (
              <div className="flex">
                <strong className="w-20 block capitalize ">{productItem?.units[0]?.name} </strong> :
                <div className="flex gap-1">
                  {productItem?.attributes?.map((att, idx) => (
                    <span
                      className="w-full  rounded-md px-2  cursor-pointer"
                      key={idx}
                      onClick={() =>
                        setVariantId({ ...variantId, attribute_id: att?.id })
                      }
                    >
                     <Checkbox
                        checked={variantId?.attribute_id === att?.id ? true : false}
                        label={att?.name}
                      /> 
                    </span>
                  ))}
                </div>
              </div>
            )}
            {productItem?.colors?.length > 0 && (
              <div className="flex ">
                <strong className="w-20 block capitalize">Color</strong>:
                <div className="flex gap-1">
                  {productItem?.colors?.map((clr, idx) => (
                    <span
                      className="  cursor-pointer  rounded-md px-2  shrink-0 text-center"
                      key={idx}
                      onClick={() =>
                        setVariantId({ ...variantId, color_id: clr?.id })
                      }
                    >
                      <Checkbox
                        checked={variantId?.color_id === clr?.id ? true : false}
                        label={clr?.name}
                      /> 
                    </span>
                  ))}
                </div>
              </div>
            )}
            <p className="flex">
              <strong className="w-20 block capitalize">Category {" "}</strong> : <span className="px-2">{product?.category?.category_name}</span>
            </p>
          </div>

          {/* <div className="mt-2 px-3 py-2  rounded-md text-sm text-[#6B7280] flex items-center gap-2 md:gap-3 lg:gap-4 border border-[#E5E7EB]">
            <div>
              <MdOutlinePayment className="text-3xl" />
            </div>
            <div>
              <strong>Payment:</strong> Payment. Payment upon receipt of goods,
              Payment by card in the department, Bkash, Online card, -5%
              discount in case of payment
            </div>
          </div> */}
        </div>
      </div>
      {/* product  description */}
      <div className="space-y-3 py-5 text-[#030712]">
        <div className="border-b border-[#E5E7EB]  ">
          <span className="inline-block border-b-2 border-[#030712] pb-2 leading-7 font-bold">
            Description
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
      </div>
      {/* realeted product code here  */}
      <span className="flex mb-2 pb-2 leading-7 font-bold text-lg text-[#030712] border-b border-[#E5E7EB]  ">
        Related products
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {!relatedLoading &&
          reletedProduct?.data?.map((product, idx) => (
            <SingleCart product={product} />
          ))}
        {relatedLoading &&
          [...Array(10)].map((_, idx) => <ProductCardSkeleton key={idx} />)}
      </div>
      <Pagination
        totalPage={reletedProduct?.last_page}
        page={reletedProduct?.current_page}
        setPage={setPage}
      />
    </PageLayout>
  );
};

export default ProductDetails;
