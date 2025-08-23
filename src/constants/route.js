export const ROUTES = {
  HOME: "/",
  CONTACT: "/contact",
  PRODUCTS: "/products",
  PRODUCTS_SEARCH: "/search-product",
  CART: "/cart",
  PRODUCT_DETAILS: (id) => `/product-details/${id}`,
  CATEGORY: "/category",
  CATEGORY_DETAILS: (id) => `/category/${id}`,
  SHOP: "/shop",
  SHOP_DETAILS: (id) => `/shop-products/${id}`,
  // information router
  ABOUT: "/information/about",
  TERMS_CONDITION: "/information/terms-condition",
  FAQ: "/information/faq",
  PRIVACY_POLICY: "/information/privacy-policy",
  E_WASTE_POLICY: "/information/e-waste-policy",
  CANCEL_POLICY: "/information/cancellation-return-policy",
  // ORDER PROCESS
  CHECKOUT: "/checkout",
  //   auth route
  LOGIN: "/auth/login",
  REGISTER: "/auth/signup",
  FORGET_PASSWORD: "/auth/forgot-password",
  OTP: "/auth/verify-otp",
  //   user dashboard route
  DASHBOARD: "/dashboard",
  ORDERS: "/dashboard/my-order",
  ORDER_DETAILS: (id) => `/dashboard/order-details/${id}`,
  ACCOUNT: "/dashboard/profile",
  ADDRESS: "/dashboard/address",
  TRACK: "/dashboard/my-order",
  CHANGE_PASSWORD: "/dashboard/change-password",
};
