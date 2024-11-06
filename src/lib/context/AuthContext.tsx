"use client";
import { createContext, Dispatch, SetStateAction } from "react";

type TContext = {
  user: {
    email: string;
  };
  setUser: Dispatch<SetStateAction<{ email: string }>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<TContext | undefined>(undefined);

export default AuthContext;
