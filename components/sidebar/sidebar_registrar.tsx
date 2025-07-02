"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";

type Props = {
    className?: string;
    onClose?: () => void;
};

export const Sidebar_registrar = ({ className, onClose }: Props) => {
    return (
        <div
            className={cn(
                "flex-col h-full w-[300px] items-center pt-5 bg-lGreen lg:fixed left-0 top-0 px-4", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/registrar" onClick={onClose}>
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
                        href="/ACCOUNTS/registrar"
                        iconSrc="/dashboard.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Students" 
                        href="/ACCOUNTS/registrar/students"
                        iconSrc="/student_logo.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Applicants" 
                        href="/ACCOUNTS/registrar/applicants"
                        iconSrc="/enrollment.png"
                        onClick={onClose}
                    />

                    <SidebarItem 
                        label="Admission" 
                        href="/ACCOUNTS/registrar/reserved"
                        iconSrc="/schoolLogo.png" 
                        onClick={onClose}
                    />

                    <SidebarItem 
                        label="Grades" 
                        href="/ACCOUNTS/registrar/grades"
                        iconSrc="/grades.png" 
                        onClick={onClose} 
                    />
                
            
                </div>
            </div>
                
        </div>
    );
};
