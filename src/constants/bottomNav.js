import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineShoppingCart,
  MdOutlineDashboard,
  LuCar,
} from "@/icons";
import { ROUTES } from "./route"; 
export const bottomNavLink = [
  { icon: <AiOutlineHome />, label: "home", href: ROUTES?.HOME },
  { icon: <MdOutlineDashboard />, label: "category" },
  { icon: <LuCar />, label: "track order", href: ROUTES?.ORDERS },
  { icon: <AiOutlineShoppingCart />, label: "cart", href: ROUTES?.CART },
  { icon: <AiOutlineUser />, label: "user", href: ROUTES?.ACCOUNT },
];
