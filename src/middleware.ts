import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const protectedRoutes = ["/dashboard"];
export const authRoutes = ["/login"];
export const publicRoutes = ["/"];

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get("vyllyToken")?.value;

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!userToken || new Date().getTime() > new Date(JSON.parse(userToken).expiredAt).getTime())
  ) {
    request.cookies.delete("vyllyToken");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("vyllyToken");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && userToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}