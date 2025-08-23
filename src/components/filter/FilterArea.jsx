import PriceFilterSkeleton from "../loader/skeleton/Porduct/Category/PriceFilterSkeleton";
import ProductStatusSkeleton from "../loader/skeleton/Porduct/Category/ProductStatusSkeleton";
import PriceFilter from "./PriceFilter";
import ProductBrands from "./ProductBrands";
import ProductCategory from "./ProductCategory";
import ProductStatus from "./Status"; 
export const FilterArea = ({
  loading,
  data,
  setPrice,
  price,
  categoryId,
  setCategoryId,
  brandId,
  setBrandId,
  checked,
  setChecked,
  setPage
}) => {  
  return (
    <div>
      {loading ? (
        <>
          <PriceFilterSkeleton />
          <ProductStatusSkeleton />
          <ProductStatusSkeleton />
        </>
      ) : (
        <div className="space-y-4">
          {" "}
          <PriceFilter
            max={Math.round(Number(data?.max_price)) }
            min={0}
            setPrice={setPrice}
            price={price}
            setPage={setPage}
          />
          {data?.categories?.length > 0 && (
            <ProductCategory
              category={data?.categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              setPage={setPage}
            />
          )}
          {data?.brands?.length > 0 && (
            <ProductBrands
              brand={data?.brands}
              brandId={brandId}
              setBrandId={setBrandId}
               setPage={setPage}
            />
          )}
          <ProductStatus checked={checked} setChecked={setChecked} setPage={setPage} />
        </div>
      )}
    </div>
  );
};
