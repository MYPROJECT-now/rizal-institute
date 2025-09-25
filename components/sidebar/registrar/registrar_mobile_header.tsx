import { Profile_registrar } from "@/components/profile/profile_registrar"
import { MobileSidebar } from "./registrar_mobile_sidebar"

import Link from "next/link"
export const MobileHeader = () => {
    return (
        <nav className ="lg:hidden px-4 pt-3 flex items-center justify-between w-full bg-lGreen">
            <div className="flex flex-row items-center">
                <MobileSidebar />
                <div className ="flex flex-row">
                    {/* <Link href="/ACCOUNTS/registrar">
                    <Image 
                        src="/school.png" 
                        width={1000}
                        height={1000} 
                        alt="PWD Icon"
                        className ="sm:h-[40px] sm:w-[40px] h-[30px] w-[30px] lg:block hidden"
                    />
                    </Link> */}
                    <Link href="/ACCOUNTS/registrar">
                        <p className="text-white ml-5 mt-2 text-bold font-merriweather text-lg">Rizal Institute</p>
                    </Link>
                </div>
            </div>
            <div>
                <Profile_registrar />
            </div>
        </nav>
    )
}