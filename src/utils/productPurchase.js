 export const handlePurchaseProduct = (productItem) => {
    const product = {
      ...productItem,
      product_id: productItem?.id,
      vendor_id: productItem?.vendor_id,
      quantity: productItem?.quantity||1,
      price: productItem?.offer_price,
      color_id: productItem?.color_id||null,
      attribute_id: productItem?.attribute_id||null,
    };
    return product;
  };