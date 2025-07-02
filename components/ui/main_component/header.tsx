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

export default Header;