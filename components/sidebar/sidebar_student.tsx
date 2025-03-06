import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

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
                <Link href="/admin/dashboard_admin">
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
                        href="/student"
                        iconSrc="/dashboard.png" 
                    />

                    <SidebarItem 
                        label="Registration" 
                        href="/student/reg_form"
                        iconSrc="/student_logo.png" 
                    />

                    <SidebarItem 
                        label="Payments" 
                        href="/student/payments"
                        iconSrc="/payment.png" 
                    />

                    <SidebarItem 
                        label="Announcement" 
                        href="/student/announcement"
                        iconSrc="/notif.png" 
                    />

                    <SidebarItem 
                        label="Settings" 
                        href="/student/settings"
                        iconSrc="/settings.png" 
                    />

                    <SignOutButton>
                        <Button
                        variant="link"
                        size="sm">
                        Logout
                        </Button>
                    </SignOutButton>

            
                </div>
            </div>
                
        </div>
    );
};
