// "use client";

import { Profile_cashier } from "../profile/profile_cashier";
// import { useUser } from "@clerk/nextjs";
// import { useEffect } from "react";

const Cashier_header = () => {
    // const { user } = useUser();

    // useEffect(() => {
    //     if (user) {
    //         console.log("User:", user);
    //     }
    // }, [user]);
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',   // Day of the week (e.g., Monday)
        year: 'numeric',   // Full year (e.g., 2024)
        month: 'long',     // Full month (e.g., October)
        day: 'numeric',     // Day of the month (e.g., 8)
      });
      

    return (
        <div className="flex flex-row items-center justify-between h-[60px] mt-12 sm:text-sm md:text-base lg:text-lg">
            <div className="flex flex-col">
               {/* <p className=" font-Alfa text-lGreen text-2xl">
                   RIZAL INSTITUTE
                </p> */}
                <p className="font-oswald text-sm lg:text-lg text-green-500">
                    {currentDate}
                </p>
            </div>
            <div className="flex flex-row items-center gap-6">
                <p className="font-Alfa text-lGreen text-sm lg:text-xl">
                    CASHIER
                </p>
                {/* <Image
                src="/profile.png"
                alt="profile"
                width={100}
                height={100}
                className="bg-blue-400 h-[40px] w-[40px] rounded-full object-fill"
                /> */}
                <Profile_cashier />
            </div>
        </div>
    );
};

export default Cashier_header;