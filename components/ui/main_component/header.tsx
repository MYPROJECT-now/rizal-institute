// module header so it can be used in multiple pages
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../button";

const Header = () => {



    return (
        <div className="bg-dGreen text-white font-bold font-merriweather text-3xl h-[90px] w-max-full flex flex-row justify-between px-[70px] items-center fixed w-full shadow-md p-4 z-50">    
            <a href="\">
                <div className="flex flex-row items-center gap-4">
                    <Image 
                        src="/logo.png"
                        alt="pdao logo"
                        width={60}
                        height={60}
                        />
                    <p className ="leading-none">
                        Rizal Institute <br></br>
                        <small className ="text-base leading-none">Canlubang Foundation Inc.</small>
                    </p>
                </div>
            </a>
            <div className="flex flex-row items-center gap-[100px] pr-10">
                <a href="\">
                    <Button variant="hButton">
                        HOME
                    </Button>
                </a>
                <a href="\about_page">
                    <Button variant ="hButton">
                        ABOUT
                    </Button>
                </a>
                <a href="\admission_page">
                    <Button variant="hButton">
                        ADMISSION
                    </Button>
                </a>

                <div>
                    <a href="/portal2">
                    <button>
                         <img src="portal.svg" className="h-10 w-10"/>
                    </button>
                    </a>
                </div>
                
                </div>
        </div>
    );
}

export default Header;