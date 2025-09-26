"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "../sidebar_item";
import { SidebarAcad } from "../utils/sidebar_item_admin";
import { AcademicYearModal } from "../utils/academicYearA";
import { useAcadModal } from "@/src/store/academicYear";
import { Reports } from "@/components/accounts/registrar/reports/reports";
import { useReportModal } from "@/src/store/REGISTRAR/reports";

type Props = {
    className?: string;
    onClose?: () => void;
};

export const Sidebar_registrar = ({ className, onClose }: Props) => {
    const { open: openAcad } = useAcadModal();
    const { open: openReports } = useReportModal();

    return (
        <div
            className={cn(
                "flex-col min-h-screen xl:w-[330px] lg:w-[250px] items-center pt-5 bg-lGreen left-0 top-0 px-4", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/registrar" onClick={onClose}>
                    <Image 
                        src="/school.png" 
                        width={1000}
                        height={1000} 
                        alt="PWD Icon"
                        className="sm:h-[130px] sm:w-[130px] h-[110px] w-[110px]"
                    />
                   
                </Link>

                <div className="flex flex-col gap-3 sm:mt-[50px] mt-[30px] ">
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

                    <AcademicYearModal />
                    <SidebarAcad 
                        label="Academic Year"
                        iconSrc="/calendar.png"
                        onClick={openAcad} 
                    />

                    <Reports />
                    <SidebarAcad 
                        label="Report"
                        iconSrc="/report.png"
                        onClick={openReports} 
                    />
                
            
                </div>
            </div>
                
        </div>
    );
};
