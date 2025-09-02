"use client";

import { cn } from "@/lib/utils";
import { useEnrollmentModal } from "@/src/store/ADMIN/enrollment";
import { useFiscalYearModal } from "@/src/store/ADMIN/fiscal_year";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "../sidebar_item";
import { Fiscal_Year } from "@/components/accounts/admin/modal/fiscalYear/fiscal_Year";
import { SidebarItemAdmin } from "./sidebar_item_admin";
import { EnrollmentManagement } from "@/components/accounts/admin/modal/enrollment_management/enrollment";
// import { useEnrollmentModal } from "@/src/store/ADMIN/enrollment";
// import { useFiscalYearModal } from "@/src/store/ADMIN/fiscal_year";
// import Image from "next/image";
// import Link from "next/link";
// import { SidebarItem } from "../sidebar_item";
// import { Fiscal_Year } from "@/components/admin/modal/fiscalYear/fiscal_Year";
// import { SidebarItemAdmin } from "./sidebar_item_admin";
// import { useFiscalYearModal } from "@/src/store/admin/fiscal_year";
// import { Fiscal_Year } from "../admin/modal/fiscalYear/fiscal_Year";
// import { useEnrollmentModal } from "@/src/store/admin/enrollment";
// import { EnrollmentManagement } from "../admin/modal/enrollment_management/enrollment";
// import React, { useState } from "react";



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
          "flex-col min-h-screen xl:w-[330px] lg:w-[250px] items-center pt-5 bg-lGreen left-0 top-0 px-4", 
          className
        )}
      >
        <div className="gap-1 mx-auto flex flex-col items-center mt-[30px]">
          <Link href="/ACCOUNTS/admin" onClick={onClose}>
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
              href="/ACCOUNTS/admin"
              iconSrc="/dashboard.png"
              onClick={onClose} 
              
            />

            <SidebarItem
              label="Account"
              href="/ACCOUNTS/admin/account"
              iconSrc="/account.png"
              onClick={onClose}
            />

            <SidebarItem
              label="Users"
              href="/ACCOUNTS/admin/Users"
              iconSrc="/users.png"
              onClick={onClose}
            />

            <SidebarItem
              label="Assign Class"
              href="/ACCOUNTS/admin/teacher"
              iconSrc="/role.png"
              onClick={onClose}
            />

            <SidebarItem
              label="Audit Trails"
              href="/ACCOUNTS/admin/audit"
              iconSrc="/audit.png"
              onClick={onClose}
            />

            <Fiscal_Year />
            <SidebarItemAdmin
              label="Set Academic Year"
              iconSrc="/calendar.png"
              onClick={() => {
                open();
                onClose?.();
              }}
            />


            {/* <AcademicYearModal />
              <SidebarAcad
                label="Academic Year"
                iconSrc="/acad.png"
                onClick={openAcad} 
            /> */}

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