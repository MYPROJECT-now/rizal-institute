"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const RegistrarClientComponent = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'registrar') {
      redirect("/");
    }
  }, [isLoaded, user]);

  return <>{user?.publicMetadata?.role === 'registrar' && children}</>;
};

export default RegistrarClientComponent;
