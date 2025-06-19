// module header so it can be used in multiple pages
"use client";
import Image from "next/image";

import { Button } from "../button";
import { useState } from "react";
import { X, Menu } from "lucide-react";

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-dGreen text-white font-bold font-merriweather text-base lg:text-xl h-[90px] flex flex-row 
        justify-between px-[70px] items-center fixed w-full shadow-md z-50">    

            {/*bg-dGreen text-white font-bold font-merriweather text-base lg:text-xl h-[90px] w-max-full flex flex-row 
        justify-between px-[70px] items-center fixed w-full shadow-md p-4 z-50 */}


            <a href="\">
                <div className="flex flex-row items-center gap-4"> {/*flex flex-row items-center gap-4*/}
                    <Image 
                        src="/logo.png"
                        alt="pdao logo"
                        width={60}
                        height={60}
                        className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
                        />
                    <p className ="text-base gap-4 md:text-xl lg:text-3xl">
                        Rizal Institute <br></br>
                        <small className="hidden lg:block text-base">Canlubang Foundation Inc.</small>
                    </p>
                </div>
            </a>
            <div className="hidden lg:block lg:flex-row lg:items-center lg:gap-[100px] lg:pr-10"> {/*flex flex-row items-center gap-[100px] pr-10*/}
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

                
                    <a href="/portal2">
                    <button>
                         <Image 
                         src="portal.svg"
                         alt="portal logo" 
                         width={40}
                         height={40}
                         className="mx-5"
                         />
                    </button>
                    </a>

                    </div>
                    <button
                className="lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}>
                {menuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
                    {/* Mobile Nav */}
                {menuOpen && (
                    <div className="absolute top-[90px] left-0 w-full bg-dGreen flex flex-col items-center gap-4 py-4 shadow-lg">
                    <a href="\" onClick={() => setMenuOpen(false)}>
                        <Button variant="hButton">
                            HOME
                            </Button>
                    </a>
                    <a href="\about_page" onClick={() => setMenuOpen(false)}>
                        <Button variant="hButton">
                            ABOUT
                            </Button>
                    </a>
                    <a href="\admission_page" onClick={() => setMenuOpen(false)}>
                        <Button variant="hButton">
                            ADMISSION
                            </Button>
                    </a>
                    <a href="/portal2" onClick={() => setMenuOpen(false)}>
                        <button>
                        <Image src="portal.svg" 
                        alt="portal logo" 
                        width={40} 
                        height={40} />
                        </button>
                    </a>
                            
                    </div>
                )}
                    </div>
                    
                );
            };

export default Header;