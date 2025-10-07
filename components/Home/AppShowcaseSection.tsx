"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AppShowcaseSection() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
          
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-start">
            <div className="max-w-lg">
              <h2 className="Space text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-8 leading-tight">
                CHOOSE YOUR FAVORITE
                <br />
                ITEMS. SCAN & PAY VIA
                <br />
                MOBILE. IT'S THAT
                <br />
                <span className="text-3xl lg:text-4xl xl:text-5xl">SIMPLE!</span>
              </h2>
              
              <p className="Poppins text-base lg:text-lg text-muted-foreground leading-relaxed mb-32">
                With Satocci you scan and pay in seconds and skip
                the line so shopping becomes faster smarter and
                easier using only your mobile.
              </p>
              
              <Button className="inline-flex items-center gap-4 Space text-lg font-bold px-6 py-6 rounded-full border-2 border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 w-fit">
                <span>SEE HOW IT WORKS</span>
                <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    className="text-background"
                  >
                    <path 
                      d="M4 12L12 4M12 4H4M12 4V12" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Image
                src="/signup.jpg"
                alt="Satocci in action - seamless shopping experience"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[600px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
