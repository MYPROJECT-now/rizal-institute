import { Profile_student } from "@/components/profile/profile_student"
import { MobileSidebar } from "./student_mobile_sidebar"
import Link from "next/link"
export const MobileHeader = () => {
    return (
        <nav className ="lg:hidden px-8 py-3 flex flex-row items-center justify-between w-full bg-lGreen">
            <div className="flex flex-row items-center">
                
                <MobileSidebar />
                <div className ="flex flex-row">
                    <Link href="/ACCOUNTS/student">
                        <p className="text-white ml-5 mt-2 text-bold font-merriweather text-lg">Rizal Institute</p>
                    </Link>
                </div>
            </div>

            <div>
                <Profile_student />
            </div>

        </nav>
    )
}