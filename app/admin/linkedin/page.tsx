"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, User, Send, Save, Eye, CheckCircle, XCircle, Clock, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface LinkedInUser {
  sub: string;
  name: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: {
    country: string;
    language: string;
  };
}

interface Post {
  _id: string;
  content: string;
  title: string;
  platform: string;
  status: string;
  linkedinPostId?: string;
  linkedinUserId?: string;
  mediaType: string;
  mediaUrl?: string;
  mediaTitle?: string;
  mediaDescription?: string;
  mediaThumbnail?: string;
  uploadedImages?: string[];
  postToLinkedIn?: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:5000';

export default function LinkedInPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<LinkedInUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    content: '',
    title: '',
    mediaType: 'NONE',
    mediaUrl: '',
    mediaTitle: '',
    mediaDescription: '',
    mediaThumbnail: '',
    uploadedImages: [] as string[],
    postToLinkedIn: true
  });

  // Check authentication on mount
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/admin/login");
    }
  }, [router]);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  // Fetch LinkedIn user info
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/linkedin-userinfo`);
      const data = await response.json();
      
      if (data.success) {
        setUserInfo(data.data);
        setMessage({ type: 'success', text: 'LinkedIn user info loaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to fetch user info' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to connect to LinkedIn API' });
    } finally {
      setLoading(false);
    }
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      }
    } catch {
      console.error('Failed to fetch posts');
    }
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 10MB' });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Only image files are allowed' });
      return;
    }

    try {
      setUploading(true);
      const formDataToUpload = new FormData();
      formDataToUpload.append('image', file);

      const response = await fetch(`${API_BASE_URL}/api/upload-image`, {
        method: 'POST',
        body: formDataToUpload,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, data.data.url]
        }));
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to upload image' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  // Remove uploaded image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index)
    }));
  };

  // Post to LinkedIn
  const postToLinkedIn = async () => {
    if (!formData.content.trim()) {
      setMessage({ type: 'error', text: 'Content is required' });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/post-to-linkedin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: formData.postToLinkedIn ? 'Post successfully shared on LinkedIn!' : 'Post saved successfully without posting to LinkedIn!' });
        setFormData({
          content: '',
          title: '',
          mediaType: 'NONE',
          mediaUrl: '',
          mediaTitle: '',
          mediaDescription: '',
          mediaThumbnail: '',
          uploadedImages: [],
          postToLinkedIn: true
        });
        fetchPosts(); // Refresh posts list
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to post to LinkedIn' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to connect to LinkedIn API' });
    } finally {
      setLoading(false);
    }
  };

  // Save post without posting
  const savePost = async () => {
    if (!formData.content.trim()) {
      setMessage({ type: 'error', text: 'Content is required' });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/save-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Post saved successfully!' });
        setFormData({
          content: '',
          title: '',
          mediaType: 'NONE',
          mediaUrl: '',
          mediaTitle: '',
          mediaDescription: '',
          mediaThumbnail: '',
          uploadedImages: [],
          postToLinkedIn: true
        });
        fetchPosts(); // Refresh posts list
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save post' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save post' });
    } finally {
      setLoading(false);
    }
  };

  // Load user info and posts on component mount
  useEffect(() => {
    fetchUserInfo();
    fetchPosts();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'posted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Save className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 text-center space-y-2">
            <h1 className="text-3xl font-bold">LinkedIn Post Manager</h1>
            <p className="text-muted-foreground">
              Create, save, and share posts on LinkedIn with media support
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="Space rounded-full font-bold px-6 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
          >
            LOGOUT
          </Button>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create Post</TabsTrigger>
            <TabsTrigger value="user">User Info</TabsTrigger>
            <TabsTrigger value="posts">Posts History</TabsTrigger>
          </TabsList>

          {/* Create Post Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create LinkedIn Post</CardTitle>
                <CardDescription>
                  Write your post content and configure media settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Post Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind? Share your thoughts with your LinkedIn network..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="min-h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Post Title (Optional)</Label>
                  <Input
                    id="title"
                    placeholder="Enter a title for your post"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Image Upload Section */}
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="imageUpload" className="font-medium">Upload Images</Label>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploading}
                      onClick={() => document.getElementById('imageUpload')?.click()}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Choose Image
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Image Preview Grid */}
                  {formData.uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.uploadedImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                            <Image
                              src={url}
                              alt={`Uploaded image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Images are uploaded to Cloudinary. Max 10MB per image.
                  </p>
                </div>

                {/* Media Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="mediaType">Media Type</Label>
                  <Select
                    value={formData.mediaType}
                    onValueChange={(value) => setFormData({ ...formData, mediaType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">Text Only</SelectItem>
                      <SelectItem value="ARTICLE">Article</SelectItem>
                      <SelectItem value="VIDEO">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Media Fields (shown when media type is not NONE) */}
                {formData.mediaType !== 'NONE' && (
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium">Media Configuration</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mediaUrl">Media URL *</Label>
                      <Input
                        id="mediaUrl"
                        placeholder="https://example.com/article"
                        value={formData.mediaUrl}
                        onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mediaTitle">Media Title</Label>
                      <Input
                        id="mediaTitle"
                        placeholder="Title for the media content"
                        value={formData.mediaTitle}
                        onChange={(e) => setFormData({ ...formData, mediaTitle: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mediaDescription">Media Description</Label>
                      <Textarea
                        id="mediaDescription"
                        placeholder="Description for the media content"
                        value={formData.mediaDescription}
                        onChange={(e) => setFormData({ ...formData, mediaDescription: e.target.value })}
                        className="min-h-20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mediaThumbnail">Thumbnail URL</Label>
                      <Input
                        id="mediaThumbnail"
                        placeholder="https://example.com/thumbnail.jpg"
                        value={formData.mediaThumbnail}
                        onChange={(e) => setFormData({ ...formData, mediaThumbnail: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* Post to LinkedIn Option */}
                <div className="flex items-center space-x-2 p-4 border rounded-lg bg-muted/30">
                  <Checkbox
                    id="postToLinkedIn"
                    checked={formData.postToLinkedIn}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, postToLinkedIn: checked as boolean })
                    }
                  />
                  <div className="flex flex-col">
                    <Label
                      htmlFor="postToLinkedIn"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Post to LinkedIn
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.postToLinkedIn 
                        ? "Your post will be published on LinkedIn and saved to the database" 
                        : "Your post will only be saved to the database without posting to LinkedIn"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={postToLinkedIn}
                    disabled={loading || !formData.content.trim()}
                    className="flex-1"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : formData.postToLinkedIn ? (
                      <Send className="mr-2 h-4 w-4" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {formData.postToLinkedIn ? 'Post to LinkedIn' : 'Save Without Posting'}
                  </Button>
                  
                  <Button
                    onClick={savePost}
                    disabled={loading || !formData.content.trim()}
                    variant="outline"
                    className="flex-1"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Info Tab */}
          <TabsContent value="user" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  LinkedIn User Information
                </CardTitle>
                <CardDescription>
                  Your LinkedIn profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userInfo ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={userInfo.picture}
                        alt={userInfo.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{userInfo.name}</h3>
                        <p className="text-muted-foreground">{userInfo.email}</p>
                        <p className="text-sm text-muted-foreground">
                          User ID: {userInfo.sub}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">Given Name</Label>
                        <p>{userInfo.given_name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Family Name</Label>
                        <p>{userInfo.family_name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Country</Label>
                        <p>{userInfo.locale.country}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Language</Label>
                        <p>{userInfo.locale.language}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No user information available. Click the button below to fetch your LinkedIn profile.
                    </p>
                    <Button onClick={fetchUserInfo} disabled={loading}>
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <User className="mr-2 h-4 w-4" />
                      )}
                      Load User Info
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts History Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Posts History
                </CardTitle>
                <CardDescription>
                  View all your LinkedIn posts and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <Card key={post._id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(post.status)}
                              <Badge className={getStatusColor(post.status)}>
                                {post.status}
                              </Badge>
                              {post.linkedinPostId && (
                                <Badge variant="outline">
                                  LinkedIn ID: {post.linkedinPostId}
                                </Badge>
                              )}
                            </div>
                            
                            {post.title && (
                              <h4 className="font-medium">{post.title}</h4>
                            )}
                            
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {post.content}
                            </p>
                            
                            {post.mediaType !== 'NONE' && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Media: {post.mediaType}</span>
                                {post.mediaUrl && (
                                  <a
                                    href={post.mediaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    View Media
                                  </a>
                                )}
                              </div>
                            )}

                            {/* Display uploaded images */}
                            {post.uploadedImages && post.uploadedImages.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs text-muted-foreground mb-2">
                                  Uploaded Images ({post.uploadedImages.length})
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                  {post.uploadedImages.map((url, idx) => (
                                    <div key={idx} className="relative w-full h-20 rounded-md overflow-hidden border">
                                      <Image
                                        src={url}
                                        alt={`Image ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Show if post was saved without posting to LinkedIn */}
                            {post.postToLinkedIn === false && (
                              <Badge variant="outline" className="text-xs">
                                Saved Only (Not Posted)
                              </Badge>
                            )}
                            
                            <p className="text-xs text-muted-foreground">
                              Created: {new Date(post.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No posts found. Create your first LinkedIn post!
                    </p>
                    <Button onClick={fetchPosts} disabled={loading}>
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Eye className="mr-2 h-4 w-4" />
                      )}
                      Refresh Posts
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
