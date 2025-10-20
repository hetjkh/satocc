"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
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
              FREQUENTLY ASKED
              <br />
              <span className="ml-8">QUESTIONS</span>
            </h2>
          </div>
          <div ref={headerDescRef} className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              Got questions? We&apos;ve got answers. Explore the most common queries about Satocci, 
              how it works, and how it makes your shopping experience easier.
            </p>
          </div>
        </div>

        {/* FAQ Container */}
        <div ref={faqContainerRef} className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border">
              <AccordionTrigger className="px-8 py-6 hover:no-underline">
                <span className="Space text-lg font-bold text-foreground text-left">
                  HOW DO I USE SATOCCI TO SCAN AND PAY FOR ITEMS IN-STORE?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="Poppins text-muted-foreground space-y-4">
                  <p>
                    With Satocci, paying for your shopping is instantaneous—no waiting in lines or fumbling with cash. 
                    The moment you check out in the app, your payment is processed and a digital receipt is issued 
                    instantly, securely stored in your account.
                  </p>
                  <p>
                    Unlike traditional paper receipts that fade, tear, or get lost, your Satocci receipts are always 
                    safe, accessible, and trackable. Need to share one? Do it in a single tap—no more awkwardly 
                    photographing long, oddly sized receipts that never fit properly in the camera frame.
                  </p>
                  <p>
                    With Satocci you enjoy a frictionless, eco-friendly, and clutter-free shopping experience, 
                    where your payments are faster and your receipts never disappear.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-border">
              <AccordionTrigger className="px-8 py-6 hover:no-underline">
                <span className="Space text-lg font-bold text-foreground text-left">
                  HOW DOES PAYMENT WORK — WHICH PAYMENT METHODS ARE SUPPORTED?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="Poppins text-muted-foreground">
                  <p>
                    Satocci supports all major payment methods including credit cards, debit cards, 
                    digital wallets, and bank transfers for a seamless checkout experience.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-border">
              <AccordionTrigger className="px-8 py-6 hover:no-underline">
                <span className="Space text-lg font-bold text-foreground text-left">
                  WHEN I PAY WITH SATOCCI, HOW DO I SHOW PROOF OF PURCHASE IF ASKED BY STORE STAFF?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="Poppins text-muted-foreground">
                  <p>
                    Your digital receipt is instantly available in the app and can be shown to store staff 
                    at any time. The receipt contains all necessary purchase information and is legally valid.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-border">
              <AccordionTrigger className="px-8 py-6 hover:no-underline">
                <span className="Space text-lg font-bold text-foreground text-left">
                  IS MY PAYMENT INFORMATION SECURE IN THE SATOCCI APP?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="Poppins text-muted-foreground">
                  <p>
                    Yes, Satocci uses bank-level encryption and security protocols to protect your payment 
                    information. Your data is never stored on our servers and all transactions are processed 
                    through secure payment gateways.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-border">
              <AccordionTrigger className="px-8 py-6 hover:no-underline">
                <span className="Space text-lg font-bold text-foreground text-left">
                  CAN I STILL COLLECT LOYALTY POINTS, COUPONS, OR DISCOUNTS WHEN USING SATOCCI?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="Poppins text-muted-foreground">
                  <p>
                    Absolutely! Satocci integrates with store loyalty programs and automatically applies 
                    your coupons and discounts during checkout, ensuring you never miss out on savings.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="px-8 py-6 hover:no-underline">
                <span className="Space text-lg font-bold text-foreground text-left">
                  DO I NEED AN INTERNET CONNECTION IN-STORE TO USE SATOCCI?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="Poppins text-muted-foreground">
                  <p>
                    Yes, a stable internet connection is required for real-time payment processing and 
                    receipt generation. Most stores provide free WiFi for customers.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
