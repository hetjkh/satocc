"use client";

import Image from "next/image";

export default function NewsroomSection() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-32">
          <div className="lg:w-1/2">
            <h2 className="Space text-4xl lg:text-5xl font-bold text-foreground mb-4">
              LATEST NEWS & INSIGHTS
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              Stay updated with Satocci's journey — from product updates and industry trends to stories 
              shaping the future of shopping and payments.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {/* Card 1 - Satocci Partners with TheBlock */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Partners with TheBlock. for Seamless Retail Innovation
                </h3>
              </div>
            </div>

            {/* Card 2 - Satocci Partners with Fakhruddin */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Partners with Fakhruddin General Trading LLC
                </h3>
              </div>
            </div>

            {/* Card 3 - The Fin-Tech Summit */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  The Fin-Tech Summit Seamless Middle East
                </h3>
              </div>
            </div>

            {/* Additional Cards for Carousel Effect */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Wins Retail Innovation Award 2024
                </h3>
              </div>
            </div>

            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Partnership announcement" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
               <div className="p-6 pt-4">
                 <h3 className="Space text-[16px] font-semibold text-foreground leading-tight">
                  Satocci Featured at Dubai Tech Summit 2024
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
