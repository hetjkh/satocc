"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/Home/FAQSection";
import ReviewsSection from "@/components/Home/ReviewsSection";
import NewsroomSection from "@/components/Home/NewsroomSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import AppShowcaseSection from "@/components/Home/AppShowcaseSection";
import StoreLocatorSection from "@/components/Home/StoreLocatorSection";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { t } = useLanguage();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animations
    const ctx = gsap.context(() => {
      // Ensure elements are visible
      gsap.set([heroTitleRef.current, heroDescRef.current], { opacity: 1 });
      if (heroButtonsRef.current) {
        gsap.set(heroButtonsRef.current.children, { opacity: 1 });
      }

      // Animate hero title
      gsap.fromTo(heroTitleRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // Animate hero description
      gsap.fromTo(heroDescRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
      );

      // Animate hero buttons with stagger
      if (heroButtonsRef.current) {
        gsap.fromTo(heroButtonsRef.current.children,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)", stagger: 0.08, delay: 0.6 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-transparent text-foreground">
      {/* Hero Section */}
      <section className="relative h-[100vh] z-10 w-full flex items-end justify-center text-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls 
          autoPlay
          loop
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-[50%] via-background/50 via-[75%] to-background to-[100%]"></div>
        <div ref={heroContentRef} className="relative flex justify-between items-end w-[95%] lg:w-full mb-10 max-w-7xl">
          <div className="w-full lg:w-[50%] justify-start items-start text-left">
            <h1 ref={heroTitleRef} className="Space text-4xl lg:text-6xl uppercase font-bold mb-5">
              {t('hero.title')}
            </h1>
            <p ref={heroDescRef} className="block lg:hidden Poppins text-sm font-medium mb-5">
              {t('hero.description')}
            </p>

            <div ref={heroButtonsRef} className="flex justify-start items-start gap-2">
              <Button className="Space rounded-full text-xl lg:text-2xl font-bold p-6 lg:p-7 uppercase bg-white text-black border-2 border-foreground hover:scale-110 transition-transform duration-300">
                {t('hero.freeDemo')}
              </Button>
              <Button className="flex justify-center items-center Space rounded-full text-md w-13 h-13 lg:w-15 lg:h-15 font-bold p-0 lg:p-2 uppercase bg-white text-black border-2 border-foreground hover:scale-110 hover:rotate-12 transition-all duration-300">
                <Image src="/icons/play.png" alt="" height={30} width={30} />
              </Button>
              <Button className="flex justify-center items-center Space rounded-full text-md w-13 h-13 lg:w-15 lg:h-15 font-bold p-0 lg:p-2 uppercase bg-white text-black border-2 border-foreground hover:scale-110 hover:rotate-12 transition-all duration-300">
                <Image src="/icons/apple.png" alt="" height={35} width={35} />
              </Button>
            </div>
          </div>
          <div ref={heroDescRef} className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p className="Poppins text-md font-medium">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>
      <AppShowcaseSection />

      {/* Features Section */}
      <FeaturesSection />

      <ReviewsSection />

      <NewsroomSection />

      {/* Store Locator Section */}
      <StoreLocatorSection />
     
      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
