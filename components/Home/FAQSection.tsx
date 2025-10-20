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

        {/* FAQ Container with Tabs */}
        <div ref={faqContainerRef}>
          <Tabs defaultValue="consumers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-card border border-border rounded-xl p-1.5 h-auto">
              <TabsTrigger value="consumers" className="Space text-sm lg:text-base font-bold py-3 data-[state=active]:bg-foreground data-[state=active]:text-background rounded-lg transition-all duration-300">
                FOR CONSUMERS
              </TabsTrigger>
              <TabsTrigger value="retailers" className="Space text-sm lg:text-base font-bold py-3 data-[state=active]:bg-foreground data-[state=active]:text-background rounded-lg transition-all duration-300">
                FOR RETAILERS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consumers">
              <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
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
            </TabsContent>

            <TabsContent value="retailers">
              <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="retailer-1" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        HOW DOES SATOCCI INTEGRATION WORK WITH MY EXISTING POS SYSTEM?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>
                          Satocci seamlessly integrates with most modern POS systems through our API. The integration 
                          process is straightforward and our technical team provides full support during setup. Your 
                          existing inventory and pricing systems remain unchanged while gaining the benefits of 
                          scan-and-pay technology.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-2" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        WHAT ARE THE COSTS ASSOCIATED WITH IMPLEMENTING SATOCCI?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>
                          Our pricing model is transparent and scalable based on your store size and transaction volume. 
                          We offer flexible plans with no hidden fees, including setup support, ongoing maintenance, 
                          and customer support. Contact our sales team for a customized quote that fits your business needs.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-3" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        HOW DOES SATOCCI HELP REDUCE CHECKOUT LINES AND IMPROVE CUSTOMER FLOW?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>
                          Satocci eliminates traditional checkout bottlenecks by allowing customers to scan and pay 
                          as they shop. This reduces checkout line wait times by up to 80%, improves customer satisfaction, 
                          and enables your staff to focus on customer service rather than operating cash registers.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-4" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        HOW DO YOU PREVENT THEFT OR FRAUD WITH SCAN-AND-PAY TECHNOLOGY?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>
                          Satocci employs advanced security measures including AI-powered monitoring, random verification 
                          checks, and secure digital receipts. Our system actually reduces theft compared to traditional 
                          methods, with real-time alerts for suspicious activity and comprehensive audit trails for 
                          every transaction.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-5" className="border-b border-border">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        WHAT ANALYTICS AND INSIGHTS DOES SATOCCI PROVIDE FOR MY BUSINESS?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>
                          Our comprehensive dashboard provides real-time analytics on customer behavior, popular products, 
                          peak shopping times, and transaction trends. These insights help you optimize inventory, 
                          staffing, and marketing strategies to increase revenue and improve operational efficiency.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retailer-6">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline">
                      <span className="Space text-lg font-bold text-foreground text-left">
                        HOW LONG DOES IT TAKE TO IMPLEMENT SATOCCI IN MY STORE?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="Poppins text-muted-foreground">
                        <p>
                          Most retailers can implement Satocci within 2-4 weeks, depending on store size and complexity. 
                          This includes system integration, staff training, and a soft launch period. Our dedicated 
                          onboarding team ensures a smooth transition with minimal disruption to your operations.
                        </p>
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
