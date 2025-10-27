"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Search, Loader2, MoveUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Post {
  _id: string;
  content: string;
  title: string;
  platform: string;
  status: string;
  linkedinPostId?: string;
  uploadedImages?: string[];
  postToLinkedIn?: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:5000';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for animations
  const heroBadgeRef = useRef<HTMLButtonElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const featuredCardRef = useRef<HTMLDivElement>(null);
  const recentPostsRef = useRef<HTMLDivElement>(null);
  const gridTitleRef = useRef<HTMLHeadingElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        const data = await response.json();

        if (data.success) {
          const publishedPosts = data.data.filter(
            (post: Post) => post.status === 'posted' || post.status === 'saved'
          );
          setPosts(publishedPosts);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible
      if (heroBadgeRef.current) gsap.set(heroBadgeRef.current, { opacity: 1 });
      if (heroTitleRef.current) gsap.set(heroTitleRef.current, { opacity: 1 });
      if (heroDescRef.current) gsap.set(heroDescRef.current, { opacity: 1 });

      // Hero Badge Animation
      if (heroBadgeRef.current) {
        gsap.fromTo(heroBadgeRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
        );
      }

      // Hero Title Animation
      if (heroTitleRef.current) {
        gsap.fromTo(heroTitleRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
        );
      }

      // Hero Description Animation
      if (heroDescRef.current) {
        gsap.fromTo(heroDescRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
        );
      }

      // Search Section Animation
      if (searchSectionRef.current) {
        gsap.set(searchSectionRef.current, { opacity: 1 });
        gsap.fromTo(searchSectionRef.current,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: searchSectionRef.current,
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

      // Featured Card Animation
      if (featuredCardRef.current) {
        gsap.set(featuredCardRef.current, { opacity: 1 });
        gsap.fromTo(featuredCardRef.current,
          { opacity: 0, x: -60, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: featuredCardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }

      // Recent Posts Animation
      if (recentPostsRef.current) {
        const posts = recentPostsRef.current.children;
        if (posts.length > 0) {
          gsap.set(posts, { opacity: 1 });
          gsap.fromTo(posts,
            { opacity: 0, x: 60, scale: 0.9 },
            {
              scrollTrigger: {
                trigger: recentPostsRef.current,
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
      }

      // Grid Title Animation
      if (gridTitleRef.current) {
        gsap.set(gridTitleRef.current, { opacity: 1 });
        gsap.fromTo(gridTitleRef.current,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: gridTitleRef.current,
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

      // Grid Cards Animation
      if (gridContainerRef.current) {
        const cards = gridContainerRef.current.children;
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 1 });
          gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              scrollTrigger: {
                trigger: gridContainerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
            }
          );
        }
      }

    });

    return () => ctx.revert();
  }, [loading, posts]);

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredPosts[0];
  const recentPosts = filteredPosts.slice(1, 4);
  const gridPosts = filteredPosts.slice(4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <main className="min-h-screen bg-transparent text-foreground relative z-10">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[100vh] w-full flex items-end justify-center text-center">
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
        <div className="relative flex flex-col lg:flex-row justify-between items-end w-[95%] lg:w-full mb-6 sm:mb-10 max-w-7xl gap-6 lg:gap-0">
          <div className="w-full lg:w-[50%] justify-start items-start text-left">
            <Button 
              ref={heroBadgeRef}
              className="Poppins rounded-full text-sm sm:text-lg lg:text-xl font-medium p-4 sm:p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground mb-4 sm:mb-5 hover:scale-105 transition-transform duration-300"
            >
              Latest Insights
            </Button>
            <h1 ref={heroTitleRef} className="Space text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-semibold mb-4 sm:mb-5 lg:mb-0 leading-tight">
              Discover the Future of <br className="hidden sm:block" /> Retail Technology
              <br className="hidden sm:block" /> with Satocci
            </h1>
            <p ref={heroDescRef} className="block lg:hidden Poppins text-xs sm:text-sm font-medium mb-4 sm:mb-5">
              Stay updated with the latest trends, insights, and innovations in retail technology,
              seamless checkout solutions, and the future of shopping.
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p ref={heroDescRef} className="Poppins text-md font-normal">
              Stay updated with the latest trends, insights, and innovations in retail technology,
              seamless checkout solutions, and the future of shopping.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section ref={searchSectionRef} className="flex justify-center items-center w-full py-6 sm:py-8 lg:py-10">
        <div className="relative flex flex-col sm:flex-row justify-between items-center w-[95%] lg:w-full max-w-7xl gap-3 sm:gap-4 lg:gap-5">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="Poppins rounded-full text-sm sm:text-lg lg:text-xl font-medium p-4 sm:p-5 lg:p-6 bg-transparent text-foreground border-2 border-foreground pr-12 transition-all duration-300 focus:scale-105"
            />
            <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-foreground/50" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <Badge variant="outline" className="Poppins rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
              All Posts ({filteredPosts.length})
            </Badge>
            <Badge variant="outline" className="Poppins rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
              LinkedIn
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {loading ? (
        <section className="flex justify-center items-center w-full py-20">
          <Loader2 className="w-12 h-12 animate-spin text-foreground" />
        </section>
      ) : featuredPost ? (
        <section className="flex justify-center items-center w-full py-6 sm:py-8 lg:py-10">
          <div className="relative flex flex-col lg:flex-row justify-between items-start w-[95%] lg:w-full max-w-7xl gap-6 lg:gap-10">
            <div ref={featuredCardRef} className="relative w-full lg:w-[60%]">
              <Card className="border-2 border-foreground rounded-4xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] pt-1 pb-1 px-3 sm:px-6">
                  <div className="relative w-full h-full">
                    <Image
                      src={featuredPost.uploadedImages?.[0] || "/signup.jpg"}
                      alt={featuredPost.title || "Featured Post"}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute top-3 sm:top-4 left-5 sm:left-8">
                    <Badge className="Poppins bg-green-400 text-foreground border-0 text-xs sm:text-sm">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-2 pb-4 sm:pb-6 pl-4 sm:pl-6 pr-4 sm:pr-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-foreground/70">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="Poppins">{formatDate(featuredPost.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="Poppins">{calculateReadTime(featuredPost.content)}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="Poppins">Satocci Team</span>
                    </div>
                  </div>
                  <CardTitle className="Space text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
                    {featuredPost.title || featuredPost.content.substring(0, 100) + '...'}
                  </CardTitle>
                  <p className="Poppins text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6">
                    {featuredPost.content.substring(0, 200)}
                    {featuredPost.content.length > 200 ? '...' : ''}
                  </p>
                  {featuredPost.status === 'posted' && (
                    <Badge variant="outline" className="mb-3 sm:mb-4 text-xs sm:text-sm">Posted to LinkedIn</Badge>
                  )}
                  <Button className="Space rounded-full text-sm sm:text-base lg:text-md font-bold px-2 py-5 sm:py-6 lg:py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer w-full sm:w-auto hover:scale-105">
                    <span className="ml-2 sm:ml-3">READ MORE</span>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                      <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Posts - Desktop & Mobile */}
            <div ref={recentPostsRef} className="w-full lg:w-[35%]">
              <h3 className="Space text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Recent Posts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <div key={post._id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-foreground rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      {post.uploadedImages?.[0] ? (
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex-shrink-0 overflow-hidden">
                          <Image
                            src={post.uploadedImages[0]}
                            alt={post.title || "Post image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-xl flex-shrink-0"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="Space text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 line-clamp-2">
                          {post.title || post.content.substring(0, 50) + '...'}
                        </h4>
                        <p className="Poppins text-xs sm:text-sm text-foreground/70 mb-1 sm:mb-2 line-clamp-2">
                          {post.content.substring(0, 60)}...
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs text-foreground/50">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="Poppins text-xs sm:text-sm text-foreground/70">No recent posts yet</p>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex justify-center items-center w-full py-20">
          <p className="Poppins text-sm sm:text-base lg:text-lg text-foreground/70 px-4 text-center">
            No posts available. Create your first post on the LinkedIn page!
          </p>
        </section>
      )}

      {/* Blog Grid */}
      <section className="flex justify-center items-center w-full py-6 sm:py-8 lg:py-10">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <h2 ref={gridTitleRef} className="Space text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">More Posts</h2>
          <div ref={gridContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {gridPosts.length > 0 ? (
              gridPosts.map((post) => (
                <Card key={post._id} className="border-2 border-foreground rounded-4xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 h-full flex flex-col group">
                  <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] pt-1 pb-2 sm:pb-4 px-3 sm:px-6">
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                      <Image
                        src={post.uploadedImages?.[0] || "/signup.jpg"}
                        alt={post.title || "Post image"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {post.status === 'posted' && (
                      <div className="absolute top-3 sm:top-4 left-5 sm:left-8">
                        <Badge className="Poppins bg-blue-400 text-white border-0 text-xs">
                          Posted to LinkedIn
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="px-4 sm:px-6 pt-1 pb-3 sm:pb-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <CardTitle className="Space text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 text-foreground line-clamp-2">
                        {post.title || post.content.substring(0, 80)}
                      </CardTitle>
                      <p className="Poppins text-xs sm:text-sm text-foreground/80 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                        {post.content}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 mt-2 sm:mt-3">
                      <div className="flex flex-col gap-1">
                        <span className="Poppins text-xs sm:text-sm font-medium text-foreground/70">
                          {formatDate(post.createdAt).toUpperCase()}
                        </span>
                        <span className="Poppins text-xs sm:text-sm font-medium text-foreground/70">
                          {calculateReadTime(post.content)}
                        </span>
                      </div>
                      <Button className="Space rounded-full text-xs sm:text-sm font-bold px-2 py-6 sm:py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer w-full sm:w-auto hover:scale-105">
                        <span className="ml-2">READ MORE</span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                          <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              [
                {
                  title: "FROM SWEDEN TO THE MIDDLE EAST - SATOCCI'S GLOBAL LEAP",
                  description: "We're thrilled to share the incredible journey of Satocci™ - from a \"no\" on Sweden's Dragon's Den to scaling our retail tech solution across the Middle East. Discover how we transformed rejection into global success.",
                  date: "APR 15, 2025",
                  readTime: "2 min read"
                },
                {
                  title: "THE FUTURE OF RETAIL: SCAN-AND-PAY TECHNOLOGY REVOLUTION",
                  description: "Explore how innovative scan-and-pay solutions are transforming the retail landscape, creating seamless shopping experiences, and reducing checkout friction for customers worldwide.",
                  date: "APR 12, 2025",
                  readTime: "3 min read"
                },
                {
                  title: "SUSTAINABLE SHOPPING: HOW SMART CHECKOUT REDUCES WASTE",
                  description: "Learn about the environmental benefits of digital-first shopping experiences and how Satocci's technology contributes to a more sustainable retail ecosystem.",
                  date: "APR 10, 2025",
                  readTime: "4 min read"
                },
                {
                  title: "RETAILER SUCCESS STORIES: IMPLEMENTING SATOCCI",
                  description: "Real stories from retailers who have transformed their checkout experience with Satocci, including increased customer satisfaction and operational efficiency gains.",
                  date: "APR 8, 2025",
                  readTime: "5 min read"
                },
                {
                  title: "TECHNOLOGY TRENDS: THE RISE OF CONTACTLESS PAYMENTS",
                  description: "An in-depth look at how contactless payment technologies are reshaping consumer behavior and what this means for the future of retail.",
                  date: "APR 5, 2025",
                  readTime: "3 min read"
                },
                {
                  title: "CUSTOMER EXPERIENCE: DESIGNING SEAMLESS CHECKOUT FLOWS",
                  description: "Best practices for creating intuitive checkout experiences that keep customers engaged and reduce cart abandonment rates.",
                  date: "APR 3, 2025",
                  readTime: "4 min read"
                }
              ].map((post, index) => (
                <Card key={index} className="border-2 border-foreground rounded-4xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 h-full flex flex-col group">
                  <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] pt-1 pb-2 sm:pb-4 px-3 sm:px-6">
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                      <Image
                        src="/signup.jpg"
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <CardContent className="px-4 sm:px-6 pt-1 pb-3 sm:pb-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <CardTitle className="Space text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 text-foreground">
                        {post.title}
                      </CardTitle>
                      <p className="Poppins text-xs sm:text-sm text-foreground/80 leading-relaxed mb-3 sm:mb-4">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 mt-2 sm:mt-3">
                      <div className="flex flex-col gap-1">
                        <span className="Poppins text-xs sm:text-sm font-medium text-foreground/70">
                          {post.date}
                        </span>
                        <span className="Poppins text-xs sm:text-sm font-medium text-foreground/70">
                          {post.readTime}
                        </span>
                      </div>
                      <Button className="Space rounded-full text-xs sm:text-sm font-bold px-2 py-6 sm:py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer w-full sm:w-auto hover:scale-105">
                        <span className="ml-2">READ MORE</span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                          <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
