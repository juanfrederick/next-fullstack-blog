import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authorization = await headers().get("user");
  return NextResponse.json(JSON.parse(authorization!));
}
