import { MobileSidebar } from "./student_mobile_sidebar"
import Image from "next/image"
export const MobileHeader = () => {
    return (
        <nav className ="lg:hidden px-4 h-[50px] flex items-center border-b fixed top-0 w-full z-50 bg-lGreen">
            <MobileSidebar />
            <div className ="flex flex-row">
                <Image 
                                        src="/school.png" 
                                        width={30}
                                        height={30} 
                                        alt="PWD Icon"
                                        className ="ml-5 fixed"
                                    />
                <p className="text-white ml-16 mt-2 md:text-xl text-bold font-merriweather">Rizal Institute Canlubang Foundation Inc.</p>
            </div>
        </nav>
    )
}