"use client";

import Image from "next/image";
import { ScanLine, Receipt, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function ProductBenefits() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  const items = [
    {
      icon: <ScanLine className="w-7 h-7" />,
      title: t('features.freedom.title'),
      desc: t('features.freedom.description'),
    },
    {
      icon: <Receipt className="w-7 h-7" />,
      title: t('features.receipts.title'),
      desc: t('features.receipts.description'),
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: t('features.security.title'),
      desc: t('features.security.description'),
    },
  ];
  const previewImages = [
    "/free.png",
    "/recipt.png",
    "/secure.png"
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-transparent">
      <div className="relative max-w-7xl mx-auto mr-auto ml-0 px-6 lg:pl-10 xl:pl-16">
        <h2 className="Space text-3xl md:text-4xl font-bold mb-12 lg:mb-14 text-foreground lg:-ml-2 xl:-ml-4 transform-gpu -translate-y-6 md:-translate-y-8 lg:-translate-y-10">{t('features.title')}</h2>
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-8 items-start">
          {/* Left: Benefits list */}
          <div className="group/benefits grid grid-cols-1 gap-0">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="group relative flex items-start gap-6 p-4 lg:p-5 rounded-2xl pb-10 mb-6 border-b border-foreground/10 last:pb-0 last:mb-0 last:border-none
              transition-all duration-500 ease-out group-hover/benefits:opacity-70 hover:opacity-100 hover:scale-[1.01] hover:shadow-[0_0px_20px] hover:shadow-purple"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Animated gradient sweep overlay for smooth color */}
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl bg-purple opacity-0
                transition-all duration-500 ease-out transform -translate-x-8 group-hover:translate-x-0 group-hover:opacity-100 hover:opacity-100 hover:translate-x-0 shadow-[0_0px_20px] shadow-purple group-hover:shadow-[0_0px_20px] group-hover:shadow-purple"
              />

              <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-foreground/5 border border-foreground/10 grid place-items-center text-foreground transition-colors duration-500 group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white">
                {it.icon}
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="Space text-lg md:text-xl font-extrabold tracking-wide text-foreground mb-1 transition-colors duration-500 group-hover:text-white">
                  {it.title}
                </h3>
                <p className={`Poppins text-sm md:text-base text-muted-foreground leading-relaxed transition-colors duration-500 group-hover:text-white/90 ${idx === 2 ? 'mb-1' : ''}`}>
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
          </div>

          {/* Right: Hover preview image (only render when hovering) */}
          {hovered !== null && (
            <div className="hidden lg:block sticky top-24">
              <div className="relative w-full h-[380px] rounded-3xl overflow-hidden">
                <Image
                  src={previewImages[hovered] || "/secure.png"}
                  alt="Secure preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


