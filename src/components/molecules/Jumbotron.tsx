"use client";
import AuthContext from "@/lib/context/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";

const Jumbotron = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="hero bg-base-300 h-1/3">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">GetBlogs</h1>
          <p className="py-4">Everyone can write!</p>
          <Link
            className="btn btn-primary"
            href={authContext?.isLogin ? "post" : "/login"}
          >
            {authContext?.isLogin ? "Create a post" : "Get Started"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
