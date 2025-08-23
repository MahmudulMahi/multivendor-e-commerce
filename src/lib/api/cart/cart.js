import { privateRequest } from "@/lib/axios";
export const fetchCart = () => privateRequest.get('user/cart');
export const addToCart = (data) => privateRequest.post('user/cart', data);
export const updateToCart = (id,data) => privateRequest.post(`user/cart/${id}`, data);
export const removeFromCart = (cartId) => privateRequest.delete(`user/cart/${cartId}`);
export const clearCart = () => privateRequest.delete('user/cart/clear');