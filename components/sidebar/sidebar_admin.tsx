import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";

type Props = {
    className?: string;
};

export const Sidebar_admin = ({ className }: Props) => {
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
                        href="/admin"
                        iconSrc="/dashboard.png" 
                    />     

                    <SidebarItem 
                        label="Account" 
                        href="/admin/account"
                        iconSrc="/dashboard.png" 
                    />     

                    <SidebarItem 
                        label="Users" 
                        href="/admin/Users"
                        iconSrc="/dashboard.png" 
                    />   

                    <SidebarItem 
                        label="Fiscal Year" 
                        href="/admin/Users"
                        iconSrc="/dashboard.png" 
                    />     

                    <SidebarItem 
                        label="Enrollment" 
                        href="/admin/Users"
                        iconSrc="/dashboard.png" 
                    />     
                </div>

            </div>
                
        </div>
    );
};
