"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerTitleRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const secondaryCardRef = useRef<HTMLDivElement>(null);
  const thirdCardRef = useRef<HTMLDivElement>(null);
  const fourthCardRef = useRef<HTMLDivElement>(null);
  const fifthCardRef = useRef<HTMLDivElement>(null);
  const sixthCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headerTitleRef.current || !headerDescRef.current || !mainCardRef.current || !secondaryCardRef.current || !thirdCardRef.current || !fourthCardRef.current || !fifthCardRef.current || !sixthCardRef.current || !sectionRef.current) return;

      // Ensure all elements are visible by default
      gsap.set([headerTitleRef.current, headerDescRef.current, mainCardRef.current, secondaryCardRef.current], { opacity: 1 });
      gsap.set([thirdCardRef.current, fourthCardRef.current, fifthCardRef.current, sixthCardRef.current], { opacity: 0 });

      // Header title animation - faster
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

      // Header description animation - faster
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

      // Initial card animations
      gsap.fromTo(mainCardRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: mainCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      gsap.fromTo(secondaryCardRef.current,
        { opacity: 0, x: 60, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: secondaryCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.15,
          ease: "power2.out",
        }
      );

      // Pinned scroll animation - Card transformation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=3000",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      tl
        // Main card comes out of the page (3D effect)
        .to(mainCardRef.current, {
          z: 200,
          scale: 1.1,
          duration: 0.6,
          ease: "power2.inOut",
        })
        // Main card vanishes - comes straight toward viewer
        .to(mainCardRef.current, {
          opacity: 0,
          scale: 1.3,
          z: 600,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        // Simultaneously, blur card transforms in place and moves toward center
        .to(secondaryCardRef.current, {
          filter: "blur(0px)",
          opacity: 1,
          width: "28rem",
          scale: 1,
          z: 0,
          x: -200,
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3")
        // Third card appears on the left as blur
        .to(thirdCardRef.current, {
          opacity: 0.6,
          x: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.4")
        // Secondary card (now clear) comes out more
        .to(secondaryCardRef.current, {
          z: 200,
          scale: 1.1,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, "+=0.1")
        // Secondary card vanishes - comes straight toward viewer
        .to(secondaryCardRef.current, {
          opacity: 0,
          scale: 1.3,
          z: 600,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        // Third card becomes clear and moves toward center
        .to(thirdCardRef.current, {
          filter: "blur(0px)",
          opacity: 1,
          width: "28rem",
          scale: 1,
          z: 0,
          x: 200,
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3")
        // Fourth card appears on the right as blur
        .to(fourthCardRef.current, {
          opacity: 0.6,
          x: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.4")
        // Third card (now clear) comes out more
        .to(thirdCardRef.current, {
          z: 200,
          scale: 1.1,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, "+=0.1")
        // Third card vanishes - comes straight toward viewer
        .to(thirdCardRef.current, {
          opacity: 0,
          scale: 1.3,
          z: 600,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        // Fourth card becomes clear and moves toward center
        .to(fourthCardRef.current, {
          filter: "blur(0px)",
          opacity: 1,
          width: "28rem",
          scale: 1,
          z: 0,
          x: -200,
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3")
        // Fifth card appears on the left as blur
        .to(fifthCardRef.current, {
          opacity: 0.6,
          x: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.4")
        // Fourth card (now clear) comes out more
        .to(fourthCardRef.current, {
          z: 200,
          scale: 1.1,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, "+=0.1")
        // Fourth card vanishes - comes straight toward viewer
        .to(fourthCardRef.current, {
          opacity: 0,
          scale: 1.3,
          z: 600,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        // Fifth card becomes clear and moves toward center
        .to(fifthCardRef.current, {
          filter: "blur(0px)",
          opacity: 1,
          width: "28rem",
          scale: 1,
          z: 0,
          x: 200,
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3")
        // Sixth card appears on the right as blur
        .to(sixthCardRef.current, {
          opacity: 0.6,
          x: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.4")
        // Fifth card (now clear) comes out more
        .to(fifthCardRef.current, {
          z: 200,
          scale: 1.1,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, "+=0.1")
        // Fifth card vanishes - comes straight toward viewer
        .to(fifthCardRef.current, {
          opacity: 0,
          scale: 1.3,
          z: 600,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        // Sixth card becomes clear and moves toward center
        .to(sixthCardRef.current, {
          filter: "blur(0px)",
          opacity: 1,
          width: "28rem",
          scale: 1,
          z: 0,
          x: -200,
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 bg-background relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-20">
          <div ref={headerTitleRef} className="lg:w-1/2">
            <h2 className="Space text-4xl lg:text-5xl font-bold text-foreground mb-4">
              SAY GOODBYE TO
              <br />
              <span className="text-5xl lg:text-6xl">STRESSFUL SHOPPING</span>
            </h2>
          </div>
          <div ref={headerDescRef} className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              Imagine shopping without the stress of waiting in line. No crumpled receipts. No missing out on rewards. 
              With Satocci™ every shopping trip feels smoother lighter and more rewarding.
            </p>
          </div>
        </div>

        {/* Features Cards Row 1 */}
        <div className="relative mb-20" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          {/* Main Feature Card - Fixed Width */}
          <div ref={mainCardRef} className="w-full max-w-xl bg-card rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ml-20" style={{ transformStyle: "preserve-3d" }}>
            <div className="h-96 relative p-6">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Freedom from Waiting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6 pt-4">
              <h3 className="Space text-3xl font-bold text-foreground mb-4">
                Freedom from Waiting
              </h3>
              <p className="Poppins text-lg text-muted-foreground leading-relaxed">
                Walk out as soon as you finish. No lines. No wasted time. Just freedom to enjoy your day.
              </p>
            </div>
          </div>

          {/* Secondary Feature Card - Blurred & Smaller - Positioned Absolutely */}
          <div ref={secondaryCardRef} className="absolute top-[20%] right-0 w-[28rem] -translate-y-1/2 bg-card rounded-3xl shadow-xl overflow-hidden opacity-60 blur-sm transition-all duration-500" style={{ transformStyle: "preserve-3d" }}>
            <div className="h-64 relative p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Smart Receipts"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4 pt-3">
              <h3 className="Space text-lg font-bold text-foreground mb-3">
                Smart Receipts
              </h3>
              <p className="Poppins text-sm text-muted-foreground leading-relaxed">
                Digital receipts that never fade or get lost. Organize, share, and track your purchases effortlessly.
              </p>
            </div>
          </div>

          {/* Third Feature Card - Blurred & Smaller - Positioned on Left */}
          <div ref={thirdCardRef} className="absolute top-[20%] left-0 w-[28rem] -translate-y-1/2 bg-card rounded-3xl shadow-xl overflow-hidden opacity-0 blur-sm transition-all duration-500" style={{ transformStyle: "preserve-3d" }}>
            <div className="h-64 relative p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Instant Rewards"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4 pt-3">
              <h3 className="Space text-lg font-bold text-foreground mb-3">
                Instant Rewards
              </h3>
              <p className="Poppins text-sm text-muted-foreground leading-relaxed">
                Automatically earn and track rewards with every purchase. Never miss a point again.
              </p>
            </div>
          </div>

          {/* Fourth Feature Card - Blurred & Smaller - Positioned on Right */}
          <div ref={fourthCardRef} className="absolute top-[20%] right-0 w-[28rem] -translate-y-1/2 bg-card rounded-3xl shadow-xl overflow-hidden opacity-0 blur-sm transition-all duration-500" style={{ transformStyle: "preserve-3d" }}>
            <div className="h-64 relative p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Budget Tracking"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4 pt-3">
              <h3 className="Space text-lg font-bold text-foreground mb-3">
                Budget Tracking
              </h3>
              <p className="Poppins text-sm text-muted-foreground leading-relaxed">
                Track your spending in real-time. Stay on budget with smart insights and alerts.
              </p>
            </div>
          </div>

          {/* Fifth Feature Card - Blurred & Smaller - Positioned on Left */}
          <div ref={fifthCardRef} className="absolute top-[20%] left-0 w-[28rem] -translate-y-1/2 bg-card rounded-3xl shadow-xl overflow-hidden opacity-0 blur-sm transition-all duration-500" style={{ transformStyle: "preserve-3d" }}>
            <div className="h-64 relative p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Secure Payments"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4 pt-3">
              <h3 className="Space text-lg font-bold text-foreground mb-3">
                Secure Payments
              </h3>
              <p className="Poppins text-sm text-muted-foreground leading-relaxed">
                Bank-level security for every transaction. Your payment data is always protected.
              </p>
            </div>
          </div>

          {/* Sixth Feature Card - Blurred & Smaller - Positioned on Right */}
          <div ref={sixthCardRef} className="absolute top-[20%] right-0 w-[28rem] -translate-y-1/2 bg-card rounded-3xl shadow-xl overflow-hidden opacity-0 blur-sm transition-all duration-500" style={{ transformStyle: "preserve-3d" }}>
            <div className="h-64 relative p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Shopping History"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4 pt-3">
              <h3 className="Space text-lg font-bold text-foreground mb-3">
                Shopping History
              </h3>
              <p className="Poppins text-sm text-muted-foreground leading-relaxed">
                Access your complete purchase history anytime. Reorder favorites with one tap.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
