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
                "flex flex-col h-screen w-[300px] items-center pt-5 bg-lGreen", 
                className
            )}
        >
            
            <div className="gap-1 mx-auto flex flex-col items-center mt-[30px] ">
                <Link href="/ACCOUNTS/cashier">
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
                    />

                    <SidebarItem 
                        label="Students" 
                        href="/ACCOUNTS/cashier/students"
                        iconSrc="/student_logo.png" 
                    />

                    <SidebarItem 
                        label="Payment Approval" 
                        href="/ACCOUNTS/cashier/payment_Approval"
                        iconSrc="/payment_approval.png" 
                    />

                    <SidebarItem 
                        label="Applicants" 
                        href="/ACCOUNTS/cashier/applicants"
                        iconSrc="/enrollment.png" 
                    />

                    <SidebarItem 
                        label="Reserved Slot" 
                        href="/ACCOUNTS/cashier/reserved"
                        iconSrc="/reserved.png" 
                    />



            
                </div>
            </div>
                
        </div>
    );
};
