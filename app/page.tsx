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
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Pause particles when hero section is in view for better video performance
    if (heroSectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Pause particles when video section is visible
              window.dispatchEvent(new CustomEvent('pause-particles'));
            } else {
              // Resume particles when scrolled away
              window.dispatchEvent(new CustomEvent('resume-particles'));
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(heroSectionRef.current);
      
      return () => {
        observer.disconnect();
        window.dispatchEvent(new CustomEvent('resume-particles'));
      };
    }
  }, []);

  useEffect(() => {
    // Hero section animations - optimized to not interfere with video
    const ctx = gsap.context(() => {
      // Ensure elements are visible
      gsap.set([heroTitleRef.current, heroDescRef.current], { opacity: 1, force3D: false });
      if (heroButtonsRef.current) {
        gsap.set(heroButtonsRef.current.children, { opacity: 1, force3D: false });
      }

      // Animate hero title - reduced complexity for better performance
      gsap.fromTo(heroTitleRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2, force3D: false }
      );

      // Animate hero description - reduced complexity
      gsap.fromTo(heroDescRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power1.out", delay: 0.4, force3D: false }
      );

      // Animate hero buttons with stagger - simplified
      if (heroButtonsRef.current) {
        gsap.fromTo(heroButtonsRef.current.children,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power1.out", stagger: 0.06, delay: 0.6, force3D: false }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-transparent text-foreground">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative h-[100vh] z-10 w-full flex items-end justify-center text-center" style={{ isolation: 'isolate', contain: 'layout style paint' }}>
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ 
            transform: 'translate3d(0, 0, 0)',
            willChange: 'auto',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransform: 'translate3d(0, 0, 0)',
            objectFit: 'cover',
            isolation: 'isolate'
          }}
          onLoadedData={(e) => {
            // Ensure smooth playback
            const video = e.currentTarget;
            if (video) {
              video.playbackRate = 1.0;
              video.defaultPlaybackRate = 1.0;
            }
          }}
        >
          <source src="/car.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"
          style={{ 
            transform: 'translateZ(0)',
            willChange: 'opacity',
            isolation: 'isolate',
            backfaceVisibility: 'hidden'
          }}
        ></div>
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




