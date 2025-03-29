"use client"; 

import Image from "next/image";
import { 
        SignedIn,
        SignedOut,
        UserButton,
        SignInButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useResetModal } from "@/store/reset_pass";
import { ResetPass } from "@/components/modals/reset_password/reset_pass";
   


export default function Home() {

  const { open } = useResetModal();

  return (
    <div className="w-full h-full ">
    <Image src="/bg_home10.jpg" fill alt="logo"/>
    <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center -mt-10 sm:-mt-4 mx-auto  gap-3">
    <div className="flex justify-center items-center h-screen">
        <div className="bg-white/25 border-2 border-white p-10 rounded-2xl shadow-lg w-96 text-center">
          <div className="mb-6">
            <Image 
              src="/school.png" 
              width={130}
              height={130} 
              alt="PWD Icon"
              className="mx-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back!!</h2>
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
          <p className="mt-4 text-black  cursor-pointer text-sm">Having trouble remembering your password?</p>
          <button onClick={open} className="underline">Reset Password</button>
          </div>
        </div>
    </div>
    </div>
  </div>
    
  );
}
