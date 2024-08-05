"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleLogin}>
        <div className="flex flex-col border rounded p-4 space-y-5">
          <div>
            <h3 className="text-3xl font-bold">Login</h3>
            <p className="text-sm text-gray-500 mt-1">
              Enter your details to login
            </p>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border px-4 py-2 rounded-lg mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pb-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border px-4 py-2 rounded-lg mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex w-full">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg duration-200">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
