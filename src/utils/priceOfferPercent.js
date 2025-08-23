export const offerPricePercent = (price,discount)=>{
 if (!price || price <= 0) return 0; 
 const offerPrice = price-discount;
  const percent = (100*offerPrice/ price)  ;
  return Math.round(percent); 
}