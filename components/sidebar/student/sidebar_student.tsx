"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "../sidebar_item";
import { AcademicYearModal } from "../utils/academicYearS";
import { useAcadModal } from "@/src/store/academicYear";
import { SidebarAcad } from "../utils/sidebar_item_admin";
import { COEModal } from "../utils/coe";
import { useCOE } from "@/src/store/student/coe";

type Props = {
    className?: string;
    onClose?: () => void;
};

export const Sidebar_student = ({ className, onClose }: Props) => {
    const { open } = useAcadModal();
    const { open: coeOpen } = useCOE();
    
    return (
        <div
            className={cn(
                "flex-col min-h-screen xl:w-[330px] lg:w-[250px] items-center pt-5 bg-lGreen left-0 top-0 px-4", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/student" onClick={onClose}>
                    <Image 
                        src="/school.png" 
                        width={1000}
                        height={1000} 
                        alt="PWD Icon"
                        className="sm:h-[130px] sm:w-[130px] h-[80px] w-[80px]"
                    />
                   
                </Link>

                <div className="flex flex-col gap-3 mt-[50px] cursor-pointer">
                    <SidebarItem 
                        label="Dashboard" 
                        href="/ACCOUNTS/student"
                        iconSrc="/dashboard.png"
                        onClick={onClose} 
                    />

                    {/* <SidebarItem 
                        label="COE" 
                        href="/ACCOUNTS/student/enrollment_cert"
                        iconSrc="/student_logo.png"
                        onClick={onClose}
                        
                    /> */}

                    <SidebarItem 
                        label="Payments" 
                        href="/ACCOUNTS/student/payments"
                        iconSrc="/payment.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Announcements" 
                        href="/ACCOUNTS/student/announcement"
                        iconSrc="/announcement.png"
                        onClick={onClose} 
                    />
                    
                    <COEModal />
                    <SidebarAcad 
                        label="COE"
                        iconSrc="/student_logo.png"
                        onClick={coeOpen} 
                    />

                    <AcademicYearModal />
                    <SidebarAcad 
                        label="Academic Year"
                        iconSrc="/calendar.png"
                        onClick={open} 
                    />

                </div>
            </div>
                
        </div>
    );
};
