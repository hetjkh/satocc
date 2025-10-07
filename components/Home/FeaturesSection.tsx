"use client";

import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-20">
          <div className="lg:w-1/2">
            <h2 className="Space text-4xl lg:text-5xl font-bold text-foreground mb-4">
              SAY GOODBYE TO
              <br />
              <span className="text-5xl lg:text-6xl">STRESSFUL SHOPPING</span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              Imagine shopping without the stress of waiting in line. No crumpled receipts. No missing out on rewards. 
              With Satocci™ every shopping trip feels smoother lighter and more rewarding.
            </p>
          </div>
        </div>

        {/* Features Cards Row 1 */}
        <div className="relative mb-20">
          {/* Main Feature Card - Fixed Width */}
          <div className="w-full max-w-xl bg-card rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <div className="h-96 relative p-6">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Freedom from Waiting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6 pt-4">
              <h3 className="Space text-3xl font-bold text-foreground mb-4">
                Freedom from Waiting
              </h3>
              <p className="Poppins text-lg text-muted-foreground leading-relaxed">
                Walk out as soon as you finish. No lines. No wasted time. Just freedom to enjoy your day.
              </p>
            </div>
          </div>

          {/* Secondary Feature Card - Blurred & Smaller - Positioned Absolutely */}
          <div className="absolute top-1/2 right-0 w-[28rem] -translate-y-1/2 bg-card rounded-3xl shadow-xl overflow-hidden opacity-60 blur-sm hover:opacity-80 hover:blur-none transition-all duration-500">
            <div className="h-64 relative p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/signup.jpg"
                  alt="Smart Receipts"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4 pt-3">
              <h3 className="Space text-lg font-bold text-foreground mb-3">
                Smart Receipts
              </h3>
              <p className="Poppins text-sm text-muted-foreground leading-relaxed">
                Digital receipts that never fade or get lost. Organize, share, and track your purchases effortlessly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
