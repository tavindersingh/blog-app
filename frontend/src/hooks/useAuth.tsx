"use client";

import client from "@/app/helpers/api";
import { TokenResponse } from "@/models/TokenResponse";
import { User } from "@/models/User";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  accessToken: string | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<TokenResponse>;
  logout: () => void;
  user?: User;
  setUser: (user?: User) => void;
  getCurrentUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const [token, setToken] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      console.log("Fetching token");
      const response = await fetch("/api/auth/token");
      const data = await response.json();

      if (data.token) {
        setToken(data.token);

        client.defaults.headers.common = {
          Authorization: `Bearer ${data.token}`,
        };
      } else {
        router.push("/login");
      }
    };
    fetchToken();
  }, []);

  const login = async (email: string, password: string) => {
    const tokenResponse = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const body = await tokenResponse.json();

    if (tokenResponse.ok) {
      setToken(body.accessToken);
      return true;
    } else {
      // alert("Invalid credentials");
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await client.post<TokenResponse>("/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  };

  const getCurrentUser = async () => {
    const response = await fetch("/api/user/me");
    const data = await response.json();
    setUser(data.user);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(undefined);
    setToken(undefined);

    router.push("/login");
  };

  const value = {
    accessToken: token,
    login,
    signup,
    logout,
    getCurrentUser,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
