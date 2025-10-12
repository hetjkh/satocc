// app/blogs/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MusicButton from "@/components/music/MusicButton";

export default function BlogPage() {
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
            <Button className="Poppins rounded-full text-xl lg:text-xl font-medium p-6 lg:p-6 bg-transparent text-foreground border-2 border-foreground mb-5">
              Latest Insights
            </Button>
            <h1 className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5 lg:mb-0">
              Discover the Future of <br /> Retail Technology
              <br /> with Satocci
            </h1>
            <p className="block lg:hidden Poppins text-sm font-medium mb-5">
              Stay updated with the latest trends, insights, and innovations in retail technology, 
              seamless checkout solutions, and the future of shopping.
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p className="Poppins text-md font-normal">
              Stay updated with the latest trends, insights, and innovations in retail technology, 
              seamless checkout solutions, and the future of shopping.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="flex justify-center items-center w-full py-10">
        <div className="relative flex justify-between items-center w-[95%] lg:w-full max-w-7xl gap-5">
          <div className="relative flex-1">
            <Input
              placeholder="Search articles..."
              className="Poppins rounded-full text-xl font-medium p-6 bg-transparent text-foreground border-2 border-foreground pr-12"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-foreground/50" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="Poppins rounded-full px-4 py-2 text-sm font-medium">
              All Topics
            </Badge>
            <Badge variant="outline" className="Poppins rounded-full px-4 py-2 text-sm font-medium">
              Technology
            </Badge>
            <Badge variant="outline" className="Poppins rounded-full px-4 py-2 text-sm font-medium">
              Retail
            </Badge>
            <Badge variant="outline" className="Poppins rounded-full px-4 py-2 text-sm font-medium">
              Innovation
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="flex justify-center items-center w-full py-10">
        <div className="relative flex justify-between items-start w-[95%] lg:w-full max-w-7xl gap-10">
          <div className="relative w-full lg:w-[60%]">
            <Card className="border-2 border-foreground rounded-4xl overflow-hidden">
               <div className="relative h-[250px] pt-1 pb-1 px-6">
                <div className="relative w-full h-full">
                  <Image
                    src="/signup.jpg"
                    alt="Featured Article"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute top-4 left-8">
                  <Badge className="Poppins bg-green-400 text-foreground border-0">
                    Featured
                  </Badge>
                </div>
              </div>
               <CardContent className="pt-2 pb-2 pl-6 pr-2">
                <div className="flex items-center gap-4 mb-4 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="Poppins">Dec 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="Poppins">5 min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="Poppins">Satocci Team</span>
                  </div>
                </div>
                <CardTitle className="Space text-3xl font-semibold mb-4">
                  The Future of Retail: How Scan-and-Pay Technology is Revolutionizing Shopping
                </CardTitle>
                <p className="Poppins text-foreground/80 mb-6">
                  Discover how innovative scan-and-pay solutions are transforming the retail landscape, 
                  creating seamless shopping experiences, and reducing checkout friction for customers worldwide.
                </p>
                <Button className="Space rounded-full text-lg font-medium py-4 px-6 bg-green-400 text-foreground border-2 border-foreground">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:block w-[35%]">
            <div className="space-y-6">
              <h3 className="Space text-2xl font-semibold mb-6">Recent Articles</h3>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 p-4 border-2 border-foreground rounded-2xl">
                  <div className="w-20 h-20 bg-foreground/10 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="Space text-lg font-semibold mb-2">
                      Article Title {item}
                    </h4>
                    <p className="Poppins text-sm text-foreground/70 mb-2">
                      Brief description of the article content...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-foreground/50">
                      <Calendar className="w-3 h-3" />
                      <span>Dec {10 + item}, 2024</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="flex justify-center items-center w-full py-10">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
              <Card key={index} className="border-2 border-foreground rounded-4xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-[300px] pt-1 pb-4 px-6">
                  <div className="relative w-full h-full">
                    <Image
                      src="/signup.jpg"
                      alt={post.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                </div>
                <CardContent className="px-6 pt-1 pb-2 flex flex-col flex-1">
                  <div className="flex-1">
                    <CardTitle className="Space text-xl font-semibold mb-3 text-foreground">
                      {post.title}
                    </CardTitle>
                    <p className="Poppins text-sm text-foreground/80 leading-relaxed mb-4">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex flex-col gap-1">
                      <span className="Poppins text-sm font-medium text-foreground/70">
                        {post.date}
                      </span>
                      <span className="Poppins text-sm font-medium text-foreground/70">
                        {post.readTime}
                      </span>
                    </div>
                    <Button size="lg" className="Poppins rounded-full text-sm font-medium bg-background text-foreground border-2 border-foreground h-12 px-4">
                      READ MORE
                      <span className="flex justify-center items-center ml-2 bg-foreground rounded-full w-5 h-5">
                        <ArrowRight className="w-3 h-3 text-background" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="flex justify-center items-center w-full py-20">
        <div className="relative flex justify-between items-start w-[95%] lg:w-full max-w-7xl">
          <div className="w-full lg:w-[50%]">
            <h2 className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5">
              Stay Updated
            </h2>
            <p className="Poppins text-lg font-medium mb-8">
              Subscribe to our newsletter and get the latest insights on retail technology, 
              innovation trends, and Satocci updates delivered to your inbox.
            </p>
            <div className="flex gap-4">
              <Input
                placeholder="Enter your email"
                className="Poppins rounded-full text-lg font-medium p-4 bg-transparent text-foreground border-2 border-foreground flex-1"
              />
              <Button className="Space rounded-full text-lg font-medium py-4 px-8 bg-green-400 text-foreground border-2 border-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player */}
      <MusicButton />
    </main>
  );
}
