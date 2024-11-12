import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const authorization = await headers().get("user");

  return NextResponse.json({
    status: "success",
    payload: JSON.parse(authorization!),
  });
}
