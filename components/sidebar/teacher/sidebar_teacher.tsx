"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "../sidebar_item";


type Props = {
    className?: string;
    onClose?: () => void;
};

export const Sidebar_teacher = ({ className, onClose }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-col h-screen w-[300px] items-center pt-5 bg-lGreen lg:fixed left-0 top-0 px-4 ", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/teacher" onClick={onClose}>
                    <Image 
                        src="/school.png" 
                        width={130}
                        height={130} 
                        alt="PWD Icon"
                    />
                   
                </Link>

                <div className="flex flex-col gap-3 mt-[50px] ">
                    <SidebarItem 
                        label="My Classes" 
                        href="/ACCOUNTS/teacher"
                        iconSrc="/class.png"
                        onClick={onClose} 
                    />

                    <SidebarItem 
                        label="Input Grades" 
                        href="/ACCOUNTS/teacher/grade"
                        iconSrc="/grades.png"
                        onClick={onClose} 
                    />
            
                </div>
            </div>
                
        </div>
    );
};
