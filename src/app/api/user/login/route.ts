import { UserDbType, UserLoginBody } from "@/interface/interface";
import connectDb from "@/lib/db";
import UserModel from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jsonwebtoken";

export async function POST(reqeust: NextRequest) {
  try {
    await connectDb();
    const body: UserLoginBody = await reqeust.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Missing Parameters!");
    }

    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new Error("Email isn't valid!");
    }

    const userData: UserDbType | null = await UserModel.findOne({ email });

    if (!userData) {
      throw new Error("User not found!");
    }

    const passwordValid = await bcrypt.compare(password, userData.password);

    if (!passwordValid) {
      throw new Error("Incorrect Password!");
    }

    const { _id } = userData;
    const data = { _id, email };

    const jwtoken = signToken(data);

    return NextResponse.json({
      status: "success",
      msg: "Login success!",
      payload: { token: jwtoken, email: email },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failed", msg: error.message },
      { status: 400 }
    );
  }
}
