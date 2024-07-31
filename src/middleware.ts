import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isAuthenticated } from "./helpers/authentication";

const bypassAuth = ["/api/auth/login", "/api/auth/register"];
export async function middleware(request: NextRequest) {
  const authStatus = await isAuthenticated(request);
  if (request.nextUrl.pathname.startsWith("/api")) {
    if (
      request.method !== "GET" &&
      !bypassAuth.includes(request.nextUrl.pathname)
    ) {
      if (!authStatus.status)
        return NextResponse.json(authStatus, { status: 401 });

      return NextResponse.next();
    }
  }
  if (request.nextUrl.pathname.startsWith("/posts/create")) {
    if (!authStatus.status) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
}
