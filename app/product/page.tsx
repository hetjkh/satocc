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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([heroBadgeRef.current, heroTitleRef.current, heroDescRef.current], { opacity: 1 });

      // Hero Badge Animation
      if (heroBadgeRef.current) {
        gsap.fromTo(heroBadgeRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
        );
      }

      // Hero Title Animation
      if (heroTitleRef.current) {
        gsap.fromTo(heroTitleRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
        );
      }

      // Hero Description Animation
      if (heroDescRef.current) {
        gsap.fromTo(heroDescRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen bg-transparent text-foreground">
      {/* Hero Section with Video */}
      <section className="relative h-[100vh] w-full flex items-end justify-center text-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls
          preload="none"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Videos/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-[50%] via-background/50 via-[75%] to-background to-[100%]"></div>
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
