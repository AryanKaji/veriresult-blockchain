import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./src/lib/auth/jwt";
import { JwtPayload } from "./src/types/auth/jwt.types";

export function proxy(req: NextRequest) {
  if (["/student/login", "/student/register"].includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = verifyToken(token) as JwtPayload;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/teacher") && decoded.role !== "teacher") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/student") && decoded.role !== "student") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*"],
};
