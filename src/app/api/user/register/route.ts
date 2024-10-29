import { User } from "@/interface/interface";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/userModel";
import validator from "validator";
import bcrypt from "bcrypt";
import connectDb from "@/lib/db";

const salt = process.env.PASSWORD_SALT;

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const body: User = await request.json();
    const { email, username, password } = body;

    if (!email || !username || !password) {
      throw new Error("Missing Parameters!");
    }

    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new Error("Email isn't valid!");
    }

    const emailavailability = await UserModel.find({ email }).exec();
    const usernameAvailability = await UserModel.find({ username }).exec();

    console.log(emailavailability[0]._id.toString());

    if (emailavailability.length > 0) {
      throw new Error("Email used!");
    }

    if (usernameAvailability.length > 0) {
      throw new Error("Username used!");
    }

    const isStrongPassword = validator.isStrongPassword(password);

    if (!isStrongPassword) {
      throw new Error("Password not strong!");
    }

    if (!salt) {
      throw new Error("Something went wrong!");
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    return NextResponse.json("Masuk");
  } catch (error: any) {
    return NextResponse.json(
      { status: "failed", msg: error.message },
      { status: 400 }
    );
  }
}
