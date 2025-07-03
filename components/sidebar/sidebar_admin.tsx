"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";
import { SidebarItemAdmin } from "./sidebar_item_admin";
import { useFiscalYearModal } from "@/src/store/admin/fiscal_year";
import { Fiscal_Year } from "../admin/modal/fiscalYear/fiscal_Year";
import { useEnrollmentModal } from "@/src/store/admin/enrollment";
import { EnrollmentManagement } from "../admin/modal/enrollment_management/enrollment";
import React, { useState } from "react";



type Props = {
  className?: string;
  onClose?: () => void;
};

export const Sidebar_admin = ({ className, onClose}: Props) => {
  const { open } = useFiscalYearModal();
  const { open: openEnrollment } = useEnrollmentModal();

  return (

      <div
        className={cn(
          "flex-col h-full w-[300px] items-center pt-5 bg-lGreen lg:fixed left-0 top-0 px-4 border-r-2 ",
          className
        )}
      >
        <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] cursor-pointer">
          <Link href="/admin" onClick={onClose}>
            <Image
              src="/school.png"
              width={130}
              height={130}
              alt="PWD Icon"
            />
          </Link>

          <div className="flex flex-col gap-3 mt-[50px] cursor-pointer">
            <SidebarItem
              label="Dashboard"
              href="/admin"
              iconSrc="/dashboard.png"
              onClick={onClose} 
              
            />

            <SidebarItem
              label="Account"
              href="/admin/account"
              iconSrc="/account.png"
              onClick={onClose}
            />

            <SidebarItem
              label="Users"
              href="/admin/Users"
              iconSrc="/users.png"
              onClick={onClose}
            />

            <Fiscal_Year />
            <SidebarItemAdmin
              label="Fiscal Year"
              iconSrc="/calendar.png"
              onClick={() => {
                open();
                onClose?.();
              }}
            />

            <EnrollmentManagement />
            <SidebarItemAdmin
              label="Enrollment"
              iconSrc="/book.png"
              onClick={() => {
                openEnrollment();
                onClose?.();
              }}
            />
          </div>
        </div>
      </div>
  );
};



//${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//          transition-transform duration-300 ease-in-out z-40
//          lg:translate-x-0 lg:static lg:w-[250px]