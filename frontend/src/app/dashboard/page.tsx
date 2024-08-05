"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { user, getCurrentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  return (
    <div>
      Dashboard Page
      {user?.name}
    </div>
  );
};

export default DashboardPage;
