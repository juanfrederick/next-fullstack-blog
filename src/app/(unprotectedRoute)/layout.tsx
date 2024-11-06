"use client";
import { checkUser } from "@/lib/axios";
import AuthContext from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import LoadingPage from "./loading";

export default function UnprotectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authContext?.isLogin) {
      const getUser = async () => {
        const response = await checkUser();

        if (response.status === "success") {
          const payload = response.payload;
          authContext?.setIsLogin(true);
          authContext?.setUser({ email: payload.email });
          router.push("/");
        } else {
          setIsLoading(false);
        }
      };

      getUser();
    } else {
      router.push("/");
    }
  }, [authContext]);

  if (isLoading) return <LoadingPage />;

  return <>{!authContext?.isLogin && children}</>;
}
