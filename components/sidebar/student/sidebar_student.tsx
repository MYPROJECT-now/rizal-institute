"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "../sidebar_item";
import { AcademicYearModal } from "../utils/academicYearS";
import { useAcadModal } from "@/src/store/academicYear";
import { SidebarAcad } from "../utils/sidebar_item_admin";

type Props = {
    className?: string;
    onClose?: () => void;
};

export const Sidebar_student = ({ className, onClose }: Props) => {
      const { open } = useAcadModal();
    
    return (
        <div
            className={cn(
                "flex flex-col h-screen w-[300px] items-center pt-5 bg-lGreen lg:fixed left-0 top-0 px-4 ", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/student" onClick={onClose}>
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
                        href="/ACCOUNTS/student"
                        iconSrc="/dashboard.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Registration" 
                        href="/ACCOUNTS/student/reg_form"
                        iconSrc="/student_logo.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Payments" 
                        href="/ACCOUNTS/student/payments"
                        iconSrc="/payment.png"
                        onClick={onClose} 
                    />

                    <AcademicYearModal />
                    <SidebarAcad 
                        label="Academic Year"
                        iconSrc="/acad.png"
                        onClick={open} 
                    />
            
                </div>
            </div>
                
        </div>
    );
};
