import { Profile_admin } from "@/components/profile/profile_admin"
import { MobileSidebar } from "./admin_mobile_sidebar"
import Link from "next/link"

export const MobileHeader = () => {
    

    return (
        <nav className ="lg:hidden px-4 py-3 flex items-center justify-between w-full bg-lGreen">
            <div className="flex flex-row items-center">
            <MobileSidebar/>
            <div className ="flex flex-row">
                {/* <Link href="/ACCOUNTS/admin">
                <Image 
                                        src="/school.png" 
                                        width={40}
                                        height={40} 
                                        alt="PWD Icon"
                                        className ="ml-5 h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto"
                                    />
                    </Link> */}
                    <Link href="/ACCOUNTS/admin">
                        <p className="text-white ml-5 mt-2 text-bold font-merriweather text-lg">Rizal Institute</p>
                    </Link>
                {/* <p className="text-white ml-5 mt-2 text-bold font-merriweather">Rizal Institute</p> */}
            </div>
            </div>
            <div>
                <Profile_admin />
            </div>
        </nav>
    )
}

// ml-5 fixed min-w-fit