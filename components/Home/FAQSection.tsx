"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const { t } = useLanguage();
  const headerTitleRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLDivElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headerTitleRef.current || !headerDescRef.current || !faqContainerRef.current) return;

      // Ensure elements are visible by default
      gsap.set([headerTitleRef.current, headerDescRef.current, faqContainerRef.current], { opacity: 1 });

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

      // FAQ container animation - faster
      gsap.fromTo(faqContainerRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: faqContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      // Wait for DOM to be ready before animating items
      setTimeout(() => {
        const faqItems = faqContainerRef.current?.querySelectorAll('[data-radix-collection-item]');
        if (faqItems && faqItems.length > 0) {
          gsap.set(faqItems, { opacity: 1 });
          gsap.fromTo(faqItems,
            { opacity: 0, x: -30 },
            {
              scrollTrigger: {
                trigger: faqContainerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
            }
          );
        }
      }, 100);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full z-10 py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-12">
          <div ref={headerTitleRef} className="lg:w-1/2">
            <h2 className="Space text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('faq.title')}
            </h2>
          </div>
          <div ref={headerDescRef} className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              {t('faq.description')}
            </p>
          </div>
        </div>

        {/* FAQ Container with Tabs */}
        <div ref={faqContainerRef}>
          <Tabs defaultValue="consumers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-card border border-border rounded-xl p-1.5 h-auto">
              <TabsTrigger value="consumers" className="Space text-sm lg:text-base font-bold py-3 data-[state=active]:bg-foreground data-[state=active]:text-background rounded-lg transition-all duration-300">
                {t('faq.consumers')}
              </TabsTrigger>
              <TabsTrigger value="retailers" className="Space text-sm lg:text-base font-bold py-3 data-[state=active]:bg-foreground data-[state=active]:text-background rounded-lg transition-all duration-300">
                {t('faq.retailers')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consumers">
              <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.consumer.q1')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground space-y-4">
                        <p>{t('faq.consumer.a1')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.consumer.q2')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.consumer.a2')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.consumer.q3')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.consumer.a3')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.consumer.q4')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.consumer.a4')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.consumer.q5')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.consumer.a5')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.consumer.q6')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.consumer.a6')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="retailers">
              <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="retailer-1" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.retailer.q1')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.retailer.a1')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-2" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.retailer.q2')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.retailer.a2')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-3" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.retailer.q3')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.retailer.a3')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-4" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.retailer.q4')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.retailer.a4')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-5" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.retailer.q5')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.retailer.a5')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-6">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        {t('faq.retailer.q6')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>{t('faq.retailer.a6')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
