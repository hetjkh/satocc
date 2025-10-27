"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages } from "lucide-react";
import { ModeToggle } from "../toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    // Hide navbar on admin pages
    if (pathname?.startsWith('/admin')) {
      return;
    }
    const ctx = gsap.context(() => {
      // Set initial visibility to ensure elements are visible
      gsap.set([navRef.current, logoRef.current, menuRef.current, buttonsRef.current], { clearProps: "all" });

      // Navbar slide down animation - faster
      if (navRef.current) {
        gsap.fromTo(navRef.current, 
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );
      }

      // Logo fade in - faster
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.4, delay: 0.15, ease: "power2.out" }
        );
      }

      // Menu items stagger - faster
      if (menuRef.current && menuRef.current.children) {
        gsap.fromTo(menuRef.current.children,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, delay: 0.25, ease: "power2.out" }
        );
      }

      // Buttons animation - faster
      if (buttonsRef.current && buttonsRef.current.children) {
        gsap.fromTo(buttonsRef.current.children,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, delay: 0.35, ease: "back.out(1.7)" }
        );
      }
    });

    return () => ctx.revert();
  }, [pathname]);

  // Hide navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav ref={navRef} className="w-full h-20 fixed top-0 left-0 z-50 bg-gradient-to-b from-black/70 to-transparent">
      <div className="max-w-7xl bg-transparent mx-auto flex items-center justify-between py-2">
        {/* Logo */}
        <Link ref={logoRef} href="/" className="flex items-center w-[50%] lg:w-auto gap-2">
          <Image src="/logo_white.png" alt="Satocci" width={200} height={200} />
        </Link>

        <div className="flex justify-center items-center w-auto h-full">
        {/* Desktop Menu */}
        <div ref={menuRef} className="hidden w-auto Poppins font-medium lg:flex items-center justify-center gap-5 text-white">
          <Link href="/" className="hover:text-primary transition">{t('nav.home')}</Link>

          <Link href="/about" className="hover:text-primary transition">{t('nav.about')}</Link>

          <Link href="/product" className="hover:text-primary transition">{t('nav.product')}</Link>
          <Link href="/signup" className="hover:text-primary transition">{t('nav.signup')}</Link>
          <Link href="/blogs" className="hover:text-primary transition">{t('nav.blogs')}</Link>
        </div>

        {/* Right Side */}
        <div ref={buttonsRef} className="hidden lg:flex items-center w-auto ml-5 gap-2">
            <ModeToggle/>
          <Button 
            onClick={toggleLanguage}
            className="bg-white text-black hover:bg-purple hover:text-white hover:shadow-[0_0px_30px] shadow-purple rounded-full transition-all duration-300 cursor-pointer hover:scale-110" 
            size="icon"
          >
            <Languages className="h-5 w-5" />
          </Button>
          <Button className="Space rounded-full text-md font-bold px-5 py-5 bg-white text-black hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">{t('nav.freeDemo')}</Button>
          <Link href="https://app.satoccifinance.se/dashboard" target="_blank" rel="noopener noreferrer">
            <Button className="Space rounded-full text-md font-bold px-5 py-5 bg-white text-black hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
              {t('nav.businessLogin')}
            </Button>
          </Link>
        </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border px-6 py-4 space-y-4">
          <Link href="/" className="block">{t('nav.home')}</Link>
          <Link href="/about" className="block">{t('nav.about')}</Link>
          <Link href="/product" className="block">{t('nav.product')}</Link>
          <Link href="/signup" className="block">{t('nav.signup')}</Link>
          <Link href="/blogs" className="block">{t('nav.blogs')}</Link>

          {/* Mobile Controls */}
          <div className="flex items-center justify-center gap-3 mt-6 mb-4">
            <ModeToggle/>
            <Button 
              onClick={toggleLanguage}
              className="bg-white text-black hover:bg-purple hover:text-white hover:shadow-[0_0px_30px] shadow-purple rounded-full transition-all duration-300 cursor-pointer hover:scale-110" 
              size="icon"
            >
              <Languages className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button className="rounded-full font-bold w-full">{t('nav.freeDemo')}</Button>
            <Link href="https://app.satoccifinance.se/dashboard" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="rounded-full font-bold w-full" variant="outline">
                {t('nav.businessLogin')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
