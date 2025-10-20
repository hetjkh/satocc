"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Satocci content</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LinkedIn Posts */}
          <Link href="/admin/linkedin">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>LinkedIn Posts</CardTitle>
                <CardDescription>
                  Create and manage LinkedIn posts with images and media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Manage Posts
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Reviews Management */}
          <Link href="/admin/reviews">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  Manage customer testimonials and reviews with text, images, or videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Manage Reviews
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Quick Guide</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <strong className="text-foreground">LinkedIn Posts:</strong> Create and schedule posts
              for LinkedIn with support for text, images, articles, and videos.
            </div>
            <div>
              <strong className="text-foreground">Customer Reviews:</strong> Add customer testimonials
              in three formats: text only, image with text, or video with text. Reviews appear on the homepage.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

