"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";

export default function AppShowcaseSection() {
  return (
    <section className="relative flex justify-center items-center w-full min-h-[100vh] h-auto z-10 my-30 bg-transparent overflow-hidden">
      <div className="w-7xl">
        <div className="relative flex flex-col lg:flex-row justify-between items-center w-full min-h-[100vh]">
          
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-start">
            <div className="w-full">
              <h2 className="Space text-3xl lg:text-5xl uppercase font-semibold text-foreground w-full mb-8">
                CHOOSE YOUR FAVORITE
                <br />
                ITEMS. SCAN & PAY VIA
                <br />
                MOBILE. IT'S THAT
                <br />
                <span className="text-3xl lg:text-4xl xl:text-5xl">SIMPLE!</span>
              </h2>
              
              <p className="Poppins text-sm font-medium max-w-xl mb-32">
                With Satocci you scan and pay in seconds and skip
                the line so shopping becomes faster smarter and
                easier using only your mobile.
              </p>
              <Button className="Space rounded-full text-md font-bold px-2 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer">
                <span className="ml-3">SEE HOW IT WORKS</span>
                <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                  <MoveUpRight />
                </div>
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
          </div>
        </div>
      </div>
                <div className="absolute bottom-0 right-0 w-full h-full max-w-xl">
              <Image
                src="/apphand.png"
                alt="Satocci in action - seamless shopping experience"
                width={600}
                height={600}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
    </section>
  );
}
