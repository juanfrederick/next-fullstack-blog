"use client";
import AuthContext from "@/lib/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    authContext?.setIsLogin(false);
    authContext?.setUser({ email: "" });
  };

  const handlePost = () => {
    router.push("/post");
  };

  return (
    <div className="navbar bg-base-300 md:px-20">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">GetBlogs</a>
      </div>
      {authContext?.isLogin ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="px-2 py-4" onClick={handlePost}>
                  My Post
                </a>
              </li>
              <li>
                <a className="px-2 py-4" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link className="btn btn-sm btn-primary" href={"/login"}>
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
