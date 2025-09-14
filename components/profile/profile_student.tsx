
"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export const Profile_student = () => {
  const { user } = useUser();

  useEffect(() => {
      if (user) {
          console.log("User:", user);
      }
  }, [user]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <div className="">
                    <Image
                       src={user?.imageUrl ?? '/profile.png'} 
                        alt="User Profile Picture"
                        width={15}
                        height={15}
                        className="rounded-full lg:w-[30px] lg:h-[30px] w-[25px] h-[25px]" // For circular profile picture
                    />
                    </div>
            
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/ACCOUNTS/student/settings">
                        Settings
                    </Link>
                    {/* <button>
                        <a href="/ACCOUNTS/student/settings">
                            Settings
                        </a>
                    </button> */}
                </DropdownMenuItem>
                <DropdownMenuItem>
                <SignOutButton
                    redirectUrl="/portal2"
                >
                    <button>
                        LOGOUT
                    </button>
                </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
