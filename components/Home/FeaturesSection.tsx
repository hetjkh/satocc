"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Zap, Clock, Rocket,
  FileText, FolderOpen, CheckCircle,
  Gift, Star, TrendingUp,
  DollarSign, PieChart, Wallet,
  Shield, Lock, Eye,
  History, Calendar, List
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      title: t('features.freedom.title'),
      description: t('features.freedom.description'),
      image: "/extra/1.jpg",
      alt: "Freedom from Waiting",
      icons: [Zap, Clock, Rocket]
    },
    {
      title: t('features.receipts.title'),
      description: t('features.receipts.description'),
      image: "/extra/3.jpg",
      alt: "Smart Receipts",
      icons: [FileText, FolderOpen, CheckCircle]
    },
    {
      title: t('features.rewards.title'),
      description: t('features.rewards.description'),
      image: "/extra/5.jpg",
      alt: "Instant Rewards",
      icons: [Gift, Star, TrendingUp]
    },
    {
      title: t('features.budget.title'),
      description: t('features.budget.description'),
      image: "/extra/6.jpg",
      alt: "Budget Tracking",
      icons: [DollarSign, PieChart, Wallet]
    },
    {
      title: t('features.security.title'),
      description: t('features.security.description'),
      image: "/extra/4.jpg",
      alt: "Secure Payments",
      icons: [Shield, Lock, Eye]
    },
    {
      title: t('features.history.title'),
      description: t('features.history.description'),
      image: "/extra/2.png",
      alt: "Shopping History",
      icons: [History, Calendar, List]
    }
  ];

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-feature-card]"));

    const total = cards.length;
    const triggers: ScrollTrigger[] = [];

    // Pin the whole stack section similar to product/signup pages
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${Math.max(1200, total * 600)}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
    });
    triggers.push(pinTrigger);

    // initialize cards
    cards.forEach((card, index) => {
      gsap.set(card, {
        transformOrigin: "center top",
        willChange: "transform, opacity",
        opacity: index === 0 ? 1 : 0,
      });
    });

    // Single driver based on container progress
    const driver = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: pinTrigger.end!,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress; // 0 -> 1 across the whole pinned distance
        const perCard = 1 / Math.max(1, total - 0); // slice of progress per card reveal

        const offsetStep = 20; // px vertical offset for stacked layers
        const yStart = window.innerHeight * 0.6; // start well below center

        cards.forEach((card, index) => {
          if (index === 0) {
            // First card is present from the start at stack position 0
            const y = 0 * offsetStep;
            gsap.set(card, { y, opacity: 1, scale: 1, pointerEvents: 'auto' });
            return;
          }

          // Each next card gets its own reveal window
          const start = perCard * (index - 0); // when this card starts animating
          const end = perCard * (index + 1 - 0);
          const local = gsap.utils.clamp(0, 1, (progress - start) / (end - start));

          // Before reveal: hidden below
          // During reveal: move up from bottom and fade in
          // After reveal: sit at its stacked position
          const yStack = index * offsetStep;
          const y = gsap.utils.interpolate(yStart, yStack, local);
          const opacity = local;
          const scale = gsap.utils.interpolate(0.98, 1, local);
          const pointerEvents = opacity === 1 ? 'auto' : 'none';

          gsap.set(card, { y, opacity, scale, pointerEvents });
        });
      }
    });
    triggers.push(driver);

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:w-1/2">
            <h2 className="Space text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t('features.title')}
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="Poppins text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t('features.description')}
            </p>
          </div>
        </div>

        {/* Stacked, sticky scroll cards */}
        <div ref={listRef} className="relative min-h-screen" style={{ isolation: "isolate" }}>
          {features.map((feature, index) => (
            <div
              key={index}
              data-feature-card
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100 + index,
                willChange: "transform, opacity"
              }}
            >
              <div className="bg-card rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl">
                <div className="flex flex-col sm:flex-row">
                  {/* Image Left */}
                  <div className="relative w-full sm:w-1/2 h-[300px] sm:h-[450px] p-6 sm:p-8">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Text Right */}
                  <div className="w-full sm:w-1/2 p-6 sm:p-8 lg:p-12 flex items-center">
                    <div>
                      <h3 className="Space text-2xl sm:text-3xl font-bold text-foreground mb-4">
                        {feature.title}
                      </h3>
                      <p className="Poppins text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-6 mt-16">
                        {feature.icons.map((Icon, iconIndex) => (
                          <div key={iconIndex} className="w-12 h-12 bg-foreground/10 hover:bg-purple hover:shadow-[0_0px_20px] shadow-purple rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110">
                            <Icon className="w-6 h-6 text-foreground hover:text-white transition-all duration-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
