// module header so it can be used in multiple pages
"use client";
import { 
    useUser,

} from "@clerk/nextjs";


import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {

    const { user, isSignedIn, isLoaded } = useUser(); 
    const router = useRouter();
    
    useEffect(() => {
        // Check if the user is signed in and user data is loaded
        if (isSignedIn && isLoaded) {
            // Assuming you have 'role' stored in publicMetadata of the user
            if (user?.publicMetadata?.role === 'admin') {
                router.push("/admin");
            } else if (user?.publicMetadata?.role === 'student') {
                router.push("/student");
            } else if (user?.publicMetadata?.role === 'cashier') {
                router.push("/cashier");
            } else if (user?.publicMetadata?.role === 'registrar') {
                router.push("/registrar");
            } else {
                router.push("/");
            }
        }
    }, [isSignedIn, isLoaded, user, router]);


    return (
        <div className="bg-lGreen text-white font-bold font-merriweather text-3xl h-[90px] w-max-full flex flex-row justify-between px-[70px] items-center">    
            <a href="\">
                <div className="flex flex-row items-center gap-4">
                    <Image 
                        src="/logo.png"
                        alt="pdao logo"
                        width={60}
                        height={60}
                        />
                    <p>
                        Rizal Institute 
                    </p>
                </div>
            </a>
            <div className="flex flex-row items-center gap-[100px] pr-10">
                <a href="\">
                    <p>
                        HOME
                    </p>
                </a>
                <a href="\about_page">
                    <p>
                        ABOUT
                    </p>
                </a>
                <a href="\admission_page">
                    <p>
                        ADMISSION
                    </p>
                </a>

                <div>
                    <a href="/portal2">
                    <button>
                        portal
                    </button>
                    </a>
                </div>
                
                </div>
        </div>
    );
}

export default Header;