"use client";

import { cn } from "@/lib/utils";
import { useEnrollmentModal } from "@/src/store/ADMIN/enrollment";
import { useFiscalYearModal } from "@/src/store/ADMIN/fiscal_year";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "../sidebar_item";
import { Fiscal_Year } from "@/components/admin/modal/fiscalYear/fiscal_Year";
import { SidebarItemAdmin } from "./sidebar_item_admin";
import { EnrollmentManagement } from "@/components/admin/modal/enrollment_management/enrollment";


type Props = {
    className?: string;
};

export const Sidebar_admin = ({ className }: Props) => {
    const { open } = useFiscalYearModal();
    const {open: openEnrollment} = useEnrollmentModal();
    return (
        <div
            className={cn(
                "flex flex-col h-screen w-[300px] items-center pt-5 bg-lGreen", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/admin">
                    <Image 
                        src="/school.png" 
                        width={130}
                        height={130} 
                        alt="PWD Icon"
                    />
                   
                </Link>

                <div className="flex flex-col gap-3 mt-[50px] ">
                    <SidebarItem 
                        label="Dashboard" 
                        href="/ACCOUNTS/admin"
                        iconSrc="/dashboard.png" 
                    />     

                    <SidebarItem 
                        label="Account" 
                        href="/ACCOUNTS/admin/account"
                        iconSrc="/account.png" 
                    />     

                    <SidebarItem 
                        label="Users" 
                        href="/ACCOUNTS/admin/Users"
                        iconSrc="/users.png" 
                    />   

                    <Fiscal_Year />
                    <SidebarItemAdmin 
                        label="Academic Year" 
                        iconSrc="/calendar.png" 
                        onClick={open}
                    />     

                    <EnrollmentManagement />
                    <SidebarItemAdmin 
                        label="Enrollment" 
                        iconSrc="/book.png" 
                        onClick={openEnrollment}
                        
                    />     
                </div>

            </div>
                
        </div>
    );
};
