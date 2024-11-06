"use client";
import { checkUser } from "@/lib/axios";
import AuthContext from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext?.isLogin) {
      const getUser = async () => {
        const response = await checkUser();

        if (response.status === "success") {
          const payload = response.payload;
          authContext?.setIsLogin(true);
          authContext?.setUser({ email: payload.email });
        } else {
          router.push("/login");
        }
      };

      getUser();
    }
  }, [authContext]);

  return <>{authContext?.isLogin && children}</>;
};

export default ProtectedRoute;
