import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";
import { SignOutButton} from "@clerk/nextjs";
import { Button } from "../ui/button";

type Props = {
    className?: string;
};

export const Sidebar_registrar = ({ className }: Props) => {
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
                        href="/registrar"
                        iconSrc="/dashboard.png" 
                    />

                    <SidebarItem 
                        label="Students" 
                        href="/registrar/students"
                        iconSrc="/student_logo.png" 
                    />

                    <SidebarItem 
                        label="Enrollees" 
                        href="/registrar/enrollees"
                        iconSrc="/enrollment.png" 
                    />

                    <SidebarItem 
                        label="Admin Settings" 
                        href="/admin/settings"
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
