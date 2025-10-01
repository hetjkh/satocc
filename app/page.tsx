"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavBar from "@/components/Home/NavBar";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-background text-foreground">
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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-[50%] via-white/50 via-[75%] to-white to-[100%]"></div>
        <div className="relative flex justify-between items-end w-[95%] lg:w-full mb-10 max-w-7xl">
          <div className="w-full lg:w-[50%] justify-start items-start text-left">
            <h1 className="Space text-4xl lg:text-6xl uppercase font-bold mb-5">
              skip the line <br /> & shop smart!
            </h1>
            <p className="block lg:hidden Poppins text-sm font-medium mb-5">
              Satocci makes shopping seamless by letting you scan and pay
              instantly so you skip the line and enjoy faster smarter
              sustainable shopping.
            </p>

            <div className="flex justify-start items-start gap-2">
              <Button className="Space rounded-full text-xl lg:text-2xl font-bold p-6 lg:p-7 uppercase bg-white text-black border-2 border-black">
                Free demo
              </Button>
              <Button className="flex justify-center items-center Space rounded-full text-md w-13 h-13 lg:w-15 lg:h-15 font-bold p-0 lg:p-2 uppercase bg-white text-black border-2 border-black">
                <Image src="/icons/play.png" alt="" height={30} width={30} />
              </Button>
              <Button className="flex justify-center items-center Space rounded-full text-md w-13 h-13 lg:w-15 lg:h-15 font-bold p-0 lg:p-2 uppercase bg-white text-black border-2 border-black">
                <Image src="/icons/apple.png" alt="" height={35} width={35} />
              </Button>
            </div>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p className="Poppins text-md font-medium">
              Satocci makes shopping seamless by letting you scan and pay
              instantly so you skip the line and enjoy faster smarter
              sustainable shopping.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
