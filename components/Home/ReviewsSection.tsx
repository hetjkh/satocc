"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Review {
  _id: string;
  name: string;
  role: string;
  content: string;
  type: "text" | "image" | "video";
  mediaUrl?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
}

export default function ReviewsSection() {
  const headerTitleRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from API
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews");
        const data = await response.json();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (loading || reviews.length === 0) return;
    const ctx = gsap.context(() => {
      if (!headerTitleRef.current || !headerDescRef.current || !carouselRef.current) return;

      // Ensure elements are visible by default
      gsap.set([headerTitleRef.current, headerDescRef.current], { opacity: 1 });
      
      const cards = carouselRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.set(cards, { opacity: 1 });
      }

      // Header animations - faster
      gsap.fromTo(headerTitleRef.current,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: headerTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      gsap.fromTo(headerDescRef.current,
        { opacity: 0, x: 50 },
        {
          scrollTrigger: {
            trigger: headerDescRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        }
      );

      // Carousel cards animation - faster and more visible
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: carouselRef.current,
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

        // Individual card hover animations
        Array.from(cards).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    });

    return () => ctx.revert();
  }, [reviews, loading]);

  return (
    <section className="w-full z-10 py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-32">
          <div ref={headerTitleRef} className="lg:w-1/2">
            <h2 className="Space text-4xl lg:text-5xl font-bold text-foreground mb-4">
              WHAT OUR CUSTOMERS SAY
            </h2>
          </div>
          <div ref={headerDescRef} className="lg:w-1/2">
            <p className="Poppins text-lg text-muted-foreground leading-relaxed">
              Real voices. Real experiences. Hear how Satocci is transforming shopping for people and businesses around the world.
            </p>
          </div>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reviews available yet.</p>
            </div>
          ) : (
            <div ref={carouselRef} className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {reviews.map((review) => (
                <div key={review._id} className="flex-shrink-0 w-[450px] bg-card rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {review.type === "text" && (
                    // Text Only Review
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-12">
                        {review.imageUrl && (
                          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                            <Image 
                              src={review.imageUrl} 
                              alt={review.name} 
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="Space text-lg font-bold text-foreground">{review.name}</h4>
                          <p className="Poppins text-sm text-muted-foreground">{review.role}</p>
                        </div>
                      </div>
                      <div className="Poppins text-sm text-muted-foreground leading-relaxed">
                        <p>&quot;{review.content}&quot;</p>
                      </div>
                    </div>
                  )}

                  {review.type === "image" && review.mediaUrl && (
                    // Image with Text Review
                    <>
                      <div className="h-64 relative p-6">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <Image 
                            src={review.mediaUrl} 
                            alt={review.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-6 pt-4">
                        <h3 className="Space text-[16px] font-semibold text-foreground leading-tight mb-3">
                          &quot;{review.content}&quot;
                        </h3>
                        <p className="Poppins text-sm text-muted-foreground">
                          {review.name}, {review.role}
                        </p>
                      </div>
                    </>
                  )}

                  {review.type === "video" && review.mediaUrl && (
                    // Video with Text Review
                    <>
                      <div className="aspect-video relative p-6">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <iframe
                            src={review.mediaUrl}
                            className="w-full h-full"
                            allowFullScreen
                            title={`Review by ${review.name}`}
                          />
                        </div>
                      </div>
                      <div className="p-6 pt-4">
                        <h3 className="Space text-[16px] font-semibold text-foreground leading-tight mb-3">
                          &quot;{review.content}&quot;
                        </h3>
                        <p className="Poppins text-sm text-muted-foreground">
                          {review.name}, {review.role}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
