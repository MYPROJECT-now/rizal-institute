"use client";

import { useUser } from "@clerk/nextjs";
import { Profile_registrar } from "../../components/profile/profile_registrar";
import { useEffect } from "react";

const Registrar_header = () => {
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
                <p className=" font-Alfa text-lGreen text-base lg:text-2xl">
                    RIZAL INSTITUTE
                </p>
                <p className="font-mono text-xs text-green-500">
                    {currentDate}
                </p>
            </div>
            <div className="flex flex-row items-center gap-3">
                <p className="font-Alfa text-lGreen text-sm lg:text-xl capitalize">
                    {user?.fullName}
                </p>
                <Profile_registrar />
            </div>
        </div>
    );
};

export default Registrar_header;