"use client";

import { useUser } from "@clerk/nextjs";
import { Profile_admin } from "../../components/profile/profile_admin";
import { useEffect } from "react";


const Admin_header = () => {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            console.log("User:", user);
        }
    }, [user]);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',   // Day of the week (e.g., Monday)
        year: 'numeric',   // Full year (e.g., 2024)
        month: 'long',     // Full month (e.g., October)
        day: 'numeric',     // Day of the month (e.g., 8)
      });
      

    return (
        <div className="lg:flex hidden flex-row items-center justify-between h-[60px] mt-10 lg:mt-4 px-5">
            <div className="flex flex-col">
                <p className=" font-Alfa text-lGreen text-2xl">
                    RIZAL INSTITUTE
                </p>
                <p className="font-mono text-xs text-green-500">
                    {currentDate}
                </p>
            </div>
            <div className="flex flex-row items-center gap-6">
                <p className="font-Alfa text-lGreen text-sm lg:text-xl capitalize">
                    {user?.fullName}
                </p>
                {/* <Image
                src="/profile.png"
                alt="profile"
                width={100}
                height={100}
                className="bg-blue-400 h-[40px] w-[40px] rounded-full object-fill"
                /> */}
                <Profile_admin />
            </div>
        </div>
    );
};

export default Admin_header;