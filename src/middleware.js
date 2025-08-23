// middleware.ts
const protectedRoutes = [
  "/cart",
  "/checkout",
  "/dashboard",
  "/profile",
  "/orders",
  "/payment-options" 
];
import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.cookies.get("bajar_token");
  const pathname = request.nextUrl.pathname; 
  const referer = request.headers.get("referer");
  const isAuthPage = pathname.startsWith("/auth"); 
  if (token && isAuthPage) {
    if (referer && !referer.includes("/auth")) {
      return NextResponse.redirect(new URL(referer));
    }
    return NextResponse.redirect(new URL("/", request.url));
  } 
  //  redirect area
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
