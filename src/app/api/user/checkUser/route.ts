import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authorization = await headers().get("user");

  return NextResponse.json({
    status: "success",
    payload: JSON.parse(authorization!),
  });
}
