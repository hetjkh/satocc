"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveUpRight, CheckCircle, Smartphone, CreditCard, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  // Feature 2 refs
  const feature2Ref = useRef<HTMLDivElement>(null);
  const mobile2Ref = useRef<HTMLDivElement>(null);
  const left2ContentRef = useRef<HTMLDivElement>(null);
  const right2ContentRef = useRef<HTMLDivElement>(null);

  // Feature 3 refs
  const feature3Ref = useRef<HTMLDivElement>(null);
  const mobile3Ref = useRef<HTMLDivElement>(null);
  const left3ContentRef = useRef<HTMLDivElement>(null);
  const right3ContentRef = useRef<HTMLDivElement>(null);

  // Feature 4 refs
  const feature4Ref = useRef<HTMLDivElement>(null);
  const mobile4Ref = useRef<HTMLDivElement>(null);
  const left4ContentRef = useRef<HTMLDivElement>(null);
  const right4ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states - all features hidden except first
      gsap.set([mobile2Ref.current], { 
        opacity: 0, 
        y: 100, 
        scale: 0.8
      });
      gsap.set([left2ContentRef.current], { 
        opacity: 0, 
        x: -100 
      });
      gsap.set([right2ContentRef.current], { 
        opacity: 0, 
        x: 100 
      });
      
      gsap.set([mobile3Ref.current], { 
        opacity: 0, 
        y: 100, 
        scale: 0.8
      });
      gsap.set([left3ContentRef.current], { 
        opacity: 0, 
        x: -100 
      });
      gsap.set([right3ContentRef.current], { 
        opacity: 0, 
        x: 100 
      });
      
      gsap.set([mobile4Ref.current], { 
        opacity: 0, 
        y: 100, 
        scale: 0.8
      });
      gsap.set([left4ContentRef.current], { 
        opacity: 0, 
        x: -100 
      });
      gsap.set([right4ContentRef.current], { 
        opacity: 0, 
        x: 100 
      });

      // Set initial states for first feature
      gsap.set(mobileRef.current, { opacity: 0, y: 100, scale: 0.8 });
      gsap.set(leftContentRef.current, { opacity: 0, x: -100 });
      gsap.set(rightContentRef.current, { opacity: 0, x: 100 });

      // Pinned scroll animation - Features transformation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=3000",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Feature 1 appears first - Image from bottom, text from sides
      tl
        .to(mobileRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        })
        .to(leftContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.8")
        .to(rightContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.6")
        // Feature 1 disappears, Feature 2 appears
        .to([mobileRef.current, leftContentRef.current, rightContentRef.current], {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        })
        .to(mobile2Ref.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }, "-=0.5")
        .to(left2ContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.8")
        .to(right2ContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.6")
        // Feature 2 disappears, Feature 3 appears
        .to([mobile2Ref.current, left2ContentRef.current, right2ContentRef.current], {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        })
        .to(mobile3Ref.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }, "-=0.5")
        .to(left3ContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.8")
        .to(right3ContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.6")
        // Feature 3 disappears, Feature 4 appears
        .to([mobile3Ref.current, left3ContentRef.current, right3ContentRef.current], {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        })
        .to(mobile4Ref.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }, "-=0.5")
        .to(left4ContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.8")
        .to(right4ContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
        }, "-=0.6");

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* All Features in Same Position - Overlapping */}
        <div className="relative min-h-[800px] flex items-center justify-center">
          {/* Feature 1: Tabby & Satocci Flexible Payments */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Content */}
            <div ref={leftContentRef} className="absolute left-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                {t('product.feature1.title')}
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature1.point1')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature1.point2')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature1.point3')}
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">{t('product.downloadButton')}</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>

            {/* Center Mobile Image */}
            <div ref={mobileRef} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-48 z-10">
              <div className="relative w-[600px] h-[1100px]">
                <Image
                  src="/1.png"
                  alt="Satocci Mobile App"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Content */}
            <div ref={rightContentRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h4 className="Space text-lg font-bold text-foreground mb-4">
                  {t('product.feature1.cardTitle')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature1.cardPoint1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature1.cardPoint2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature1.cardPoint3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Skip The Line */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Content */}
            <div ref={left2ContentRef} className="absolute left-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                {t('product.feature2.title')}
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature2.point1')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature2.point2')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature2.point3')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature2.point4')}
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">{t('product.downloadButton')}</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>

            {/* Center Mobile Image */}
            <div ref={mobile2Ref} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-48 z-10">
              <div className="relative w-[600px] h-[1100px]">
                <Image
                  src="/1.png"
                  alt="Satocci Mobile App - Smart Shopping"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Content */}
            <div ref={right2ContentRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h4 className="Space text-lg font-bold text-foreground mb-4">
                  {t('product.feature2.cardTitle')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature2.cardPoint1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature2.cardPoint2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature2.cardPoint3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Latest Transactions */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Content */}
            <div ref={left3ContentRef} className="absolute left-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                {t('product.feature3.title')}
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature3.point1')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature3.point2')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature3.point3')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature3.point4')}
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">{t('product.downloadButton')}</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>

            {/* Center Mobile Image */}
            <div ref={mobile3Ref} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-48 z-10">
              <div className="relative w-[600px] h-[1100px]">
                <Image
                  src="/1.png"
                  alt="Satocci Mobile App - Transactions"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Content */}
            <div ref={right3ContentRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h4 className="Space text-lg font-bold text-foreground mb-4">
                  {t('product.feature3.cardTitle')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature3.cardPoint1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature3.cardPoint2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature3.cardPoint3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Scan & Pay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Content */}
            <div ref={left4ContentRef} className="absolute left-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <h3 className="Space text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase">
                {t('product.feature4.title')}
              </h3>
              <div className="space-y-4 mb-8">
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature4.point1')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature4.point2')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature4.point3')}
                </p>
                <p className="Poppins text-base text-muted-foreground leading-relaxed bullet-point">
                  • {t('product.feature4.point4')}
                </p>
              </div>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-3">{t('product.downloadButton')}</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>

            {/* Center Mobile Image */}
            <div ref={mobile4Ref} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-48 z-10">
              <div className="relative w-[600px] h-[1100px]">
                <Image
                  src="/1.png"
                  alt="Satocci Mobile App - Scan & Pay"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Content */}
            <div ref={right4ContentRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 max-w-md">
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h4 className="Space text-lg font-bold text-foreground mb-4">
                  {t('product.feature4.cardTitle')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature4.cardPoint1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature4.cardPoint2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{t('product.feature4.cardPoint3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}