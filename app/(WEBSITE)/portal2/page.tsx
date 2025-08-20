"use client"; 

import Image from "next/image";
import { 
        SignedIn,
        SignedOut,
        UserButton,
        SignInButton,
        useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useResetPasswordModal } from "@/src/store/LANDING_PAGE/landing_page";
import { ResetPass } from "@/components/landing_page/landing_page_portal/reset_pass/reset_pass";


export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser(); 
  const router = useRouter();
  
  useEffect(() => {
      // Check if the user is signed in and user data is loaded
      if (isSignedIn && isLoaded) {
          // Assuming you have 'role' stored in publicMetadata of the user
          if (user?.publicMetadata?.role === 'admin') {
              router.push("/ACCOUNTS/admin");
          } else if (user?.publicMetadata?.role === 'student') {
              router.push("/ACCOUNTS/student");
          } else if (user?.publicMetadata?.role === 'cashier') {
              router.push("/ACCOUNTS/cashier");
          } else if (user?.publicMetadata?.role === 'registrar') {
              router.push("/ACCOUNTS/registrar");
          } else if (user?.publicMetadata?.role === 'teacher') {
            router.push("/ACCOUNTS/teacher");
          } else {
              router.push("/");
          }
      }
  }, [isSignedIn, isLoaded, user, router]);

  const { open } = useResetPasswordModal();

  return (
    <div className="w-full h-full ">
    <Image src="/bg_home10.jpg" fill alt="logo"/>
    <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center  gap-3">

      <div className=" flex justify-center items-center h-screen">
          <div className="bg-white/30 border-2 border-white p-10 rounded-2xl shadow-lg  text-center">
            <div className="sm:mb-6 mb-2 flex flex-row relative">
              <div className="absolute top-[-20px] left-[-20px]  z-10 flex flex-row gap-2 items-center">
                <Link href="/">
                  <Image 
                  src="/back.png"
                  width={1000}
                  height={1000} 
                  alt="back"
                  className="sm:w-[40px] sm:h-[40px] w-[30px] h-[30px]"
                  />
                </Link>

              </div>
              <Image 
                src="/school.png" 
                width={1000}
                height={1000}
                alt="PWD Icon"
                className="lg:w-[130px] lg:h-[130px] sm:w-[80px] sm:h-[80px] w-[70px] h-[70px] mx-auto"
              />
            </div>
            <h2 className="lg:text-2xl sm:text-xl font-bold text-white mb-6">Welcome to Rizal Institute</h2>
            <div className="flex justify-center mb-4">
              <SignedIn >
                <UserButton
                  afterSignOutUrl="/"
                />
              </SignedIn>
              <SignedOut>
                <SignInButton 
                  mode="modal"
                  
                >
                  <Button 
                    variant={"mainButton" } 
                    className="sm:rounded-xl rounded-lg lg:px-9 lg:py-4 sm:px-5 sm:py-2 px-3 py-1 sm:text-sm text-[10px] "
                   >
                    Log In to Your Account
                  </Button>
                </SignInButton>
              </SignedOut> 
            </div> 
            <div className="mt-10">
            <ResetPass />
            <p className="mt-4 text-d2Green  cursor-pointer lg:text-sm sm:text-xs text-[10px]">Having trouble remembering your password?</p>
            <button onClick={open} className="underline text-d2Green lg:text-sm sm:text-xs text-[10px]">Reset Password</button>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}
