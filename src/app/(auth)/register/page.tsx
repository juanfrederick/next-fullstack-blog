import AuthForm from "@/components/molecules/AuthForm";
import { userRegister } from "@/lib/axios";
import Link from "next/link";

export default function RegisterPage() {
  const submitHandler = async (
    email: string,
    password: string,
    username?: string
  ) => {
    "use server";

    return await userRegister(email, username!, password);
  };

  return (
    <section className="flex items-center justify-center h-screen flex-col gap-6">
      <h1 className="text-4xl font-bold text-secondary">Registration</h1>
      <AuthForm type="register" submitHandler={submitHandler} />
      <p>
        Already have an account?{" "}
        <Link href={"/login"} className="link link-primary">
          Login
        </Link>
      </p>
    </section>
  );
}
