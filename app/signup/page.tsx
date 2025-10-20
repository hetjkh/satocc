"use client";

// app/page.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { MoveUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  // Refs for GSAP animations - Steps
  const buttonStepsRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineSegment1Ref = useRef<HTMLDivElement>(null);
  const lineSegment2Ref = useRef<HTMLDivElement>(null);
  
  // Refs for GSAP animations - Hero, Form, and Image
  const heroBadgeRef = useRef<HTMLButtonElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const formSectionTitleRef = useRef<HTMLHeadingElement>(null);
  const formSectionDescRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    companyUrl: '',
    pos: '',
    dailyCustomers: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // GSAP Animations - Steps Section (DON'T TOUCH - User's existing animation)
  useEffect(() => {
    if (buttonStepsRef.current) {
      const ctx = gsap.context(() => {
        // Check if screen is large (desktop)
        const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

        if (isLargeScreen) {
          // Desktop animation with pinning
          // Set initial states for complete step units (button + card)
          gsap.set(stepRefs.current, {
            x: (index) => index % 2 === 0 ? -200 : 200,
            opacity: 0,
            scale: 0.8,
            clearProps: "none" // Don't clear these props
          });

          // Set initial states for line segments
          gsap.set(lineSegment1Ref.current, {
            scaleX: 0,
            opacity: 1, // Make line visible but scaled to 0
            transformOrigin: "left center"
          });
          
          gsap.set(lineSegment2Ref.current, {
            scaleX: 0,
            opacity: 1, // Make line visible but scaled to 0
            transformOrigin: "left center"
          });

          // Create timeline for complete steps animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: buttonStepsRef.current,
              start: "top 20%", // Start pinning when section reaches 20% from top
              end: "+=200%", // Extended duration for pinning
              scrub: 1,
              pin: true, // Pin the section during animation
              pinSpacing: true, // Maintain proper spacing
            }
          });

        // Animate Step 1 first
        tl.to(stepRefs.current[0], {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power3.out"
        });

        // Then animate line from Step 1 to Step 2
        tl.to(lineSegment1Ref.current, {
          scaleX: 1,
          duration: 0.2,
          ease: "power2.out"
        });

        // Then animate Step 2
        tl.to(stepRefs.current[1], {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power3.out"
        });

        // Then animate line from Step 2 to Step 3
        tl.to(lineSegment2Ref.current, {
          scaleX: 1,
          duration: 0.2,
          ease: "power2.out"
        });

          // Finally animate Step 3
          tl.to(stepRefs.current[2], {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power3.out"
          });
        } else {
          // Mobile/Tablet: Simple fade-in animation without pinning
          gsap.set(stepRefs.current, { opacity: 1 });
          
          stepRefs.current.forEach((step) => {
            if (step) {
              gsap.fromTo(step,
                { opacity: 0, y: 50 },
                {
                  scrollTrigger: {
                    trigger: step,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                }
              );
            }
          });
        }

      }, buttonStepsRef);

      return () => ctx.revert();
    }
  }, []);

  // GSAP Animations - Hero, Form, and Image sections (Run AFTER steps animation is set)
  useEffect(() => {
    // Small delay to ensure steps animation is initialized first
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero Section Animations
        if (heroBadgeRef.current) {
          gsap.set(heroBadgeRef.current, { opacity: 1 });
          gsap.fromTo(heroBadgeRef.current,
            { opacity: 0, scale: 0.8, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
          );
        }

        if (heroTitleRef.current) {
          gsap.set(heroTitleRef.current, { opacity: 1 });
          gsap.fromTo(heroTitleRef.current,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
          );
        }

        if (heroDescRef.current) {
          gsap.set(heroDescRef.current, { opacity: 1 });
          gsap.fromTo(heroDescRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
          );
        }

        // Form Section Title and Description
        if (formSectionTitleRef.current) {
          gsap.set(formSectionTitleRef.current, { opacity: 1 });
          gsap.fromTo(formSectionTitleRef.current,
            { opacity: 0, y: 50 },
            {
              scrollTrigger: {
                trigger: formSectionTitleRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
                id: "formTitle", // Unique ID to avoid conflicts
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            }
          );
        }

        if (formSectionDescRef.current) {
          gsap.set(formSectionDescRef.current, { opacity: 1 });
          gsap.fromTo(formSectionDescRef.current,
            { opacity: 0, x: 50 },
            {
              scrollTrigger: {
                trigger: formSectionDescRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
                id: "formDesc", // Unique ID
              },
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.1,
              ease: "power2.out",
            }
          );
        }

        // Form Inputs Animation
        if (formRef.current) {
          const inputs = formRef.current.querySelectorAll('.form-input-group');
          if (inputs.length > 0) {
            gsap.set(inputs, { opacity: 1 });
            gsap.fromTo(inputs,
              { opacity: 0, x: -40, scale: 0.98 },
              {
                scrollTrigger: {
                  trigger: formRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                  id: "formInputs", // Unique ID
                },
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
              }
            );
          }
        }

        // Image Animation with Parallax
        if (imageRef.current) {
          gsap.set(imageRef.current, { opacity: 1 });
          gsap.fromTo(imageRef.current,
            { opacity: 0, scale: 0.9, x: 60 },
            {
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
                id: "formImage", // Unique ID
              },
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            }
          );

          // Floating animation
          gsap.to(imageRef.current, {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        }
      });

      return () => ctx.revert();
    }, 100); // Small delay to let steps animation initialize

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Form submitted successfully! We will get in touch with you soon.');
        setFormData({
          fullName: '',
          address: '',
          email: '',
          phone: '',
          companyUrl: '',
          pos: '',
          dailyCustomers: ''
        });
      } else {
        setSubmitMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setSubmitMessage('Error submitting form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
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
            <Button ref={heroBadgeRef} className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6  bg-transparent text-foreground border-2 border-foreground mb-5 hover:scale-105 transition-transform duration-300">
              Are you a retailer?
            </Button>
            <h1 ref={heroTitleRef} className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5 lg:mb-0">
              Reimagine checkout with <br /> Satocci and bring
              <br /> innovation to retail.
            </h1>
            <p ref={heroDescRef} className="block lg:hidden Poppins text-sm font-medium mb-5">
              Satocci makes shopping seamless by letting you scan and pay
              instantly so you skip the line and enjoy faster smarter
              sustainable shopping.
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p ref={heroDescRef} className="Poppins text-md font-normal">
              Satocci makes shopping seamless by letting you scan and pay
              instantly so you skip the line and enjoy faster smarter
              sustainable shopping.
            </p>
          </div>
        </div>
      </section>
      <section ref={buttonStepsRef} className="relative flex gap-5 items-center justify-center w-full mt-10 lg:mt-30 mb-10 lg:mb-30 px-4 lg:px-0">
        <div className="relative py-5 flex flex-col lg:flex-row gap-8 lg:gap-5 items-center lg:items-start justify-center lg:justify-between z-10 max-w-7xl w-full">
          {/* Step 1 - Complete Unit */}
          <div ref={(el) => { stepRefs.current[0] = el; }} className="relative flex justify-center items-start flex-col w-full lg:w-[400px] h-auto gap-4 opacity-0 lg:opacity-0">
            <Button className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6 px-10 bg-green-400 text-foreground border-2 border-foreground mx-auto">
              Step 1
            </Button>
            <div className="relative flex justify-start items-start flex-col border-foreground w-full lg:w-[400px] min-h-[350px] lg:h-[400px] border-2 rounded-4xl p-5 lg:p-7">
              <h1 className="Space text-3xl lg:text-4xl xl:text-5xl uppercase font-semibold mb-4 lg:mb-5">
                Contact Us
              </h1>
              <p className="Poppins text-sm font-medium mb-5">
                Fill in the form below to tell us more about your store, your
                customers, and how you operate. This helps our team design a
                tailor‑made solution that best fits your business.
              </p>
              <Button className="mt-auto w-full lg:w-auto lg:absolute lg:bottom-7 Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer uppercase">
                <span className="ml-3">Contact us</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>
          </div>

          {/* Step 2 - Complete Unit */}
          <div ref={(el) => { stepRefs.current[1] = el; }} className="relative flex justify-center items-start flex-col w-full lg:w-[400px] h-auto gap-4 opacity-0 lg:opacity-0">
            <Button className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6 px-10 bg-green-400 text-foreground border-2 border-foreground mx-auto">
              Step 2
            </Button>
            <div className="relative flex justify-start items-start flex-col border-foreground w-full lg:w-[400px] min-h-[350px] lg:h-[400px] border-2 rounded-4xl p-5 lg:p-7">
              <h1 className="Space text-3xl lg:text-4xl xl:text-5xl uppercase font-semibold mb-4 lg:mb-5">
                Onboarding Process
              </h1>
              <p className="Poppins text-sm font-medium mb-5">
                Team Satocci will ensure that your inventories are in sync and
                that your team is trained to start accepting shoppers using
                Satocci in less than two weeks.
              </p>
            </div>
          </div>

          {/* Step 3 - Complete Unit */}
          <div ref={(el) => { stepRefs.current[2] = el; }} className="relative flex justify-center items-start flex-col w-full lg:w-[400px] h-auto gap-4 opacity-0 lg:opacity-0">
            <Button className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6 px-10 bg-green-400 text-foreground border-2 border-foreground mx-auto">
              Step 3
            </Button>
            <div className="relative flex justify-start items-start flex-col border-foreground w-full lg:w-[400px] min-h-[350px] lg:h-[400px] border-2 rounded-4xl p-5 lg:p-7">
              <h1 className="Space text-3xl lg:text-4xl xl:text-5xl uppercase font-semibold mb-4 lg:mb-5">
                Continuous Improvement
              </h1>
              <p className="Poppins text-sm font-medium mb-5">
                We work closely with you even after launch - gathering feedback,
                updating features, and ensuring Satocci keeps making checkout
                smoother for all.
              </p>
            </div>
          </div>
        </div>
        {/* Progressive connecting lines - positioned to connect button centers - Hidden on mobile */}
        <div ref={lineSegment1Ref} className="hidden lg:block absolute top-[50px] left-[20%] w-[30%] border border-foreground z-0 opacity-0"></div>
        <div ref={lineSegment2Ref} className="hidden lg:block absolute top-[50px] left-[50%] w-[30%] border border-foreground z-0 opacity-0"></div>
      </section>

      <section
        id="contact"
        className="flex justify-center items-center w-full h-auto flex-col px-4 lg:px-0"
      >
        <div className="relative flex flex-col lg:flex-row justify-between items-start w-full lg:w-full mb-10 max-w-7xl">
          <div className="w-full lg:w-[50%] justify-start items-start text-left">
            <h1 ref={formSectionTitleRef} className="Space text-3xl lg:text-4xl xl:text-5xl uppercase font-semibold mb-5 lg:mb-0">
              Let&apos;s Get Started
            </h1>
            <p ref={formSectionDescRef} className="block lg:hidden Poppins text-sm font-medium mb-5">
              Fill in the following details, and we will get in touch with you.
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p ref={formSectionDescRef} className="Poppins text-md font-normal">
              Satocci makes shopping seamless by letting you scan and pay
              instantly so you skip the line and enjoy faster smarter
              sustainable shopping.
            </p>
          </div>
        </div>
        <div className="relative flex flex-col lg:flex-row justify-between items-start w-full lg:w-full mb-10 max-w-7xl gap-6 lg:gap-10">
          <div className="relative flex justify-between items-end w-full lg:w-1/2 mb-10 max-w-7xl">
            <form ref={formRef} className="space-y-6 w-full" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="relative flex items-center w-full form-input-group">
                <Input
                  id="full-name"
                  placeholder=" "
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="peer Poppins rounded-full text-lg lg:text-xl font-medium p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground transition-all duration-300 focus:scale-105"
                />
                <p
                  className="Poppins absolute left-4 lg:left-6 text-lg lg:text-xl rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200
          peer-placeholder-shown:top-2.5 lg:peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg lg:peer-placeholder-shown:text-xl
          peer-focus:-top-3 lg:peer-focus:-top-4
          peer-not-placeholder-shown:-top-3 lg:peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:bg-background peer-focus:bg-background px-2"
                >
                  Full Name
                </p>
              </div>

              {/* Address */}
              <div className="relative flex items-center w-full form-input-group">
                <Input
                  id="address"
                  placeholder=" "
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="peer Poppins rounded-full text-lg lg:text-xl font-medium p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground transition-all duration-300 focus:scale-105"
                />
                <p
                  className="Poppins absolute left-4 lg:left-6 text-lg lg:text-xl rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200
          peer-placeholder-shown:top-2.5 lg:peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg lg:peer-placeholder-shown:text-xl
          peer-focus:-top-3 lg:peer-focus:-top-4
          peer-not-placeholder-shown:-top-3 lg:peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:bg-background peer-focus:bg-background px-2"
                >
                  Address
                </p>
              </div>

              {/* Email */}
              <div className="relative flex items-center w-full form-input-group">
                <Input
                  id="email"
                  type="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="peer Poppins rounded-full text-lg lg:text-xl font-medium p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground transition-all duration-300 focus:scale-105"
                />
                <p
                  className="Poppins absolute left-4 lg:left-6 text-lg lg:text-xl rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200
          peer-placeholder-shown:top-2.5 lg:peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg lg:peer-placeholder-shown:text-xl
          peer-focus:-top-3 lg:peer-focus:-top-4
          peer-not-placeholder-shown:-top-3 lg:peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:bg-background peer-focus:bg-background px-2"
                >
                  Email
                </p>
              </div>

              {/* Phone */}
              <div className="relative flex items-center w-full form-input-group">
                <Input
                  id="phone"
                  type="tel"
                  placeholder=" "
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="peer Poppins rounded-full text-lg lg:text-xl font-medium p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground transition-all duration-300 focus:scale-105"
                />
                <p
                  className="Poppins absolute left-4 lg:left-6 text-lg lg:text-xl rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200
          peer-placeholder-shown:top-2.5 lg:peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg lg:peer-placeholder-shown:text-xl
          peer-focus:-top-3 lg:peer-focus:-top-4
          peer-not-placeholder-shown:-top-3 lg:peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:bg-background peer-focus:bg-background px-2"
                >
                  Phone
                </p>
              </div>

              {/* Company URL */}
              <div className="relative flex items-center w-full form-input-group">
                <Input
                  id="company-url"
                  placeholder=" "
                  value={formData.companyUrl}
                  onChange={(e) => handleInputChange('companyUrl', e.target.value)}
                  className="peer Poppins rounded-full text-lg lg:text-xl font-medium p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground transition-all duration-300 focus:scale-105"
                />
                <p
                  className="Poppins absolute left-4 lg:left-6 text-lg lg:text-xl rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200
          peer-placeholder-shown:top-2.5 lg:peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg lg:peer-placeholder-shown:text-xl
          peer-focus:-top-3 lg:peer-focus:-top-4
          peer-not-placeholder-shown:-top-3 lg:peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:bg-background peer-focus:bg-background px-2"
                >
                  Company URL
                </p>
              </div>

              {/* POS Dropdown */}
              <div className="relative flex items-center w-full form-input-group">
                <Select value={formData.pos} onValueChange={(value) => handleInputChange('pos', value)}>
                  <SelectTrigger className="peer Poppins rounded-full text-lg lg:text-xl w-full font-medium p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground">
                    <SelectValue placeholder="Shopify" />
                  </SelectTrigger>
                  <SelectContent className="Poppins rounded-2xl text-lg lg:text-xl w-full font-medium bg-background text-foreground border-2 border-foreground">
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="toast">Toast</SelectItem>
                    <SelectItem value="clover">Clover</SelectItem>
                    <SelectItem value="shopify">Shopify POS</SelectItem>
                  </SelectContent>
                </Select>
                <p
                  className="Poppins absolute left-4 lg:left-6 text-lg lg:text-xl rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200
          peer-placeholder-shown:top-2.5 lg:peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg lg:peer-placeholder-shown:text-xl
          peer-focus:-top-3 lg:peer-focus:-top-4
          peer-not-placeholder-shown:-top-3 lg:peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:bg-background peer-focus:bg-background px-2"
                >
                  What POS Do You Use?
                </p>
              </div>

              {/* Daily Customers Dropdown */}
              <div className="relative flex items-center w-full form-input-group">
                <Select value={formData.dailyCustomers} onValueChange={(value) => handleInputChange('dailyCustomers', value)}>
                  <SelectTrigger className="peer Poppins rounded-full text-lg lg:text-xl w-full font-medium p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground">
                    <SelectValue placeholder="100-200" />
                  </SelectTrigger>
                  <SelectContent className="Poppins rounded-2xl text-lg lg:text-xl w-full font-medium bg-background text-foreground border-2 border-foreground">
                    <SelectItem value="0-50">0 - 50</SelectItem>
                    <SelectItem value="51-200">51 - 200</SelectItem>
                    <SelectItem value="201-500">201 - 500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
                <p
                  className="Poppins absolute left-4 lg:left-6 text-lg lg:text-xl rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200
          peer-placeholder-shown:top-2.5 lg:peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg lg:peer-placeholder-shown:text-xl
          peer-focus:-top-3 lg:peer-focus:-top-4
          peer-not-placeholder-shown:-top-3 lg:peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:bg-background peer-focus:bg-background px-2"
                >
                  Range of Daily Customers
                </p>
              </div>

              {/* Submit */}
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="Space rounded-full text-base lg:text-lg font-bold px-3 lg:px-4 py-6 lg:py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 form-input-group w-full lg:w-auto"
              >
                <span className="ml-3 lg:ml-4">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </Button>
              
              {/* Submit Message */}
              {submitMessage && (
                <div className={`text-center p-4 rounded-lg text-sm lg:text-base ${
                  submitMessage.includes('Error') 
                    ? 'bg-red-100 text-red-800 border border-red-300' 
                    : 'bg-green-100 text-green-800 border border-green-300'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
          <div ref={imageRef} className="relative w-full lg:w-1/2 h-[400px] lg:h-[600px] overflow-hidden rounded-xl">
            <Image
              src="/signup.jpg" // replace with actual image in public folder
              alt="Contact"
              fill
              className="object-cover rounded-xl hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
