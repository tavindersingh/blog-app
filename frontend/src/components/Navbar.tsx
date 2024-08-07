"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect } from "react";
import UserProfileImage from "./UserProfileImage";

const Navbar = () => {
  const { user, setUser, logout, accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const fetchUser = async () => {
      const response = await fetch("/api/user/me");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data.user);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser, accessToken]);

  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="text-xl font-bold">
            Blog Sphere
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        {user ? (
          <div className="navbar-end">
            <div className="mr-2">Welcome, {user.name}</div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <UserProfileImage user={user} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1]  w-52 p-2 shadow"
              >
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="w-32 border py-2 rounded-full hover:bg-gray-100 duration-200 flex justify-center">
              <Link href="/login">Login</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
