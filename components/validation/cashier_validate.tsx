"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const CashierClientComponent = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'cashier') {
      redirect("/");
    }
  }, [isLoaded, user]);

  return <>{user?.publicMetadata?.role === 'cashier' && children}</>;
};

export default CashierClientComponent;
