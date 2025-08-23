export  function flattenOrders(orderList) {
    const result = [];  
    orderList?.forEach((order) => {
      const orderStatus = order?.order_status;
      const orderId = order?.id;
      const shippingCost = parseFloat(order?.shipping_cost || 0);
      const create = order?.created_at;
      order?.sub_orders?.forEach((subOrder) => {
        const vendor = subOrder?.vendor;
        const vendorName = vendor?.company_name;
        const subOrderId = subOrder?.id;
        subOrder?.items?.forEach((item) => {
          result.push({
            order_id: orderId,
            sub_order_id: subOrderId,
            order_status: orderStatus,
            vendor_name: vendorName,
            product_id: item?.product_id,
            product_name: item?.product?.product_name,
            product_description: item?.product?.short_description,
            quantity: item?.quantity,
            total: parseFloat(item?.total),
            price: parseFloat(item?.price),
            shipping_cost: shippingCost,
            image: `${process.env.NEXT_PUBLIC_API_SERVER}${item?.product?.thumbnail}`,
            product_images: item?.product?.product_image,
            created_at: create,
          });
        });
      });
    }); 
    return result;
  }