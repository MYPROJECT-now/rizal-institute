"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";

type Props = {
    className?: string;
    onClose?: () => void;
};

export const Sidebar_cashier = ({ className, onClose }: Props) => {
    return (
        <div
            className={cn(
                "flex-col h-full w-[300px] items-center pt-5 bg-lGreen lg:fixed left-0 top-0 px-4 ", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/cashier" onClick={onClose}>
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
                        href="/ACCOUNTS/cashier"
                        iconSrc="/dashboard.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Students" 
                        href="/ACCOUNTS/cashier/students"
                        iconSrc="/student_logo.png" 
                        onClick={onClose}
                    />

                    <SidebarItem 
                        label="Applicants" 
                        href="/ACCOUNTS/cashier/applicants"
                        iconSrc="/enrollment.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Reserved Slot" 
                        href="/ACCOUNTS/cashier/reserved"
                        iconSrc="/reserved.png" 
                        onClick={onClose}
                    />
            
                </div>
            </div>
                
        </div>
    );
};
