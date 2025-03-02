// module header so it can be used in multiple pages
import Image from "next/image";

const Header = () => {
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
                </div>
        </div>
    );
}

export default Header;