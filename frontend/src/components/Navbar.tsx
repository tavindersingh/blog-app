"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect } from "react";

const Navbar = () => {
  const { user, setUser, logout } = useAuth();

  useEffect(() => {
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
  }, [user, setUser]);

  return (
    <div className="flex gap-4 w-screen h-16 shadow-lg items-center">
      <div className="flex container items-center mx-auto justify-between">
        <h1 className="text-3xl font-bold">BlogSphere</h1>
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
