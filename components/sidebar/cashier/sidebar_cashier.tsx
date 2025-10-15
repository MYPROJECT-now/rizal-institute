"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "../sidebar_item";
import { AcademicYearModal } from "../utils/academicYearA";
import { SidebarAcad } from "../utils/sidebar_item_admin";
import { useAcadModal } from "@/src/store/academicYear";

type Props = {
    className?: string;
    onClose?: () => void;
};

export const Sidebar_cashier = ({ className, onClose }: Props) => {
    const { open } = useAcadModal();

    return (
        <div
            className={cn(
                "flex-col min-h-screen w-[250px] items-center pt-5 bg-lGreen left-0 top-0 px-4", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/cashier" onClick={onClose}>
                    <Image 
                        src="/school.png" 
                        width={1000}
                        height={1000} 
                        alt="rizal logo"
                        className="sm:h-[120px] sm:w-[120px] h-[110px] w-[110px]"
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
                        label="Monthly Pay" 
                        href="/ACCOUNTS/cashier/payment_Approval"
                        iconSrc="/reserved.png" 
                        onClick={onClose}
                    />

                    <SidebarItem 
                        label="Full Payments" 
                        href="/ACCOUNTS/cashier/full"
                        iconSrc="/money.png" 
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
                        iconSrc="/lock.png" 
                        onClick={onClose}
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
