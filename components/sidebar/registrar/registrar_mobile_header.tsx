import { MobileSidebar } from "./registrar_mobile_sidebar"
import Image from "next/image"
import Link from "next/link"
export const MobileHeader = () => {
    return (
        <nav className ="lg:hidden px-4 h-[60px] flex items-center border-b fixed top-0 w-full z-50 bg-lGreen">
            <MobileSidebar />
            <div className ="flex flex-row">
                <Link href="/ACCOUNTS/registrar">
                <Image 
                                        src="/school.png" 
                                        width={40}
                                        height={40} 
                                        alt="PWD Icon"
                                        className ="ml-5 h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto"
                                    />
                    </Link>
                <p className="text-white ml-5 mt-2 text-bold font-merriweather text-lg">Rizal Institute </p>
            </div>
        </nav>
    )
}