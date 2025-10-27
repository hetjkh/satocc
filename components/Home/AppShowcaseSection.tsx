"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AppShowcaseSection() {
  const { t } = useLanguage();
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

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col lg:flex-row justify-between items-center w-full min-h-[80vh] gap-8 lg:gap-16">
          
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
            <div className="w-full">
              <h2 ref={titleRef} className="Space text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl uppercase font-semibold text-foreground w-full mb-6 lg:mb-8 leading-tight">
                {t('app.title')}
              </h2>
              
              <p ref={descRef} className="Poppins text-sm sm:text-base lg:text-base font-medium max-w-xl mb-8 lg:mb-12 text-muted-foreground leading-relaxed">
                {t('app.description')}
              </p>
              <Button ref={buttonRef} className="Space rounded-full text-sm sm:text-base lg:text-base font-bold px-4 sm:px-6 py-4 sm:py-6 lg:py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105 w-fit">
                <span className="ml-2 sm:ml-3">{t('app.button')}</span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
             <div ref={imageRef} className="relative w-full max-w-md sm:max-w-lg lg:max-w-lg xl:max-w-lg">
              <Image
                src="/apphand.png"
                alt="Satocci in action - seamless shopping experience"
                width={600}
                height={600}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
