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
                <Link href="/admin">
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
                        href="/admin"
                        iconSrc="/dashboard.png" 
                    />     

                    <SidebarItem 
                        label="Account" 
                        href="/admin/account"
                        iconSrc="/account.png" 
                    />     

                    <SidebarItem 
                        label="Users" 
                        href="/admin/Users"
                        iconSrc="/users.png" 
                    />   

                    <Fiscal_Year />
                    <SidebarItemAdmin 
                        label="Fiscal Year" 
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
