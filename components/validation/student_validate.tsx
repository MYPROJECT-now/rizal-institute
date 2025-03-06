"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const StudentClientComponent = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'student') {
      redirect("/");
    }
  }, [isLoaded, user]);

  return <>{user?.publicMetadata?.role === 'student' && children}</>;
};

export default StudentClientComponent;
