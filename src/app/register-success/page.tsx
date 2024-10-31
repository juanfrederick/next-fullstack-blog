import Link from "next/link";
import React from "react";

export default function RegisterSuccesPage() {
  return (
    <section className="background-image h-screen flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl md:text-6xl font-bold">Register Succesfully</h1>
      <p className="text-xl">
        Click{" "}
        <Link href={"/login"} className="link link-primary">
          here
        </Link>{" "}
        to Login to your account!
      </p>
    </section>
  );
}
