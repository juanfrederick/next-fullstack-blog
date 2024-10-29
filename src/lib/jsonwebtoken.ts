import jwt from "jsonwebtoken";
import * as jose from "jose";

const privateKey = process.env.PRIVATE_KEY;

export function signToken(data: { _id: string; email: string }) {
  if (!privateKey) {
    throw new Error("Something went wrong");
  }

  return jwt.sign(data, privateKey, { expiresIn: "3d" });
}

export async function verifyToken(token: string) {
  if (!privateKey) {
    throw new Error("Something went wrong");
  }

  const data = await jose.jwtVerify(
    token,
    new TextEncoder().encode(privateKey)
  );

  return data;
}
