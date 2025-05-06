"use client"; 

import Image from "next/image";
import { 
        SignedIn,
        SignedOut,
        UserButton,
        SignInButton,
        useUser
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useResetModal } from "@/src/store/reset_pass";
import { ResetPass } from "@/components/landing_page_portal/reset_pass/reset_pass";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";


export default function Home() {
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
          } else if (user?.publicMetadata?.role === 'teacher') {
            router.push("/teacher");
          } else {
              router.push("/");
          }
      }
  }, [isSignedIn, isLoaded, user, router]);

  const { open } = useResetModal();

  return (
    <div className="w-full h-full ">
    <Image src="/bg_home10.jpg" fill alt="logo"/>
    <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center -mt-10 sm:-mt-4 mx-auto  gap-3">
      <div className="flex justify-center items-center h-screen">
          <div className="bg-white/30 border-2 border-white p-10 rounded-2xl shadow-lg w-96 text-center">
            <div className="mb-6 flex flex-row relative">
              <div className="absolute top-[-20px] left-[-20px]  z-10 flex flex-row gap-2 items-center">
                <Link href="/">
                  <Image 
                  src="/back.png"
                  width={40}
                  height={40} 
                  alt="back"
                  />
                </Link>

              </div>
              <Image 
                src="/school.png" 
                width={130}
                height={130} 
                alt="PWD Icon"
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">Welcome to Rizal Institute</h2>
            <div className="flex justify-center mb-4">
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                />
              </SignedIn>
              <SignedOut>
                <SignInButton 
                  mode="modal"
                  
                >
                  <Button variant={"mButton" } size={"lg"} >
                    Log In to Your Account
                  </Button>
                </SignInButton>
              </SignedOut> 
            </div> 
            <div className="mt-10">
            <ResetPass />
            <p className="mt-4 text-d2Green  cursor-pointer text-sm">Having trouble remembering your password?</p>
            <button onClick={open} className="underline text-d2Green">Reset Password</button>
            </div>
          </div>
      </div>
    </div>
  </div>
    
  );
}
