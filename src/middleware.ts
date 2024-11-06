import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jsonwebtoken";

export async function middleware(request: NextRequest) {
  try {
    const authorization = (await headers()).get("authorization");

    if (!authorization) {
      return NextResponse.json(
        { status: "failed", msg: "Need Authentication" },
        { status: 401 }
      );
    }

    const token = authorization.split(" ")[1];

    const data = await verifyToken(token);

    const { _id, email } = data.payload;

    const requestHeaders = new Headers(request.headers);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set("user", JSON.stringify({ _id, email }));

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { status: "failed", msg: error.message },
      { status: 401 }
    );
    // return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/api/test/:path*", "/api/user/checkUser"],
};
