"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MusicButton from "@/components/music/MusicButton";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  // Hero refs
  const heroBadgeRef = useRef<HTMLButtonElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);

  // Core identity refs
  const coreIdentityRef = useRef<HTMLDivElement>(null);

  // Story section refs
  const storyBadgeRef = useRef<HTMLDivElement>(null);
  const storyTitleRef = useRef<HTMLHeadingElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);
  const storyImageRef = useRef<HTMLDivElement>(null);

  // CEO section refs
  const ceoImageRef = useRef<HTMLDivElement>(null);
  const ceoContentRef = useRef<HTMLDivElement>(null);
  const ceoStatsRef = useRef<HTMLDivElement>(null);

  // Team section refs
  const teamHeaderRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([heroBadgeRef.current, heroTitleRef.current, heroDescRef.current], { opacity: 1 });

      // === HERO SECTION ANIMATIONS ===
      if (heroBadgeRef.current) {
        gsap.fromTo(heroBadgeRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
        );
      }

      if (heroTitleRef.current) {
        gsap.fromTo(heroTitleRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
        );
      }

      if (heroDescRef.current) {
        gsap.fromTo(heroDescRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
        );
      }

      // === CORE IDENTITY SECTION ===
      if (coreIdentityRef.current) {
        const identityItems = coreIdentityRef.current.querySelectorAll('.identity-item');
        if (identityItems.length > 0) {
          gsap.set(identityItems, { opacity: 1 });
          identityItems.forEach((item) => {
            const title = item.querySelector('.identity-title');
            const description = item.querySelector('.identity-description');
            const line = item.querySelector('.identity-line');

            gsap.fromTo(title,
              { opacity: 0, x: -50 },
              {
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out",
              }
            );

            gsap.fromTo(description,
              { opacity: 0, x: 50 },
              {
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: 0.1,
                ease: "power2.out",
              }
            );

            if (line) {
              gsap.fromTo(line,
                { scaleX: 0 },
                {
                  scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                  scaleX: 1,
                  duration: 0.8,
                  delay: 0.2,
                  ease: "power2.out",
                  transformOrigin: "left center",
                }
              );
            }
          });
        }
      }

      // === STORY SECTION ===
      if (storyBadgeRef.current) {
        gsap.set(storyBadgeRef.current, { opacity: 1 });
        gsap.fromTo(storyBadgeRef.current,
          { opacity: 0, scale: 0.8 },
          {
            scrollTrigger: {
              trigger: storyBadgeRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          }
        );
      }

      if (storyTitleRef.current) {
        gsap.set(storyTitleRef.current, { opacity: 1 });
        gsap.fromTo(storyTitleRef.current,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: storyTitleRef.current,
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

      if (storyContentRef.current) {
        gsap.set(storyContentRef.current, { opacity: 1 });
        const paragraphs = storyContentRef.current.querySelectorAll('p, button');
        gsap.fromTo(paragraphs,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: storyContentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      if (storyImageRef.current) {
        gsap.set(storyImageRef.current, { opacity: 1 });
        gsap.fromTo(storyImageRef.current,
          { opacity: 0, scale: 0.9, x: 60 },
          {
            scrollTrigger: {
              trigger: storyImageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          }
        );

        // Floating animation
        gsap.to(storyImageRef.current, {
          y: -12,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // === CEO SECTION ===
      if (ceoImageRef.current) {
        gsap.set(ceoImageRef.current, { opacity: 1 });
        gsap.fromTo(ceoImageRef.current,
          { opacity: 0, scale: 0.9, x: -60 },
          {
            scrollTrigger: {
              trigger: ceoImageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }

      if (ceoContentRef.current) {
        gsap.set(ceoContentRef.current, { opacity: 1 });
        const quotes = ceoContentRef.current.querySelectorAll('p');
        gsap.fromTo(quotes,
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: ceoContentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      }

      if (ceoStatsRef.current) {
        gsap.set(ceoStatsRef.current, { opacity: 1 });
        const stats = ceoStatsRef.current.children;
        gsap.fromTo(stats,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: ceoStatsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // === TEAM SECTION ===
      if (teamHeaderRef.current) {
        gsap.set(teamHeaderRef.current, { opacity: 1 });
        const headerElements = teamHeaderRef.current.querySelectorAll('h2, p');
        gsap.fromTo(headerElements,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: teamHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      if (teamGridRef.current) {
        const teamCards = teamGridRef.current.children;
        if (teamCards.length > 0) {
          gsap.set(teamCards, { opacity: 1 });
          gsap.fromTo(teamCards,
            { opacity: 0, y: 60, scale: 0.9, rotationY: 10 },
            {
              scrollTrigger: {
                trigger: teamGridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power2.out",
            }
          );
        }
      }

    });

    return () => ctx.revert();
  }, []);

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
            <Button ref={heroBadgeRef} className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6 bg-transparent text-foreground border-2 border-foreground mb-5 hover:scale-105 transition-transform duration-300">
              About Satocci
            </Button>
            <h1 ref={heroTitleRef} className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5 lg:mb-0">
              Revolutionizing Retail <br /> Through Innovation
              <br /> and Technology
            </h1>
            <p ref={heroDescRef} className="block lg:hidden Poppins text-sm font-medium mb-5">
              We&apos;re transforming the retail experience with cutting-edge scan-and-pay technology, 
              creating seamless shopping experiences for customers worldwide.
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p ref={heroDescRef} className="Poppins text-md font-normal">
              We&apos;re transforming the retail experience with cutting-edge scan-and-pay technology, 
              creating seamless shopping experiences for customers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Core Identity Section */}
      <section ref={coreIdentityRef} className="flex justify-center items-center w-full py-20">
        <div className="relative w-[95%] lg:w-full max-w-full pl-20">
          <div className="space-y-12">
            {/* WHO WE ARE */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    WHO WE ARE
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    We&apos;re driven by the everyday challenges shoppers and retailers face, turning technology into trust and ease, one payment at a time.
                  </p>
                </div>
              </div>
            </div>

            {/* WHAT WE BELIEVE */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    WHAT WE BELIEVE
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    Our mission is to revolutionize the way people engage in transactions, simplifying the payment process through cutting-edge technology.
                  </p>
                </div>
              </div>
            </div>

            {/* OUR MISSION */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    OUR MISSION
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    To simplify shopping by delivering faster, smarter, and greener checkout experiences for consumers and retailers worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* OUR VISION */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    OUR VISION
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    To create a future where every store offers seamless shopping without lines, delays, or waste.
                  </p>
                </div>
                <div className="h-px bg-foreground/20 mt-6 absolute -left-[50vw] right-0 identity-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="flex justify-center items-center w-full py-20">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={storyContentRef}>
              <div ref={storyBadgeRef}>
              <Badge className="Poppins bg-green-400 text-foreground border-0 mb-4">
                Our Journey
              </Badge>
              </div>
              <h2 ref={storyTitleRef} className="Space text-4xl lg:text-5xl uppercase font-semibold mb-6">
                From Sweden to the World
              </h2>
              <p className="Poppins text-lg font-normal mb-6 text-foreground/80">
                Satocci™ began as a vision to revolutionize retail technology. Despite initial challenges, 
                including a &quot;no&quot; on Sweden&apos;s Dragon&apos;s Den, we persevered and transformed rejection into 
                global success.
              </p>
              <p className="Poppins text-lg font-normal mb-8 text-foreground/80">
                Today, we&apos;re scaling our retail tech solution across the Middle East and beyond, 
                helping retailers create seamless, contactless shopping experiences that delight 
                customers and drive business growth.
              </p>
              <Button className="Space rounded-full text-lg font-medium py-4 px-8 bg-green-400 text-foreground border-2 border-foreground hover:scale-105 hover:shadow-lg transition-all duration-300">
                Learn More About Our Journey
              </Button>
            </div>
            <div ref={storyImageRef} className="relative h-[500px] overflow-hidden rounded-4xl">
              <Image
                src="/signup.jpg"
                alt="Satocci Team"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CEO Profile Section */}
      <section className="flex justify-center items-center w-full py-16">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div ref={ceoImageRef} className="relative h-[500px] overflow-hidden rounded-3xl">
              <Image
                src="/team/melodi.png"
                alt="Melodi Askelöf - CEO & Co-Founder"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="Space text-xl font-bold uppercase mb-2">HELLO!</p>
                <p className="Space text-2xl font-bold uppercase mb-2">I&apos;M MELODI ASKELÖF</p>
                <p className="Poppins text-base font-medium uppercase text-white/90">CEO & CO-FOUNDER, SATOCCI</p>
              </div>
            </div>
            <div>
              <div ref={ceoContentRef} className="space-y-5">
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                  &quot;With over 15+ years of experience across banking, finance, sales, marketing, and telecommunications, 
                  I&apos;ve always believed in the power of trust, relationships, and innovation to transform industries.&quot;
                </p>
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                  &quot;That&apos;s why I co-founded <strong>Satocci</strong> – to create a smarter, simpler, and more sustainable 
                  way to shop. We&apos;re eliminating the friction that has plagued traditional shopping experiences for decades.&quot;
                </p>
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                  &quot;For me, technology is about freedom. <strong>Satocci</strong>&apos;s mission is to make checkout lines obsolete 
                  and make paying as easy as a single scan.&quot;
                </p>
              </div>
              
              <div ref={ceoStatsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-foreground/5 rounded-2xl p-5 text-left hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">15+ Years of Experience</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    Across Banking, Finance, Sales, Marketing & Telecommunications.
                  </p>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-5 text-left hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">Global Mission</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    Building a shopping experience that connects customers and retailers worldwide.
                  </p>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-5 text-left hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">Future-Ready Retail</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    On a mission to make checkout lines obsolete with Scan & Pay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="flex justify-center items-center w-full py-18">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <div ref={teamHeaderRef} className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-14">
            <div className="lg:col-span-2">
              <h2 className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5">
                MEET OUR TEAM
              </h2>
            </div>
            <div>
              <p className="Poppins text-lg font-normal text-foreground/80">
                Behind Satocci is a passionate team of innovators, designers, and problem-solvers who believe shopping should be faster, smarter, and more enjoyable.
              </p>
            </div>
          </div>
          <div ref={teamGridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Ashok Sahu",
                title: "Chief Technology Officer",
                email: "ashoksahu@satocci.com",
                experience: "+12 years in Software Development, AI & Machine Learning.",
                image: "/team/team2.jpg",
                greeting: "Namaste"
              },
              {
                name: "Michael Rodriguez",
                title: "Head of Product",
                email: "michaelrodriguez@satocci.com",
                experience: "+10 years in Product Strategy & User Experience Design.",
                image: "/team/team3.jpg",
                greeting: "Hello"
              },
              {
                name: "Sarah Chen",
                title: "Head of Engineering",
                email: "sarahchen@satocci.com",
                experience: "+8 years in Full-Stack Development & Cloud Architecture.",
                image: "/team/team4.jpg",
                greeting: "Hello"
              },
              {
                name: "David Kim",
                title: "Head of Business Development",
                email: "davidkim@satocci.com",
                experience: "+14 years in Strategic Partnerships & Global Expansion.",
                image: "/team/team5.jpg",
                greeting: "Namaste"
              },
              {
                name: "Emma Thompson",
                title: "Head of Marketing",
                email: "emmathompson@satocci.com",
                experience: "+9 years in Digital Marketing & Brand Strategy.",
                image: "/team/team6.jpg",
                greeting: "Hello"
              },
              {
                name: "James Wilson",
                title: "Head of Operations",
                email: "jameswilson@satocci.com",
                experience: "+11 years in Operations Management & Process Optimization.",
                image: "/team/team7.jpg",
                greeting: "Hello"
              },
              {
                name: "Lisa Anderson",
                title: "Head of Customer Success",
                email: "lisaanderson@satocci.com",
                experience: "+8 years in Customer Relations & Support Management.",
                image: "/team/team8.jpg",
                greeting: "Hello"
              },
              {
                name: "Robert Brown",
                title: "Senior Software Engineer",
                email: "robertbrown@satocci.com",
                experience: "+7 years in Backend Development & API Design.",
                image: "/team/team9.jpg",
                greeting: "Namaste"
              },
              {
                name: "Maria Garcia",
                title: "UX/UI Designer",
                email: "mariagarcia@satocci.com",
                experience: "+6 years in User Interface Design & User Experience.",
                image: "/team/team10.jpg",
                greeting: "Hello"
              },
              {
                name: "Ahmed Hassan",
                title: "DevOps Engineer",
                email: "ahmedhassan@satocci.com",
                experience: "+9 years in Cloud Infrastructure & Deployment.",
                image: "/team/team11.jpg",
                greeting: "Namaste"
              },
              {
                name: "Jennifer Lee",
                title: "Data Scientist",
                email: "jenniferlee@satocci.com",
                experience: "+10 years in Machine Learning & Data Analytics.",
                image: "/team/team12.jpg",
                greeting: "Hello"
              },
              {
                name: "Carlos Martinez",
                title: "Frontend Developer",
                email: "carlosmartinez@satocci.com",
                experience: "+5 years in React, TypeScript & Modern Web Technologies.",
                image: "/team/team13.jpg",
                greeting: "Hello"
              },
              {
                name: "Priya Sharma",
                title: "Quality Assurance Lead",
                email: "priyasharma@satocci.com",
                experience: "+8 years in Software Testing & Quality Assurance.",
                image: "/team/team14.jpg",
                greeting: "Namaste"
              },
              {
                name: "Thomas Johnson",
                title: "Security Engineer",
                email: "thomasjohnson@satocci.com",
                experience: "+12 years in Cybersecurity & Information Security.",
                image: "/team/team15.jpg",
                greeting: "Hello"
              },
              {
                name: "Fatima Al-Rashid",
                title: "Business Analyst",
                email: "fatimaalrashid@satocci.com",
                experience: "+7 years in Business Process Analysis & Strategy.",
                image: "/team/team16.jpg",
                greeting: "Namaste"
              },
              {
                name: "Kevin O'Connor",
                title: "Mobile App Developer",
                email: "kevinoconnor@satocci.com",
                experience: "+6 years in iOS & Android Development.",
                image: "/team/team17.jpg",
                greeting: "Hello"
              }
            ].map((member, index) => (
              <div key={index} className="bg-card border border-foreground/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-all duration-500 group">
                <div className="relative mb-5">
                  <div className="w-full h-72 bg-foreground/10 rounded-xl overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={288}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-green-400 text-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {member.greeting === "Namaste" ? "🙏 Namaste" : "👋 Hello"}
                  </div>
                </div>
                <h3 className="Space text-xl font-bold mb-2 text-foreground">{member.name}</h3>
                <p className="Poppins text-sm font-semibold text-foreground/80 mb-2">{member.title}</p>
                <p className="Poppins text-xs text-foreground/70 mb-3">{member.email}</p>
                <p className="Poppins text-xs text-foreground/80 leading-relaxed">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Music Player */}
      <MusicButton />

      {/* Footer */}
      <Footer />
    </main>
  );
}
