"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { gsap } from "gsap";

// Static credentials
const ADMIN_EMAIL = "admin@satocci.com";
const ADMIN_PASSWORD = "12345678";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animations
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/admin/linkedin");
    }

    // GSAP Animations
    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, titleRef.current, formRef.current], { opacity: 1 });

      gsap.fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );

      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll('.form-input');
        gsap.fromTo(inputs,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.6, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set session
        sessionStorage.setItem("adminLoggedIn", "true");
        // Redirect to LinkedIn page
        router.push("/admin/linkedin");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 800);
  };

  // Ensure video plays when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current && document.visibilityState === 'visible') {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={(e) => {
          console.error('Video error:', e);
        }}
        onPause={() => {
          if (videoRef.current && document.visibilityState === 'visible') {
            videoRef.current.play().catch(() => {});
          }
        }}
      >
        <source src="/car.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-background/80 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-card border-2 border-foreground/20 rounded-4xl p-8 sm:p-12 shadow-2xl">
          {/* Badge */}
          <div ref={badgeRef} className="mb-6 text-center">
            <Badge className="Poppins bg-green-400 text-foreground border-0 px-6 py-2">
              Admin Portal
            </Badge>
          </div>

          {/* Title */}
          <h1 ref={titleRef} className="Space text-3xl sm:text-4xl uppercase font-bold text-center text-foreground mb-8">
            ADMIN LOGIN
          </h1>

          {/* Login Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative form-input">
              <Input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer Poppins rounded-full text-base font-medium p-6 bg-background text-foreground border-2 border-foreground transition-all duration-300 focus:scale-105"
              />
              <p className="Poppins absolute left-6 text-base rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:bg-card peer-focus:bg-card px-2">
                Email Address
              </p>
            </div>

            {/* Password Input */}
            <div className="relative form-input">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer Poppins rounded-full text-base font-medium p-6 pr-14 bg-background text-foreground border-2 border-foreground transition-all duration-300 focus:scale-105"
              />
              <p className="Poppins absolute left-6 text-base rounded-full font-medium bg-transparent text-foreground/50 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:bg-card peer-focus:bg-card px-2">
                Password
              </p>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 text-center">
                <p className="Poppins text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="Space rounded-full text-lg font-bold px-6 py-7 bg-foreground text-background hover:bg-purple hover:text-white hover:shadow-[0_0px_20px] shadow-purple transition-all duration-300 cursor-pointer w-full uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 form-input"
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
              <LogIn className="w-5 h-5 ml-3 inline" />
            </Button>
          </form>

          {/* Info Text */}
          <p className="Poppins text-xs text-center text-foreground/60 mt-6">
            Admin access only. Contact IT support if you need credentials.
          </p>
        </div>
      </div>
    </main>
  );
}

