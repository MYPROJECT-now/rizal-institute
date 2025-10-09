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

export const Sidebar_teacher = ({ className, onClose }: Props) => {
    const { open } = useAcadModal();
    
    return (
        <div
            className={cn(
                "flex-col min-h-screen w-[250px] items-center pt-5 bg-lGreen left-0 top-0 px-4", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/teacher" onClick={onClose}>
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
                        label="My Class" 
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
                     <SidebarItem 
                        label="My Schedule" 
                        href="/ACCOUNTS/teacher/mySched"
                        iconSrc="/sched.png"
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
