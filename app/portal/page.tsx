"use client";
import { Button } from "@/components/ui/button";
import { 
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
    useUser,

} from "@clerk/nextjs";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Portal = () => {

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
        <div className="flex flex-row  min-h-screen w-full] ">
            <div className="w-1/2 p-8 h-full    ">
                <Image
                src="/bg_home10.jpg"
                alt="logo"
                width={1000}
                height={1000}
                className="h-full w-full object-cover rounded-2xl"
                />
            </div>

            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Rizal Institute</h2>
                <div>
                    <SignedIn>
                        <UserButton
                        afterSignOutUrl="/"
                        />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton 
                        mode="modal"
                        >
                            <Button variant={"mButton"} className="w-[150px] h-10 rounded-lg"> 
                            Log In
                            </Button>
                        </SignInButton>
                    </SignedOut> 
                </div> 
                <p className="mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-sm">Forgot Password?</p>
                </div>
            </div>
    </div>
    );
};

export default Portal;