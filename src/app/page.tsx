"use client";
import Jumbotron from "@/components/molecules/Jumbotron";
import Navbar from "@/components/molecules/Navbar";
import { checkUser } from "@/lib/axios";
import AuthContext from "@/lib/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function Home() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (!authContext?.isLogin) {
      const getUser = async () => {
        const response = await checkUser();

        if (response.status === "success") {
          const payload = response.payload;
          authContext?.setIsLogin(true);
          authContext?.setUser({ email: payload.email });
        }
      };

      getUser();
    }
  }, [authContext]);

  return (
    <main className="h-screen">
      <Navbar />
      <Jumbotron />
    </main>
  );
}
