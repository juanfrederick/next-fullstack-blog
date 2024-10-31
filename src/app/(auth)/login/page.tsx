import AuthForm from "@/components/molecules/AuthForm";
import { userLogin } from "@/lib/axios";
import Link from "next/link";

export default function LoginPage() {
  const submitHandler = async (email: string, password: string) => {
    "use server";
    return await userLogin(email, password);
  };

  return (
    <section className="flex items-center justify-center h-screen flex-col gap-6">
      <h1 className="text-4xl font-bold text-secondary">Login</h1>
      <AuthForm type="login" submitHandler={submitHandler} />
      <p>
        Don't have an account?{" "}
        <Link href={"/register"} className="link link-primary">
          Register
        </Link>
      </p>
    </section>
  );
}
