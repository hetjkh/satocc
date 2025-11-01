"use client";

import ProductSection from "@/components/Home/ProductSection";
import ProductBenefits from "@/components/Home/ProductBenefits";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import CircularGallery from './CircularGallery'

export default function ProductPage() {
  const { t, language } = useLanguage();
  // Hero section refs
  const heroBadgeRef = useRef<HTMLButtonElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Pause particles when hero section is in view for better video performance
    if (heroSectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.dispatchEvent(new CustomEvent('pause-particles'));
            } else {
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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([heroBadgeRef.current, heroTitleRef.current, heroDescRef.current], { opacity: 1, force3D: false });

      // Hero Badge Animation
      if (heroBadgeRef.current) {
        gsap.fromTo(heroBadgeRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2, force3D: false }
        );
      }

      // Hero Title Animation
      if (heroTitleRef.current) {
        gsap.fromTo(heroTitleRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4, force3D: false }
        );
      }

      // Hero Description Animation
      if (heroDescRef.current) {
        gsap.fromTo(heroDescRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power1.out", delay: 0.6, force3D: false }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen bg-transparent text-foreground">
      {/* Hero Section with Video */}
      <section ref={heroSectionRef} className="relative h-[100vh] w-full flex items-end justify-center text-center" style={{ isolation: 'isolate', contain: 'layout style paint' }}>
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
        <div className="relative flex justify-between items-end w-[95%] lg:w-full mb-10 max-w-7xl">
          <div className="w-full lg:w-[50%] justify-start items-start text-left">
            <Button ref={heroBadgeRef} className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6 bg-transparent text-foreground border-2 border-foreground mb-5 hover:scale-105 transition-transform duration-300">
              {t('product.hero.badge')}
            </Button>
            <h1 ref={heroTitleRef} className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5 lg:mb-0">
              {t('product.hero.title').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('product.hero.title').split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p ref={heroDescRef} className="block lg:hidden Poppins text-sm font-medium mb-8">
              {t('product.hero.description')}
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p ref={heroDescRef} className="Poppins text-md font-normal mb-8">
              {t('product.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <ProductSection />

      {/* Cashback/Benefits Section */}
      <ProductBenefits />

      {/* Card Showcase Section */}
      <section className="relative w-full py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="Space text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {t('product.gallery.title') || 'Choose Your Card'}
            </h2>
            <p className="Poppins text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('product.gallery.description') || 'Select from our range of virtual cards designed for every need'}
            </p>
          </div>
          <div style={{ height: '800px', position: 'relative', overflow: 'visible', paddingBottom: '120px' }}>
            <CircularGallery 
              key={language}
              bend={2} 
              borderRadius={0.15} 
              scrollEase={0.1}
              scrollSpeed={2}
              items={[
                { image: '/scan.png', text: t('product.gallery.item1') },
                { image: '/pay.png', text: t('product.gallery.item2') },
                { image: '/go.png', text: t('product.gallery.item3') }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
