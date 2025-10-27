"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, MoveUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Store {
  id: string;
  name: string;
  address: string;
  logo: string;
  logoText?: string;
}

const stores: Store[] = [
  {
    id: "1",
    name: "GOLDSTAR",
    address: "67JF+43F ALUAELL SAUDI ARABIA",
    logo: "/icons/goldstar-logo.png",
    logoText: "Goldstar"
  },
  {
    id: "2",
    name: "ALHATABBAKERY-MADINAH",
    address: "AL ARIDH, MADINAH 42314 SAUDI ARABIA",
    logo: "/icons/alhatab-logo.png",
    logoText: "الحطب"
  },
  {
    id: "3",
    name: "PANDA",
    address: "PRINCE SULTAN RD, JEDDAH SAUDI ARABIA",
    logo: "/icons/panda-logo.png",
    logoText: "بنده"
  },
  {
    id: "4",
    name: "CENOMI-JEDDAH",
    address: "RED SEA MALL DISTRICT, طريق الملك عبد العزيز الفرعي، الشاطئ. SAUDI ARABIA",
    logo: "/icons/cenomi-logo.png"
  }
];

export default function StoreLocatorSection() {
  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);
  const storeListRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  // Carousel state
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);

  // Carousel navigation functions
  const nextStore = () => {
    setCurrentStoreIndex((prev) => (prev + 1) % stores.length);
  };

  const previousStore = () => {
    setCurrentStoreIndex((prev) => (prev - 1 + stores.length) % stores.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([
        headerBadgeRef.current,
        headerTitleRef.current,
        headerDescRef.current,
        searchSectionRef.current,
        searchInputRef.current,
        storeListRef.current,
        mapSectionRef.current
      ], { opacity: 1 });

      // Header animations
      if (headerBadgeRef.current) {
        gsap.fromTo(headerBadgeRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            scrollTrigger: {
              trigger: headerBadgeRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          }
        );
      }

      if (headerTitleRef.current) {
        gsap.fromTo(headerTitleRef.current,
          { opacity: 0, y: 60 },
          {
            scrollTrigger: {
              trigger: headerTitleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }

      if (headerDescRef.current) {
        gsap.fromTo(headerDescRef.current,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: headerDescRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }

      // Search section animation
      if (searchSectionRef.current) {
        gsap.fromTo(searchSectionRef.current,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: searchSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }

      // Search input animation
      if (searchInputRef.current) {
        gsap.fromTo(searchInputRef.current,
          { opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: searchInputRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }

      // Store list animation
      if (storeListRef.current) {
        const storeCards = storeListRef.current.querySelectorAll('.store-card');
        gsap.fromTo(storeCards,
          { opacity: 0, x: -60, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: storeListRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // Map section animation
      if (mapSectionRef.current) {
        gsap.fromTo(mapSectionRef.current,
          { opacity: 0, scale: 0.95, x: 60 },
          {
            scrollTrigger: {
              trigger: mapSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex justify-center items-center w-full py-12 sm:py-16 lg:py-20 bg-background">
      <div className="relative w-[95%] lg:w-full max-w-7xl px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div ref={headerBadgeRef} className="mb-4">
            <Badge className="Poppins bg-green-400 text-foreground border-0 text-xs sm:text-sm">
              Store Locator
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h2 ref={headerTitleRef} className="Space text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-semibold mb-4 sm:mb-6 leading-tight">
                FIND SATOCCI NEAR YOU,<br />
                ANYWHERE IN THE<br />
                WORLD
              </h2>
            </div>
            <div className="flex items-start">
              <p ref={headerDescRef} className="Poppins text-sm sm:text-base lg:text-lg font-normal text-foreground/80 leading-relaxed">
                Discover the future of shopping without borders. With Satocci, you&apos;re never far from a smarter, faster checkout experience. Spin the globe, explore our partner stores, and step into the new era of retail — where lines are optional, but convenience is guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div ref={searchSectionRef} className="flex justify-center mb-6 sm:mb-8">
          <div ref={searchInputRef} className="relative w-full max-w-sm sm:max-w-md">
            <div className="flex items-center bg-card rounded-full border border-foreground/20 shadow-sm overflow-hidden">
              <input
                type="text"
                placeholder="SEARCH STORE"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-foreground placeholder-foreground/60 bg-transparent focus:outline-none"
              />
              <button className="bg-foreground text-background p-2 sm:p-3 rounded-full m-1 hover:bg-foreground/90 transition-colors duration-300">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Carousel + Map Below */}
        <div className="lg:hidden">
          {/* Location Carousel */}
          <div ref={storeListRef} className="mb-8">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentStoreIndex * 100}%)` }}>
                  {stores.map((store) => (
                    <div key={store.id} className="w-full flex-shrink-0">
                      <div className="bg-card border border-foreground/20 rounded-2xl p-6 shadow-sm mx-4">
                        <div className="text-center">
                          {/* Store Logo */}
                          <div className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            {store.logoText ? (
                              <div className="text-center">
                                {store.logoText === "Goldstar" ? (
                                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <span className="text-black font-bold text-sm">★</span>
                                  </div>
                                ) : store.logoText === "الحطب" ? (
                                  <div className="text-2xl font-bold text-foreground">الحطب</div>
                                ) : store.logoText === "بنده" ? (
                                  <div className="text-center">
                                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mb-1">
                                      <span className="text-white font-bold text-xs">P</span>
                                    </div>
                                    <div className="text-xs font-bold text-foreground">بنده</div>
                                  </div>
                                ) : (
                                  <div className="text-lg font-bold text-purple-600">CENOMI</div>
                                )}
                              </div>
                            ) : (
                              <div className="w-12 h-12 bg-foreground/20 rounded-lg"></div>
                            )}
                          </div>
                          
                          {/* Store Info */}
                          <h3 className="Space text-lg font-bold text-foreground mb-2">
                            {store.name}
                          </h3>
                          <p className="Poppins text-sm text-foreground/70 leading-relaxed mb-6">
                            {store.address}
                          </p>
                          
                          {/* Get Directions Button */}
                          <Button 
                            className="Space rounded-full text-sm font-bold px-4 py-3 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105"
                          >
                            <span className="ml-2">GET DIRECTIONS</span>
                            <div className="w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center">
                              <MoveUpRight className="w-4 h-4" />
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button 
                onClick={previousStore}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-card border border-foreground/20 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button 
                onClick={nextStore}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-card border border-foreground/20 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {stores.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStoreIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStoreIndex ? 'bg-foreground' : 'bg-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Map Section - Below Carousel */}
          <div ref={mapSectionRef} className="relative">
            <div className="bg-card border border-foreground/20 rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-[300px] bg-foreground/5">
                {/* Placeholder for map */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
                  <div className="text-center px-4">
                    <MapPin className="w-12 h-12 text-foreground/40 mx-auto mb-3" />
                    <p className="Poppins text-base font-medium text-foreground mb-2">Interactive Map</p>
                    <p className="Poppins text-xs text-foreground/70">
                      Store locations will be displayed here
                    </p>
                  </div>
                </div>
                
                {/* Map attribution */}
                <div className="absolute bottom-3 left-3">
                  <span className="Poppins text-xs text-foreground/70 bg-card px-2 py-1 rounded shadow-sm border border-foreground/20">
                    Google Maps
                  </span>
                </div>

                {/* Map Action Button */}
                <div className="absolute bottom-3 right-3">
                  <Button 
                    className="Space rounded-full text-sm font-bold px-3 py-3 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <span className="ml-2">EXPLORE MAP</span>
                    <div className="w-6 h-6 bg-background text-foreground rounded-full flex items-center justify-center">
                      <MapPin className="w-3 h-3" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:grid grid-cols-2 gap-8">
          {/* Store List */}
          <div ref={storeListRef} className="space-y-4">
            {stores.map((store) => (
              <div key={store.id} className="store-card bg-card border border-foreground/20 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  {/* Store Logo */}
                  <div className="flex-shrink-0 w-16 h-16 bg-foreground/10 rounded-xl flex items-center justify-center">
                    {store.logoText ? (
                      <div className="text-center">
                        {store.logoText === "Goldstar" ? (
                          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-sm">★</span>
                          </div>
                        ) : store.logoText === "الحطب" ? (
                          <div className="text-2xl font-bold text-foreground">الحطب</div>
                        ) : store.logoText === "بنده" ? (
                          <div className="text-center">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mb-1">
                              <span className="text-white font-bold text-xs">P</span>
                            </div>
                            <div className="text-xs font-bold text-foreground">بنده</div>
                          </div>
                        ) : (
                          <div className="text-lg font-bold text-purple-600">CENOMI</div>
                        )}
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-foreground/20 rounded-lg"></div>
                    )}
                  </div>

                  {/* Store Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="Space text-lg font-bold text-foreground mb-1 truncate">
                      {store.name}
                    </h3>
                    <p className="Poppins text-sm text-foreground/70 leading-relaxed">
                      {store.address}
                    </p>
                  </div>

                   {/* Get Directions Button */}
                   <div className="flex-shrink-0">
                     <Button 
                       className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105"
                     >
                       <span className="ml-3">GET DIRECTIONS</span>
                       <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                         <MoveUpRight className="w-4 h-4" />
                       </div>
                     </Button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div ref={mapSectionRef} className="relative">
            <div className="bg-card border border-foreground/20 rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-[500px] bg-foreground/5">
                {/* Placeholder for map */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-foreground/40 mx-auto mb-4" />
                    <p className="Poppins text-lg font-medium text-foreground mb-2">Interactive Map</p>
                    <p className="Poppins text-sm text-foreground/70">
                      Store locations will be displayed here
                    </p>
                  </div>
                </div>
                
                 {/* Map attribution */}
                 <div className="absolute bottom-4 left-4">
                   <span className="Poppins text-xs text-foreground/70 bg-card px-2 py-1 rounded shadow-sm border border-foreground/20">
                     Google Maps
                   </span>
                 </div>

                 {/* Map Action Button */}
                 <div className="absolute bottom-4 right-4">
                   <Button 
                     className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer hover:scale-105"
                   >
                     <span className="ml-3">EXPLORE MAP</span>
                     <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                       <MapPin className="w-4 h-4" />
                     </div>
                   </Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
