"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection() {
  const headerTitleRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const feature3Ref = useRef<HTMLDivElement>(null);
  const feature4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
    
      // Ensure elements are visible by default
      gsap.set([headerTitleRef.current, headerDescRef.current], { opacity: 1 });

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

      // Feature animations - faster and simpler
      const features = [feature1Ref, feature2Ref, feature3Ref, feature4Ref];
      features.forEach((ref, index) => {
        if (!ref.current) return;

        const content = ref.current.querySelector('.feature-content');
        const image = ref.current.querySelector('.feature-image');

        // Set visibility
        if (content) gsap.set(content, { opacity: 1 });
        if (image) gsap.set(image, { opacity: 1 });

        if (content) {
          gsap.fromTo(content,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
            }
          );
        }

        if (image) {
          gsap.fromTo(image,
            { opacity: 0, x: index % 2 === 0 ? 50 : -50, scale: 0.95 },
            {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.5,
              delay: 0.1,
              ease: "power2.out",
            }
          );

          // Add floating animation to images
          gsap.to(image, {
            y: -8,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 0.5,
          });
        }

        // Bullet points stagger
        const bulletPoints = ref.current.querySelectorAll('.bullet-point');
        if (bulletPoints.length > 0) {
          gsap.set(bulletPoints, { opacity: 1 });
          gsap.fromTo(bulletPoints,
            { opacity: 0, x: -15 },
            {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              x: 0,
              duration: 0.3,
              stagger: 0.06,
              delay: 0.2,
              ease: "power2.out",
            }
          );
        }

        // Button animations
        const button = ref.current.querySelector('button');
        if (button) {
          gsap.set(button, { opacity: 1 });
          gsap.fromTo(button,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              delay: 0.4,
              ease: "back.out(1.7)",
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Feature 1: Tabby & Satocci Flexible Payments */}
        <div ref={feature1Ref} className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 feature-content">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                Offer Your Shoppers Flexible Payments with Tabby & Satocci
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Enable customers to split payments into manageable installments.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Enhance shopping convenience and improve the overall customer experience.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Boost sales conversions by offering a more accessible payment option.
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">DOWNLOAD APP</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>
            <div className="order-1 lg:order-2 feature-image">
              <div className="bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="h-96 relative p-6">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/signup.jpg"
                      alt="Flexible Payments"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <h4 className="Space text-lg font-bold text-foreground">
                    SPLIT PAYMENT OPTIONS
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Skip The Line */}
        <div ref={feature2Ref} className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="feature-image">
              <div className="bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="h-96 relative p-6">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/signup.jpg"
                      alt="Skip The Line"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <h4 className="Space text-lg font-bold text-foreground">
                    SMART SHOPPING
                  </h4>
                </div>
              </div>
            </div>
            <div className="feature-content">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                Skip The Line and Shop Smart
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Skip the line and shop smart with our streamlined online shopping experience.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Avoid the hassle of queues and crowded stores.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Enjoy fast, easy, and secure purchasing.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Get your products delivered right to you, saving time and effort.
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">DOWNLOAD APP</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Feature 3: Latest Transactions */}
        <div ref={feature3Ref} className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 feature-content">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                Latest Transactions
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Manage and view the latest transactions on behalf of Satocci in real-time.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Stay up-to-date with customer payments and purchase history.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Easily track sales, refunds, and payment status through an intuitive dashboard.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Ensure smooth transaction flow and customer satisfaction with detailed reporting.
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">DOWNLOAD APP</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>
            <div className="order-1 lg:order-2 feature-image">
              <div className="bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="h-96 relative p-6">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/signup.jpg"
                      alt="Latest Transactions"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <h4 className="Space text-lg font-bold text-foreground">
                    REAL-TIME TRACKING
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Scan & Pay */}
        <div ref={feature4Ref} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="feature-image">
              <div className="bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="h-96 relative p-6">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/signup.jpg"
                      alt="Scan & Pay"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <h4 className="Space text-lg font-bold text-foreground">
                    QUICK QR PAYMENTS
                  </h4>
                </div>
              </div>
            </div>
            <div className="feature-content">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                Scan & Pay
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Simplify payments with Scan & Pay for a seamless shopping experience.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Customers can quickly complete transactions by scanning a QR code.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Eliminate the need for cash or cards, offering secure and contactless payments.
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • Speed up checkout processes, enhancing customer convenience and satisfaction.
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">DOWNLOAD APP</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
