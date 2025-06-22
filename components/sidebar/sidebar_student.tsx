import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";

type Props = {
    className?: string;
};

export const Sidebar_student = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-col h-screen w-[300px] items-center pt-5 bg-lGreen", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/student">
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
                    />

                    <SidebarItem 
                        label="Registration" 
                        href="/ACCOUNTS/student/reg_form"
                        iconSrc="/student_logo.png" 
                    />

                    <SidebarItem 
                        label="Payments" 
                        href="/ACCOUNTS/student/payments"
                        iconSrc="/payment.png" 
                    />



            
                </div>
            </div>
                
        </div>
    );
};
