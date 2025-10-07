"use client";

import Image from "next/image";

export default function ReviewsSection() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-32">
          <div className="lg:w-1/2">
            <h2 className="Space text-4xl lg:text-5xl font-bold text-foreground mb-4">
              WHAT OUR CUSTOMERS SAY
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              Real voices. Real experiences. Hear how Satocci is transforming shopping for people and businesses around the world.
            </p>
          </div>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {/* Testimonial 1 */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-12">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image 
                      src="/signup.jpg" 
                      alt="David Gillroy" 
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="Space text-lg font-bold text-foreground">David Gillroy</h4>
                    <p className="Poppins text-sm text-muted-foreground">Consumer</p>
                  </div>
                </div>
                <div className="Poppins text-sm text-muted-foreground leading-relaxed">
                  <p>
                    "I absolutely love how Satocci makes shopping effortless—it lets me skip the long lines and pay instantly with just a quick tap. No more waiting around or fumbling for cash or cards. The whole process feels so much smoother and faster, and on top of that, having all my receipts neatly stored in one place is such a lifesaver. It saves me time, keeps me organized, and makes every shopping trip feel modern and stress-free!"
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Left Section - Image */}
                  <div className="w-32 h-96 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src="/signup.jpg" 
                      alt="David Gillroy" 
                      width={128}
                      height={384}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Right Section - Text */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h4 className="Space text-lg font-bold text-foreground">David Gillroy</h4>
                      <p className="Poppins text-sm text-muted-foreground">- Consumer</p>
                    </div>
                    <div className="Poppins text-sm text-muted-foreground leading-relaxed">
                      <p>
                        "I absolutely love how Satocci makes shopping effortless—it lets me skip the long lines and pay instantly with just a quick tap. No more waiting around or fumbling for cash or cards. The whole process feels so much smoother and faster, and on top of that, having all my receipts neatly stored in one place is such a lifesaver. It saves me time, keeps me organized, and makes every shopping trip feel modern and stress-free!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Customer testimonial" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6 pt-4">
                <h3 className="Space text-[16px] font-semibold text-foreground leading-tight mb-3">
                  "Satocci's technology has transformed how we think about retail innovation."
                </h3>
                <p className="Poppins text-sm text-muted-foreground">
                  Emma Rodriguez, Tech Director
                </p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Customer testimonial" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6 pt-4">
                <h3 className="Space text-[16px] font-semibold text-foreground leading-tight mb-3">
                  "Our customers love the convenience and speed of Satocci's checkout process."
                </h3>
                <p className="Poppins text-sm text-muted-foreground">
                  David Park, Operations Manager
                </p>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 relative p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/signup.jpg" 
                    alt="Customer testimonial" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6 pt-4">
                <h3 className="Space text-[16px] font-semibold text-foreground leading-tight mb-3">
                  "Implementing Satocci was the best decision for our business growth."
                </h3>
                <p className="Poppins text-sm text-muted-foreground">
                  Lisa Thompson, CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
