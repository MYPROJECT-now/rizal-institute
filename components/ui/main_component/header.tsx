// module header so it can be used in multiple pages
"use client";
import Image from "next/image";

import { Button } from "../button";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { LogIn } from "lucide-react";
import Link from "next/link";

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
<<<<<<< HEAD
        <div className="bg-dGreen text-white font-bold font-merriweather text-base lg:text-xl h-[90px]  flex flex-row 
        justify-between px-[50px] items-center fixed w-full shadow-md z-50">    

            <a href="\">
                <div className="flex flex-row items-center gap-4"> 
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
            <div className="hidden lg:block lg:flex-row lg:items-center lg:gap-[100px] lg:pr-10"> 
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
                         src="/portal.png"
                         alt="portal" 
                         width={40}
                         height={40}
                         className="mx-5"
                         />
                    </button>
                    </a>

                    </div>

            <button className="lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}>
                {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
                    {/* Mobile Nav */}
                {menuOpen && (
                    <div className="absolute top-[90px] left-0 w-full bg-dGreen flex flex-col items-center gap-4 py-4 shadow-lg">
                    <a href="\" onClick={() => setMenuOpen(false)}>
                        <Button variant="hButton" className="text-2xl">
                            HOME
                            </Button>
                    </a>
                    <a href="\about_page" onClick={() => setMenuOpen(false)}>
                        <Button variant="hButton" className="text-2xl">
                            ABOUT
                            </Button>
                    </a>
                    <a href="\admission_page" onClick={() => setMenuOpen(false)}>
                        <Button variant="hButton" className="text-2xl">
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
=======
        <header className="bg-gradient-to-t from-d2Green to-lGreen text-white font-bold font-merriweather text-base lg:text-xl h-[90px] flex items-center justify-between px-6 lg:px-[70px] fixed w-full shadow-md z-50">
            <Link href="/"  className="flex items-center gap-4">

                <Image 
                    src="/logo.png"
                    alt="pdao logo"
                    width={60}
                    height={60}
                    className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
                />
                <span className="flex flex-col justify-center">
                    <span className="text-base md:text-xl lg:text-3xl leading-tight">
                        Rizal Institute
                    </span>
                    <small className="hidden lg:block text-base leading-none">Canlubang Foundation Inc.</small>
                </span>
            </Link>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-[60px] pr-10">
                <Link href="/">
                    <Button variant="hButton">HOME</Button>
                </Link>
                <Link href="/about_page">
                    <Button variant="hButton">ABOUT</Button>
                </Link>
                <Link href="/admission_page">
                    <Button variant="hButton">ADMISSION</Button>
                </Link>
                <Link href="/portal2">
                    <LogIn className="w-8 h-8 text-white" />
                </Link>
            </nav>
            {/* Mobile Menu Button */}
            <button className="lg:hidden flex items-center justify-center" onClick={() => setMenuOpen((prev) => !prev)}>
                {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
            {/* Mobile Nav */}
            {menuOpen && (
                <div className="absolute top-[90px] left-0 w-full bg-dGreen flex flex-col items-center gap-4 py-6 shadow-lg z-50 animate-fade-in">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="w-full flex justify-center">
                        <Button variant="hButton" className="text-2xl w-full">HOME</Button>
                    </Link>
                    <Link href="/about_page" onClick={() => setMenuOpen(false)} className="w-full flex justify-center">
                        <Button variant="hButton" className="text-2xl w-full">ABOUT</Button>
                    </Link>
                    <Link href="/admission_page" onClick={() => setMenuOpen(false)} className="w-full flex justify-center">
                        <Button variant="hButton" className="text-2xl w-full">ADMISSION</Button>
                    </Link>
                    <Link href="/portal2" onClick={() => setMenuOpen(false)} className="w-full flex justify-center">
                        <LogIn className="w-6 h-6 text-white" />
                    </Link>
                </div>
            )}
        </header>
    );
};
>>>>>>> 69fa2d4498f24bef8e4bb818cf37c25028ffe2c1

export default Header;