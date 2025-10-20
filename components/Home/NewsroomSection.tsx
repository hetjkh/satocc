"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsroomSection() {
  const headerTitleRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headerTitleRef.current || !headerDescRef.current || !carouselRef.current) return;

      // Ensure elements are visible by default
      gsap.set([headerTitleRef.current, headerDescRef.current], { opacity: 1 });
      
      const cards = carouselRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.set(cards, { opacity: 1 });
      }

      // Header animations - faster
      gsap.fromTo(headerTitleRef.current,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: headerTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      gsap.fromTo(headerDescRef.current,
        { opacity: 0, x: 50 },
        {
          scrollTrigger: {
            trigger: headerDescRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        }
      );

      // Carousel cards animation - faster
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          }
        );

        // Micro-interactions for cards
        Array.from(cards).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full z-10 py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-32">
          <div ref={headerTitleRef} className="lg:w-1/2">
            <h2 className="Space text-4xl lg:text-5xl font-bold text-foreground mb-4">
              LATEST NEWS & INSIGHTS
            </h2>
          </div>
          <div ref={headerDescRef} className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              Stay updated with Satocci&apos;s journey — from product updates and industry trends to stories 
              shaping the future of shopping and payments.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div ref={carouselRef} className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {/* Card 1 - Satocci Partners with TheBlock */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Partners with TheBlock. for Seamless Retail Innovation
                </h3>
              </div>
            </div>

            {/* Card 2 - Satocci Partners with Fakhruddin */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Partners with Fakhruddin General Trading LLC
                </h3>
              </div>
            </div>

            {/* Card 3 - The Fin-Tech Summit */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  The Fin-Tech Summit Seamless Middle East
                </h3>
              </div>
            </div>

            {/* Additional Cards for Carousel Effect */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Wins Retail Innovation Award 2024
                </h3>
              </div>
            </div>

            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Featured at Dubai Tech Summit 2024
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
