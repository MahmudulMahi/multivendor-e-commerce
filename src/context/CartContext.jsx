import useCartProvider from "@/hooks/api/cart/cart";
import { createContext, useContext, useReducer, useEffect } from "react";

export const CartContext = createContext(); 
export function CartProvider({ children }) { 
  const cart = useCartProvider();
  return (
    <CartContext.Provider
      value={cart}
    >
      {children}
    </CartContext.Provider>
  );
}

