"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MoveUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  _id: string;
  name: string;
  title: string;
  email: string;
  experience: string;
  image: string;
  order: number;
  isActive: boolean;
}

export default function AboutPage() {
  const { t } = useLanguage();
  
  // State for team members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  // Hero refs
  const heroBadgeRef = useRef<HTMLButtonElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);

  // Core identity refs
  const coreIdentityRef = useRef<HTMLDivElement>(null);

  // Story section refs
  const storyBadgeRef = useRef<HTMLButtonElement>(null);
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

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoadingTeam(true);
        const response = await fetch("http://localhost:5000/api/team-members");
        const data = await response.json();
        if (data.success) {
          setTeamMembers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeamMembers();
  }, []);


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
            <Button ref={heroBadgeRef} className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6 bg-transparent text-foreground border-2 border-foreground mb-5 hover:scale-105 hover:bg-foreground hover:text-background transition-all duration-300">
              {t('about.hero.badge')}
            </Button>
            <h1 ref={heroTitleRef} className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5 lg:mb-0 whitespace-pre-line">
              {t('about.hero.title')}
            </h1>
            <p ref={heroDescRef} className="block lg:hidden Poppins text-sm font-medium mb-5 whitespace-pre-line">
              {t('about.hero.description')}
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p ref={heroDescRef} className="Poppins text-md font-normal whitespace-pre-line">
              {t('about.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Core Identity Section */}
      <section ref={coreIdentityRef} className="flex justify-center items-center w-full py-12 sm:py-16 lg:py-20">
        <div className="relative w-[95%] lg:w-full max-w-full px-4 sm:px-6 lg:pl-20">
          {/* Mobile Layout - Card-based Design */}
          <div className="lg:hidden">
            <div className="space-y-6 sm:space-y-8">
              {/* WHO WE ARE */}
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 sm:p-8 identity-item hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground text-background rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold">01</span>
                  </div>
                  <h3 className="Space text-xl sm:text-2xl font-semibold uppercase identity-title">
                    {t('about.identity.whoWeAre')}
                  </h3>
                </div>
                <div className="h-px bg-foreground/20 mb-4 identity-line"></div>
                <p className="Poppins text-sm sm:text-base font-normal text-foreground/80 leading-relaxed identity-description">
                  {t('about.identity.whoWeAreDesc')}
                </p>
              </div>

              {/* WHAT WE BELIEVE */}
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 sm:p-8 identity-item hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground text-background rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold">02</span>
                  </div>
                  <h3 className="Space text-xl sm:text-2xl font-semibold uppercase identity-title">
                    {t('about.identity.whatWeBelieve')}
                  </h3>
                </div>
                <div className="h-px bg-foreground/20 mb-4 identity-line"></div>
                <p className="Poppins text-sm sm:text-base font-normal text-foreground/80 leading-relaxed identity-description">
                  {t('about.identity.whatWeBelieveDesc')}
                </p>
              </div>

              {/* OUR MISSION */}
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 sm:p-8 identity-item hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground text-background rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold">03</span>
                  </div>
                  <h3 className="Space text-xl sm:text-2xl font-semibold uppercase identity-title">
                    {t('about.identity.ourMission')}
                  </h3>
                </div>
                <div className="h-px bg-foreground/20 mb-4 identity-line"></div>
                <p className="Poppins text-sm sm:text-base font-normal text-foreground/80 leading-relaxed identity-description">
                  {t('about.identity.ourMissionDesc')}
                </p>
              </div>

              {/* OUR VISION */}
              <div className="bg-card border border-foreground/20 rounded-2xl p-6 sm:p-8 identity-item hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground text-background rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold">04</span>
                  </div>
                  <h3 className="Space text-xl sm:text-2xl font-semibold uppercase identity-title">
                    {t('about.identity.ourVision')}
                  </h3>
                </div>
                <div className="h-px bg-foreground/20 mb-4 identity-line"></div>
                <p className="Poppins text-sm sm:text-base font-normal text-foreground/80 leading-relaxed identity-description">
                  {t('about.identity.ourVisionDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original Design */}
          <div className="hidden lg:block">
          <div className="space-y-12">
            {/* WHO WE ARE */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    {t('about.identity.whoWeAre')}
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    {t('about.identity.whoWeAreDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* WHAT WE BELIEVE */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    {t('about.identity.whatWeBelieve')}
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    {t('about.identity.whatWeBelieveDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* OUR MISSION */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    {t('about.identity.ourMission')}
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    {t('about.identity.ourMissionDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* OUR VISION */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 identity-item">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase identity-title">
                    {t('about.identity.ourVision')}
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0 identity-line"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed identity-description">
                    {t('about.identity.ourVisionDesc')}
                  </p>
                </div>
                <div className="h-px bg-foreground/20 mt-6 absolute -left-[50vw] right-0 identity-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="flex justify-center items-center w-full py-12 sm:py-16 lg:py-20">
        <div className="relative w-[95%] lg:w-full max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Mobile Layout - Badge above image */}
            <div className="lg:hidden order-1">
              <Button ref={storyBadgeRef} className="Poppins rounded-full text-sm sm:text-base font-medium px-4 sm:px-5 py-4 sm:py-5 bg-transparent text-foreground border-2 border-foreground mb-4 sm:mb-6 hover:scale-105 hover:bg-foreground hover:text-background transition-all duration-300">
                {t('about.story.badge')}
              </Button>
            </div>
            
            <div ref={storyImageRef} className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-3xl sm:rounded-4xl order-2 lg:order-2">
              <Image
                src="/signup.jpg"
                alt="Satocci Team"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Desktop Layout - Full content */}
            <div ref={storyContentRef} className="hidden lg:block lg:order-1">
              <Button ref={storyBadgeRef} className="Poppins rounded-full text-base lg:text-lg font-medium px-5 py-5 bg-transparent text-foreground border-2 border-foreground mb-6 hover:scale-105 hover:bg-foreground hover:text-background transition-all duration-300">
                {t('about.story.badge')}
              </Button>
              <h2 ref={storyTitleRef} className="Space text-4xl lg:text-5xl uppercase font-semibold mb-6">
                {t('about.story.title')}
              </h2>
              <p className="Poppins text-lg font-normal mb-6 text-foreground/80 whitespace-pre-line">
                {t('about.story.paragraph1')}
              </p>
              <p className="Poppins text-lg font-normal mb-8 text-foreground/80 whitespace-pre-line">
                {t('about.story.paragraph2')}
              </p>
              <Button className="Space rounded-full text-sm sm:text-base lg:text-md font-bold px-2 py-6 lg:py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-2 sm:ml-3">{t('about.story.button')}</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Button>
            </div>
            
            {/* Mobile Layout - Content below image */}
            <div ref={storyContentRef} className="lg:hidden order-3">
              <h2 ref={storyTitleRef} className="Space text-2xl sm:text-3xl md:text-4xl uppercase font-semibold mb-4 sm:mb-6 leading-tight whitespace-pre-line">
                {t('about.story.title')}
              </h2>
              <p className="Poppins text-sm sm:text-base font-normal mb-4 sm:mb-6 text-foreground/80 leading-relaxed whitespace-pre-line">
                {t('about.story.paragraph1')}
              </p>
              <p className="Poppins text-sm sm:text-base font-normal mb-6 sm:mb-8 text-foreground/80 leading-relaxed whitespace-pre-line">
                {t('about.story.paragraph2')}
              </p>
              <Button className="Space rounded-full text-xs sm:text-sm font-bold px-3 sm:px-2 py-4 sm:py-5 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="ml-2 sm:ml-3">{t('about.story.button')}</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Profile Section */}
      <section className="flex justify-center items-center w-full py-12 sm:py-16 lg:py-16">
        <div className="relative w-[95%] lg:w-full max-w-7xl px-4 sm:px-6">
          {/* Mobile Layout - Split-Screen with Interactive Elements */}
          <div className="lg:hidden">
            {/* CEO Image - Top 60% */}
            <div ref={ceoImageRef} className="relative h-[300px] sm:h-[350px] overflow-hidden rounded-2xl mb-6">
              <Image
                src="/team/melodi.png"
                alt="Melodi Askelöf - CEO & Co-Founder"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="Space text-sm font-bold uppercase mb-1">{t('about.ceo.greeting')}</p>
                <p className="Space text-lg font-bold uppercase mb-1">{t('about.ceo.name')}</p>
                <p className="Poppins text-xs font-medium uppercase text-white/90">{t('about.ceo.title')}</p>
              </div>
            </div>

            {/* Interactive Content Sections */}
            <div className="space-y-4">
              {/* Bio Section */}
              <div className="bg-card border border-foreground/20 rounded-xl p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => {
                  const content = document.getElementById('bio-content');
                  const icon = document.getElementById('bio-icon');
                  if (content && icon) {
                    content.classList.toggle('hidden');
                    icon.classList.toggle('rotate-180');
                  }
                }}>
                  <h3 className="Space text-base font-semibold uppercase">About Melodi</h3>
                  <div id="bio-icon" className="w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center transition-transform duration-300">
                    <span className="text-xs">▼</span>
                  </div>
                </div>
                <div id="bio-content" className="mt-4">
                  <p className="Poppins text-sm text-foreground/80 leading-relaxed">
                    With over 15+ years of experience across banking, finance, sales, marketing, and telecommunications, 
                    Melodi brings visionary leadership to revolutionize retail technology.
                  </p>
                </div>
              </div>

              {/* Vision Section */}
              <div className="bg-card border border-foreground/20 rounded-xl p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => {
                  const content = document.getElementById('vision-content');
                  const icon = document.getElementById('vision-icon');
                  if (content && icon) {
                    content.classList.toggle('hidden');
                    icon.classList.toggle('rotate-180');
                  }
                }}>
                  <h3 className="Space text-base font-semibold uppercase">Her Vision</h3>
                  <div id="vision-icon" className="w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center transition-transform duration-300">
                    <span className="text-xs">▼</span>
                  </div>
                </div>
                <div id="vision-content" className="hidden mt-4">
                  <div className="space-y-3">
                    <p className="Poppins text-sm text-foreground/80 leading-relaxed italic">
                      &ldquo;I&apos;ve always believed in the power of trust, relationships, and innovation to transform industries.&rdquo;
                    </p>
                    <p className="Poppins text-sm text-foreground/80 leading-relaxed italic">
                      &ldquo;That&apos;s why I co-founded <strong>Satocci</strong> – to create a smarter, simpler, and more sustainable way to shop.&rdquo;
                    </p>
                    <p className="Poppins text-sm text-foreground/80 leading-relaxed italic">
                      &ldquo;Technology is about freedom. <strong>Satocci</strong>&apos;s mission is to make checkout lines obsolete.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="bg-card border border-foreground/20 rounded-xl p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => {
                  const content = document.getElementById('achievements-content');
                  const icon = document.getElementById('achievements-icon');
                  if (content && icon) {
                    content.classList.toggle('hidden');
                    icon.classList.toggle('rotate-180');
                  }
                }}>
                  <h3 className="Space text-base font-semibold uppercase">Key Achievements</h3>
                  <div id="achievements-icon" className="w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center transition-transform duration-300">
                    <span className="text-xs">▼</span>
                  </div>
                </div>
                <div id="achievements-content" className="hidden mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">15+</span>
                      </div>
                      <div>
                        <p className="Space text-sm font-semibold">Years of Experience</p>
                        <p className="Poppins text-xs text-foreground/70">Banking, Finance, Sales, Marketing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">🌍</span>
                      </div>
                      <div>
                        <p className="Space text-sm font-semibold">Global Mission</p>
                        <p className="Poppins text-xs text-foreground/70">Connecting customers worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">⚡</span>
                      </div>
                      <div>
                        <p className="Space text-sm font-semibold">Future-Ready Retail</p>
                        <p className="Poppins text-xs text-foreground/70">Making checkout lines obsolete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original Design */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div ref={ceoImageRef} className="relative h-[500px] overflow-hidden rounded-3xl">
              <Image
                src="/team/melodi.png"
                alt="Melodi Askelöf - CEO & Co-Founder"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="Space text-xl font-bold uppercase mb-2">{t('about.ceo.greeting')}</p>
                <p className="Space text-2xl font-bold uppercase mb-2">{t('about.ceo.name')}</p>
                <p className="Poppins text-base font-medium uppercase text-white/90">{t('about.ceo.title')}</p>
              </div>
            </div>
            <div>
              <div ref={ceoContentRef} className="space-y-5">
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed whitespace-pre-line">
                  {t('about.ceo.quote1')}
                </p>
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed whitespace-pre-line">
                  {t('about.ceo.quote2')}
                </p>
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed whitespace-pre-line">
                  {t('about.ceo.quote3')}
                </p>
              </div>
              
              <div ref={ceoStatsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-foreground/5 rounded-2xl p-5 text-left hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">{t('about.ceo.experience')}</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    {t('about.ceo.experienceDesc')}
                  </p>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-5 text-left hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">{t('about.ceo.global')}</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    {t('about.ceo.globalDesc')}
                  </p>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-5 text-left hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">{t('about.ceo.future')}</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    {t('about.ceo.futureDesc')}
                  </p>
                  </div>
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
                {t('about.team.title')}
              </h2>
            </div>
            <div>
              <p className="Poppins text-lg font-normal text-foreground/80">
                {t('about.team.description')}
              </p>
            </div>
          </div>
          <div ref={teamGridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loadingTeam ? (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/60">{t('about.team.loading')}</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/60">{t('about.team.empty')}</p>
              </div>
            ) : (
              teamMembers.map((member) => (
                <div key={member._id} className="bg-card border border-foreground/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-all duration-500 group">
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
                  </div>
                  <h3 className="Space text-xl font-bold mb-2 text-foreground">{member.name}</h3>
                  <p className="Poppins text-sm font-semibold text-foreground/80 mb-2">{member.title}</p>
                  <p className="Poppins text-xs text-foreground/70 mb-3">{member.email}</p>
                  <p className="Poppins text-xs text-foreground/80 leading-relaxed">{member.experience}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}


