import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authorization = await headers().get("user");
  return NextResponse.json(JSON.parse(authorization!));
}
