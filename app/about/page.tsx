// app/about/page.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Globe, Heart, Lightbulb } from "lucide-react";
import MusicButton from "@/components/music/MusicButton";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Same as Blog Page */}
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
              About Satocci
            </Button>
            <h1 className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5 lg:mb-0">
              Revolutionizing Retail <br /> Through Innovation
              <br /> and Technology
            </h1>
            <p className="block lg:hidden Poppins text-sm font-medium mb-5">
              We're transforming the retail experience with cutting-edge scan-and-pay technology, 
              creating seamless shopping experiences for customers worldwide.
            </p>
          </div>
          <div className="hidden lg:block w-[40%] justify-start items-end text-left">
            <p className="Poppins text-md font-normal">
              We're transforming the retail experience with cutting-edge scan-and-pay technology, 
              creating seamless shopping experiences for customers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Core Identity Section */}
      <section className="flex justify-center items-center w-full py-20">
        <div className="relative w-[95%] lg:w-full max-w-full pl-20">
          <div className="space-y-12">
            {/* WHO WE ARE */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase">
                    WHO WE ARE
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                    We're driven by the everyday challenges shoppers and retailers face, turning technology into trust and ease, one payment at a time.
                  </p>
                </div>
              </div>
            </div>

            {/* WHAT WE BELIEVE */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase">
                    WHAT WE BELIEVE
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                    Our mission is to revolutionize the way people engage in transactions, simplifying the payment process through cutting-edge technology.
                  </p>
                </div>
              </div>
            </div>

            {/* OUR MISSION */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase">
                    OUR MISSION
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                    To simplify shopping by delivering faster, smarter, and greener checkout experiences for consumers and retailers worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* OUR VISION */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24">
              <div className="w-full lg:w-1/3 lg:pr-12">
                <div className="py-12">
                  <h3 className="Space text-2xl lg:text-3xl font-semibold uppercase">
                    OUR VISION
                  </h3>
                </div>
              </div>
              <div className="w-full lg:w-2/3 relative">
                <div className="h-px bg-foreground/20 mb-6 absolute -left-[50vw] right-0"></div>
                <div className="py-12">
                  <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                    To create a future where every store offers seamless shopping without lines, delays, or waste.
                  </p>
                </div>
                <div className="h-px bg-foreground/20 mt-6 absolute -left-[50vw] right-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="flex justify-center items-center w-full py-20">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="Poppins bg-green-400 text-foreground border-0 mb-4">
                Our Journey
              </Badge>
              <h2 className="Space text-4xl lg:text-5xl uppercase font-semibold mb-6">
                From Sweden to the World
              </h2>
              <p className="Poppins text-lg font-normal mb-6 text-foreground/80">
                Satocci™ began as a vision to revolutionize retail technology. Despite initial challenges, 
                including a "no" on Sweden's Dragon's Den, we persevered and transformed rejection into 
                global success.
              </p>
              <p className="Poppins text-lg font-normal mb-8 text-foreground/80">
                Today, we're scaling our retail tech solution across the Middle East and beyond, 
                helping retailers create seamless, contactless shopping experiences that delight 
                customers and drive business growth.
              </p>
              <Button className="Space rounded-full text-lg font-medium py-4 px-8 bg-green-400 text-foreground border-2 border-foreground">
                Learn More About Our Journey
              </Button>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="/signup.jpg"
                alt="Satocci Team"
                fill
                className="object-cover rounded-4xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CEO Profile Section */}
      <section className="flex justify-center items-center w-full py-16">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative h-[500px]">
              <Image
                src="/team/melodi.png"
                alt="Melodi Askelöf - CEO & Co-Founder"
                fill
                className="object-cover rounded-3xl"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="Space text-xl font-bold uppercase mb-2">HELLO!</p>
                <p className="Space text-2xl font-bold uppercase mb-2">I'M MELODI ASKELÖF</p>
                <p className="Poppins text-base font-medium uppercase text-white/90">CEO & CO-FOUNDER, SATOCCI</p>
              </div>
            </div>
            <div>
              <div className="space-y-5">
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                  "With over 15+ years of experience across banking, finance, sales, marketing, and telecommunications, 
                  I've always believed in the power of trust, relationships, and innovation to transform industries."
                </p>
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                  "That's why I co-founded <strong>Satocci</strong> – to create a smarter, simpler, and more sustainable 
                  way to shop. We're eliminating the friction that has plagued traditional shopping experiences for decades."
                </p>
                <p className="Poppins text-lg font-normal text-foreground/80 leading-relaxed">
                  "For me, technology is about freedom. <strong>Satocci</strong>'s mission is to make checkout lines obsolete 
                  and make paying as easy as a single scan."
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-foreground/5 rounded-2xl p-5 text-left">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">15+ Years of Experience</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    Across Banking, Finance, Sales, Marketing & Telecommunications.
                  </p>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-5 text-left">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">Global Mission</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    Building a shopping experience that connects customers and retailers worldwide.
                  </p>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-5 text-left">
                  <h3 className="Space text-lg font-semibold uppercase mb-3">Future-Ready Retail</h3>
                  <p className="Poppins text-sm text-foreground/80">
                    On a mission to make checkout lines obsolete with Scan & Pay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="flex justify-center items-center w-full py-18">
        <div className="relative w-[95%] lg:w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-14">
            <div className="lg:col-span-2">
              <h2 className="Space text-4xl lg:text-5xl uppercase font-semibold mb-5">
                MEET OUR TEAM
              </h2>
            </div>
            <div>
              <p className="Poppins text-lg font-normal text-foreground/80">
                Behind Satocci is a passionate team of innovators, designers, and problem-solvers who believe shopping should be faster, smarter, and more enjoyable.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Ashok Sahu",
                title: "Chief Technology Officer",
                email: "ashoksahu@satocci.com",
                experience: "+12 years in Software Development, AI & Machine Learning.",
                image: "/team/team2.jpg",
                greeting: "Namaste"
              },
              {
                name: "Michael Rodriguez",
                title: "Head of Product",
                email: "michaelrodriguez@satocci.com",
                experience: "+10 years in Product Strategy & User Experience Design.",
                image: "/team/team3.jpg",
                greeting: "Hello"
              },
              {
                name: "Sarah Chen",
                title: "Head of Engineering",
                email: "sarahchen@satocci.com",
                experience: "+8 years in Full-Stack Development & Cloud Architecture.",
                image: "/team/team4.jpg",
                greeting: "Hello"
              },
              {
                name: "David Kim",
                title: "Head of Business Development",
                email: "davidkim@satocci.com",
                experience: "+14 years in Strategic Partnerships & Global Expansion.",
                image: "/team/team5.jpg",
                greeting: "Namaste"
              },
              {
                name: "Emma Thompson",
                title: "Head of Marketing",
                email: "emmathompson@satocci.com",
                experience: "+9 years in Digital Marketing & Brand Strategy.",
                image: "/team/team6.jpg",
                greeting: "Hello"
              },
              {
                name: "James Wilson",
                title: "Head of Operations",
                email: "jameswilson@satocci.com",
                experience: "+11 years in Operations Management & Process Optimization.",
                image: "/team/team7.jpg",
                greeting: "Hello"
              },
              {
                name: "Lisa Anderson",
                title: "Head of Customer Success",
                email: "lisaanderson@satocci.com",
                experience: "+8 years in Customer Relations & Support Management.",
                image: "/team/team8.jpg",
                greeting: "Hello"
              },
              {
                name: "Robert Brown",
                title: "Senior Software Engineer",
                email: "robertbrown@satocci.com",
                experience: "+7 years in Backend Development & API Design.",
                image: "/team/team9.jpg",
                greeting: "Namaste"
              },
              {
                name: "Maria Garcia",
                title: "UX/UI Designer",
                email: "mariagarcia@satocci.com",
                experience: "+6 years in User Interface Design & User Experience.",
                image: "/team/team10.jpg",
                greeting: "Hello"
              },
              {
                name: "Ahmed Hassan",
                title: "DevOps Engineer",
                email: "ahmedhassan@satocci.com",
                experience: "+9 years in Cloud Infrastructure & Deployment.",
                image: "/team/team11.jpg",
                greeting: "Namaste"
              },
              {
                name: "Jennifer Lee",
                title: "Data Scientist",
                email: "jenniferlee@satocci.com",
                experience: "+10 years in Machine Learning & Data Analytics.",
                image: "/team/team12.jpg",
                greeting: "Hello"
              },
              {
                name: "Carlos Martinez",
                title: "Frontend Developer",
                email: "carlosmartinez@satocci.com",
                experience: "+5 years in React, TypeScript & Modern Web Technologies.",
                image: "/team/team13.jpg",
                greeting: "Hello"
              },
              {
                name: "Priya Sharma",
                title: "Quality Assurance Lead",
                email: "priyasharma@satocci.com",
                experience: "+8 years in Software Testing & Quality Assurance.",
                image: "/team/team14.jpg",
                greeting: "Namaste"
              },
              {
                name: "Thomas Johnson",
                title: "Security Engineer",
                email: "thomasjohnson@satocci.com",
                experience: "+12 years in Cybersecurity & Information Security.",
                image: "/team/team15.jpg",
                greeting: "Hello"
              },
              {
                name: "Fatima Al-Rashid",
                title: "Business Analyst",
                email: "fatimaalrashid@satocci.com",
                experience: "+7 years in Business Process Analysis & Strategy.",
                image: "/team/team16.jpg",
                greeting: "Namaste"
              },
              {
                name: "Kevin O'Connor",
                title: "Mobile App Developer",
                email: "kevinoconnor@satocci.com",
                experience: "+6 years in iOS & Android Development.",
                image: "/team/team17.jpg",
                greeting: "Hello"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative mb-5">
                  <div className="w-full h-72 bg-gray-200 rounded-xl overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={288}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {member.greeting === "Namaste" ? "🙏 Namaste" : "👋 Hello"}
                  </div>
                </div>
                <h3 className="Space text-xl font-bold mb-2">{member.name}</h3>
                <p className="Poppins text-sm font-semibold text-foreground/80 mb-2">{member.title}</p>
                <p className="Poppins text-xs text-foreground/70 mb-3">{member.email}</p>
                <p className="Poppins text-xs text-foreground/80 leading-relaxed">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="flex justify-center items-center w-full py-20 bg-foreground/5">
        <div className="relative w-[95%] lg:w-full max-w-7xl text-center">
          <h2 className="Space text-4xl lg:text-5xl uppercase font-semibold mb-6">
            Ready to Transform Your Retail Experience?
          </h2>
          <p className="Poppins text-lg font-normal mb-8 text-foreground/80 max-w-3xl mx-auto">
            Join thousands of retailers who have already revolutionized their checkout process 
            with Satocci's innovative technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="Space rounded-full text-lg font-medium py-4 px-8 bg-green-400 text-foreground border-2 border-foreground">
              Get Started Today
            </Button>
            <Button variant="outline" className="Space rounded-full text-lg font-medium py-4 px-8 border-2 border-foreground">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Music Player */}
      <MusicButton />
    </main>
  );
}
