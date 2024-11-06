"use client";

import { useState } from "react";
import AuthContext from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<{ email: string; token: string }>({
    email: "",
    token: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
