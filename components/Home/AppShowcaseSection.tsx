"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AppShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !descRef.current || !buttonRef.current || !imageRef.current) return;

      // Ensure elements are visible by default
      gsap.set([titleRef.current, descRef.current, buttonRef.current, imageRef.current], { opacity: 1 });

      // Title animation on scroll - faster
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -60 },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // Description animation - faster
      gsap.fromTo(descRef.current,
        { opacity: 0, x: -50 },
        {
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.1,
          ease: "power2.out",
        }
      );

      // Button animation - faster
      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: 0.2,
          ease: "back.out(1.7)",
        }
      );

      // Image fade-in animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // Continuous floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex justify-center items-center w-full min-h-[100vh] h-auto z-10 my-30 bg-transparent overflow-hidden">
      <div className="w-7xl">
        <div className="relative flex flex-col lg:flex-row justify-between items-center w-full min-h-[100vh]">
          
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-start">
            <div className="w-full">
              <h2 ref={titleRef} className="Space text-3xl lg:text-5xl uppercase font-semibold text-foreground w-full mb-8">
                CHOOSE YOUR FAVORITE
                <br />
                ITEMS. SCAN & PAY VIA
                <br />
                MOBILE. IT&apos;S THAT
                <br />
                <span className="text-3xl lg:text-4xl xl:text-5xl">SIMPLE!</span>
              </h2>
              
              <p ref={descRef} className="Poppins text-sm font-medium max-w-xl mb-32">
                With Satocci you scan and pay in seconds and skip
                the line so shopping becomes faster smarter and
                easier using only your mobile.
              </p>
              <Button ref={buttonRef} className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">SEE HOW IT WORKS</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
          </div>
        </div>
      </div>
                <div ref={imageRef} className="absolute bottom-0 right-0 w-full h-full max-w-xl">
              <Image
                src="/apphand.png"
                alt="Satocci in action - seamless shopping experience"
                width={600}
                height={600}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
    </section>
  );
}
