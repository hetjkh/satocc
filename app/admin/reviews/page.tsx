"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Eye, EyeOff, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

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
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    type: "text" as "text" | "image" | "video",
    mediaUrl: "",
    imageUrl: "",
    order: 0,
  });

  // Image upload states
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [uploadingMediaImage, setUploadingMediaImage] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/reviews/all");
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const url = editingId
        ? `http://localhost:5000/api/reviews/${editingId}`
        : "http://localhost:5000/api/reviews";
      
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingId ? "Review updated successfully!" : "Review created successfully!");
        resetForm();
        fetchReviews();
        setShowForm(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to save review");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Review deleted successfully!");
        fetchReviews();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to delete review");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/reviews/${id}/toggle`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Review status updated!");
        fetchReviews();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to toggle review status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review: Review) => {
    setFormData({
      name: review.name,
      role: review.role,
      content: review.content,
      type: review.type,
      mediaUrl: review.mediaUrl || "",
      imageUrl: review.imageUrl || "",
      order: review.order,
    });
    setEditingId(review._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      content: "",
      type: "text",
      mediaUrl: "",
      imageUrl: "",
      order: 0,
    });
    setEditingId(null);
  };

  const handleImageUpload = async (file: File, type: 'profile' | 'media') => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      if (type === 'profile') {
        setUploadingProfileImage(true);
      } else {
        setUploadingMediaImage(true);
      }

      const response = await fetch('http://localhost:5000/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        if (type === 'profile') {
          setFormData(prev => ({ ...prev, imageUrl: data.data.url }));
        } else {
          setFormData(prev => ({ ...prev, mediaUrl: data.data.url }));
        }
        setSuccess(`${type === 'profile' ? 'Profile' : 'Media'} image uploaded successfully!`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(`Failed to upload ${type} image`);
      console.error(err);
    } finally {
      if (type === 'profile') {
        setUploadingProfileImage(false);
      } else {
        setUploadingMediaImage(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Reviews Management</h1>
            <p className="text-muted-foreground">Manage customer reviews and testimonials</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="gap-2"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancel" : "Add Review"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-500 text-green-700">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Review" : "Create New Review"}</CardTitle>
              <CardDescription>
                {editingId ? "Update the review details" : "Add a new customer review"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Customer Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Role/Title *</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Consumer, CEO, Manager"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Review Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write the review content here..."
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="type">Review Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "text" | "image" | "video") =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Only</SelectItem>
                        <SelectItem value="image">Image with Text</SelectItem>
                        <SelectItem value="video">Video with Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="profileImage">Profile Image (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'profile');
                      }}
                      disabled={uploadingProfileImage}
                    />
                    {uploadingProfileImage && <span className="text-sm">Uploading...</span>}
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={formData.imageUrl}
                        alt="Profile preview"
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {formData.type !== "text" && (
                  <div>
                    <Label htmlFor="media">
                      {formData.type === "image" ? "Review Image" : "Video URL"} *
                    </Label>
                    {formData.type === "image" ? (
                      <div>
                        <Input
                          id="mediaImage"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'media');
                          }}
                          disabled={uploadingMediaImage}
                        />
                        {uploadingMediaImage && <span className="text-sm mt-2 block">Uploading...</span>}
                        {formData.mediaUrl && (
                          <div className="mt-2">
                            <Image
                              src={formData.mediaUrl}
                              alt="Media preview"
                              width={200}
                              height={150}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <Input
                        id="videoUrl"
                        value={formData.mediaUrl}
                        onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                        placeholder="https://www.youtube.com/embed/..."
                        required={formData.type === "video"}
                      />
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editingId ? "Update Review" : "Create Review"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold">All Reviews ({reviews.length})</h2>
          
          {loading && !showForm && <p>Loading reviews...</p>}
          
          {reviews.length === 0 && !loading && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No reviews yet. Create your first review!</p>
              </CardContent>
            </Card>
          )}

          {reviews.map((review) => (
            <Card key={review._id} className={!review.isActive ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {review.imageUrl && (
                        <Image
                          src={review.imageUrl}
                          alt={review.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-lg">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {review.type.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">Order: {review.order}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{review.content}</p>
                    
                    {review.mediaUrl && review.type === "image" && (
                      <Image
                        src={review.mediaUrl}
                        alt="Review media"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    )}
                    
                    {review.mediaUrl && review.type === "video" && (
                      <div className="aspect-video w-full max-w-md">
                        <iframe
                          src={review.mediaUrl}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleToggleActive(review._id)}
                      title={review.isActive ? "Deactivate" : "Activate"}
                    >
                      {review.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(review._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

