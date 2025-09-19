"use client";
import Image from "next/image";
import { Button } from "../button";
import { useState, useEffect } from "react";
import { X, Menu, LogIn } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="bg-gradient-to-t from-d2Green to-lGreen text-white font-bold font-merriweather text-base lg:text-xl lg:h-[90px] sm:h-[80px] h-[60px] flex items-center justify-between px-6 sticky top-0 w-full shadow-md z-50">
      {/* Logo + Title */}
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="rizal logo"
          width={60}
          height={60}
          className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
        />
        <span className="flex flex-col justify-center">
          <span className="text-base md:text-xl lg:text-3xl leading-tight">
            Rizal Institute
          </span>
          <small className="hidden lg:block text-base leading-none">
            Canlubang Foundation Inc.
          </small>
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center xl:gap-[60px] pr-10">
        <Link href="/"><Button variant="hButton">HOME</Button></Link>
        <Link href="/about_page"><Button variant="hButton">ABOUT</Button></Link>
        <Link href="/admission_page"><Button variant="hButton">ADMISSION</Button></Link>
        <Link href="/portal2"><LogIn className="w-8 h-8 text-white" /></Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex items-center justify-center"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Nav Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 h-[300px] flex flex-col bg-dGreen text-white animate-fade-in">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={32} className="sm:w-[32px] sm:h-[32px] w-[20px] h-[20px]" />
          </button>

          {/* Links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-4">
            <Button variant="hButton">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                    <span className="sm:text-2xl text-xl">HOME</span>
                </Link>
            </Button>
            <Button variant="hButton">
                <Link href="/about_page" onClick={() => setMenuOpen(false)}>
                    <span className="sm:text-2xl text-xl">ABOUT</span>
                </Link>
            </Button>
            <Button variant="hButton">
                <Link href="/admission_page" onClick={() => setMenuOpen(false)}>
                    <span className="sm:text-2xl text-xl">ADMISSION</span>
                </Link>
            </Button>
            <Link href="/portal2" onClick={() => setMenuOpen(false)}>
                <LogIn size={32} className="w-[25px] h-[25px]" />
            </Link>

            {/* <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="text-2xl">HOME</span>
            </Link>
            <Link href="/about_page" onClick={() => setMenuOpen(false)}>
              <span className="text-2xl">ABOUT</span>
            </Link>
            <Link href="/admission_page" onClick={() => setMenuOpen(false)}>
              <span className="text-2xl">ADMISSION</span>
            </Link>
            <Link href="/portal2" onClick={() => setMenuOpen(false)}>
              <LogIn className="w-6 h-6" />
            </Link> */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
