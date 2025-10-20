"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveUpRight, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  // Refs for animations
  const newsletterSectionRef = useRef<HTMLDivElement>(null);
  const newsletterTitleRef = useRef<HTMLHeadingElement>(null);
  const newsletterInputRef = useRef<HTMLDivElement>(null);
  const faqTextRef = useRef<HTMLParagraphElement>(null);
  const footerSectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const appButtonsRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const linksColumnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([
        newsletterTitleRef.current,
        newsletterInputRef.current,
        faqTextRef.current,
        logoRef.current,
        appButtonsRef.current,
        socialIconsRef.current,
        linksColumnsRef.current
      ], { opacity: 1 });

      // Newsletter Section Animations
      if (newsletterTitleRef.current) {
        gsap.fromTo(newsletterTitleRef.current,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: newsletterSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }

      if (newsletterInputRef.current) {
        gsap.fromTo(newsletterInputRef.current,
          { opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: newsletterSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.1,
            ease: "power2.out",
          }
        );
      }

      if (faqTextRef.current) {
        gsap.fromTo(faqTextRef.current,
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: newsletterSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }

      // Footer Section Animations
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: footerSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }

      if (appButtonsRef.current) {
        const buttons = appButtonsRef.current.querySelectorAll('button');
        gsap.fromTo(buttons,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: footerSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.1,
            ease: "power2.out",
          }
        );
      }

      if (socialIconsRef.current) {
        const icons = socialIconsRef.current.querySelectorAll('button');
        gsap.fromTo(icons,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            scrollTrigger: {
              trigger: footerSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.2,
            ease: "back.out(1.7)",
          }
        );
      }

      if (linksColumnsRef.current) {
        const columns = linksColumnsRef.current.querySelectorAll('.footer-column');
        gsap.fromTo(columns,
          { opacity: 0, x: -30 },
          {
            scrollTrigger: {
              trigger: footerSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="w-full">
      {/* Newsletter & FAQ Section - Adapts to theme */}
      <section ref={newsletterSectionRef} className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Newsletter Subscription */}
            <div>
               <h2 ref={newsletterTitleRef} className="Space text-3xl lg:text-4xl font-bold uppercase text-foreground mb-24 leading-tight">
                 SUBSCRIBE TO<br />
                 SATOCCI NEWSLETTER
               </h2>
               <div ref={newsletterInputRef} className="flex items-center gap-4 justify-end ml-20">
                 <Input
                   type="email"
                   placeholder="ENTER EMAIL"
                   className="rounded-full border-2 border-foreground bg-background text-foreground placeholder-foreground/60 focus:outline-none focus:ring-0 py-7 px-6 text-base w-80"
                 />
                 <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                   <span className="ml-3">SUBSCRIBE</span>
                   <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                     <MoveUpRight className="w-4 h-4" />
                   </div>
                 </Button>
               </div>
            </div>

            {/* FAQ Text */}
            <div className="">
              <p ref={faqTextRef} className="Poppins text-lg text-foreground/80 leading-relaxed">
                Got questions? We&apos;ve got answers. Explore the most common queries about Satocci, how it works, and how it makes your shopping experience easier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Section */}
      <section ref={footerSectionRef} className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Column 1: Logo and App Downloads */}
            <div className="lg:col-span-2">
              <div ref={logoRef} className="mb-8">
                {/* Satocci Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="Space text-2xl font-bold text-white">Satocci</span>
                  </div>
                </div>
              </div>

              {/* App Store Buttons */}
              <div ref={appButtonsRef} className="flex gap-2 mb-6">
                <Button className="flex justify-center items-center gap-3 Space rounded-full text-base font-bold px-4 py-5 uppercase bg-white text-black border-2 border-white hover:scale-110 hover:rotate-12 transition-all duration-300">
                  <Image src="/icons/play.png" alt="" height={28} width={28} />
                  <span>PLAY STORE</span>
                </Button>
                <Button className="flex justify-center items-center gap-3 Space rounded-full text-base font-bold px-4 py-5 uppercase bg-white text-black border-2 border-white hover:scale-110 hover:rotate-12 transition-all duration-300">
                  <Image src="/icons/apple.png" alt="" height={32} width={32} />
                  <span>APP STORE</span>
                </Button>
              </div>

              {/* Social Media Icons */}
              <div ref={socialIconsRef} className="flex gap-3">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-white/20 rounded-full">
                  <Facebook className="w-5 h-5 text-white" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-white/20 rounded-full">
                  <Twitter className="w-5 h-5 text-white" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-white/20 rounded-full">
                  <Linkedin className="w-5 h-5 text-white" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-white/20 rounded-full">
                  <Youtube className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>

            {/* Column 2: Landing Pages */}
            <div ref={linksColumnsRef} className="footer-column">
              <h3 className="Space text-lg font-bold text-white mb-4 uppercase">Landing Pages</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="Poppins text-white/80 hover:text-white transition-colors duration-300">Home</Link></li>
                <li><a href="/about" className="Poppins text-white/80 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="/signup" className="Poppins text-white/80 hover:text-white transition-colors duration-300">Join Us</a></li>
                <li><a href="/blogs" className="Poppins text-white/80 hover:text-white transition-colors duration-300">News</a></li>
                <li><a href="#faq" className="Poppins text-white/80 hover:text-white transition-colors duration-300">FAQs</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="footer-column">
              <h3 className="Space text-lg font-bold text-white mb-4 uppercase">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="Poppins text-white/80 hover:text-white transition-colors duration-300">Retailer T&Cs</a></li>
                <li><a href="#" className="Poppins text-white/80 hover:text-white transition-colors duration-300">Privacy</a></li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="footer-column">
              <h3 className="Space text-lg font-bold text-white mb-4 uppercase">Contact Us</h3>
              <div className="space-y-2">
                <div>
                  <span className="Poppins text-white/80">Address:</span>
                  <p className="Poppins text-white/80">Swedenborgsgatan 12, 753 34 Uppsala, Sweden.</p>
                </div>
                <div>
                  <p className="Poppins text-white/80">+46 761 038 155</p>
                </div>
                <div>
                  <p className="Poppins text-white/80">info@satocci.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
