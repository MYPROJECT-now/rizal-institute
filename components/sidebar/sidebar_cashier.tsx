import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";

type Props = {
    className?: string;
};

export const Sidebar_cashier = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "flex-col h-full w-[300px] items-center pt-5 bg-lGreen lg:fixed left-0 top-0 px-4 border-r-2", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/cashier">
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
                        href="/cashier"
                        iconSrc="/dashboard.png" 
                    />

                    <SidebarItem 
                        label="Students" 
                        href="/cashier/students"
                        iconSrc="/student_logo.png" 
                    />

                    <SidebarItem 
                        label="Applicants" 
                        href="/cashier/enrollees"
                        iconSrc="/enrollment.png" 
                    />

                    <SidebarItem 
                        label="Reserved Slot" 
                        href="/cashier/reserved"
                        iconSrc="/reserved.png" 
                    />



            
                </div>
            </div>
                
        </div>
    );
};
