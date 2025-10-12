"use client";

import { useState, useEffect } from "react";
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
import { Loader2, User, Send, Save, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

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
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:5000';

export default function LinkedInPage() {
  const [userInfo, setUserInfo] = useState<LinkedInUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    content: '',
    title: '',
    mediaType: 'NONE',
    mediaUrl: '',
    mediaTitle: '',
    mediaDescription: '',
    mediaThumbnail: ''
  });

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
    } catch (error) {
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
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
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
        setMessage({ type: 'success', text: 'Post successfully shared on LinkedIn!' });
        setFormData({
          content: '',
          title: '',
          mediaType: 'NONE',
          mediaUrl: '',
          mediaTitle: '',
          mediaDescription: '',
          mediaThumbnail: ''
        });
        fetchPosts(); // Refresh posts list
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to post to LinkedIn' });
      }
    } catch (error) {
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
          mediaThumbnail: ''
        });
        fetchPosts(); // Refresh posts list
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save post' });
      }
    } catch (error) {
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">LinkedIn Post Manager</h1>
          <p className="text-muted-foreground">
            Create, save, and share posts on LinkedIn with media support
          </p>
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

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={postToLinkedIn}
                    disabled={loading || !formData.content.trim()}
                    className="flex-1"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Post to LinkedIn
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
