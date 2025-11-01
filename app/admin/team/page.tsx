"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, Eye, EyeOff, Plus, X, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  _id: string;
  name: string;
  title: string;
  email: string;
  experience: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    experience: "",
    image: "",
    order: 0,
  });

  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://satocii-backend.onrender.com/api/team-members/all");
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch team members");
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
        ? `https://satocii-backend.onrender.com/api/team-members/${editingId}`
        : "https://satocii-backend.onrender.com/api/team-members";
      
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
        setSuccess(editingId ? "Team member updated successfully!" : "Team member created successfully!");
        resetForm();
        fetchTeamMembers();
        setShowForm(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to save team member");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      setLoading(true);
      const response = await fetch(`https://satocii-backend.onrender.com/api/team-members/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Team member deleted successfully!");
        fetchTeamMembers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to delete team member");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://satocii-backend.onrender.com/api/team-members/${id}/toggle`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Team member status updated!");
        fetchTeamMembers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to toggle team member status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      title: member.title,
      email: member.email,
      experience: member.experience,
      image: member.image,
      order: member.order,
    });
    setEditingId(member._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      email: "",
      experience: "",
      image: "",
      order: 0,
    });
    setEditingId(null);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadingImage(true);

      const response = await fetch('https://satocii-backend.onrender.com/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.data.url }));
        setSuccess('Image uploaded successfully!');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Team Members Management</h1>
            <p className="text-muted-foreground">Manage team members displayed on the About page</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="gap-2"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancel" : "Add Team Member"}
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
              <CardTitle>{editingId ? "Edit Team Member" : "Add New Team Member"}</CardTitle>
              <CardDescription>
                {editingId ? "Update the team member details" : "Add a new team member to the About page"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Chief Technology Officer"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@satocci.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Experience *</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="+10 years in Software Development & AI"
                    rows={3}
                    required
                  />
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Lower numbers appear first
                  </p>
                </div>

                <div>
                  <Label htmlFor="image">Team Member Photo *</Label>
                  <div className="space-y-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && <span className="text-sm">Uploading image...</span>}
                    {formData.image && (
                      <div className="flex items-center gap-4">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          width={120}
                          height={120}
                          className="rounded-lg object-cover"
                        />
                        <div className="text-sm text-muted-foreground">
                          Image uploaded successfully
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading || uploadingImage}>
                    {loading ? "Saving..." : editingId ? "Update Team Member" : "Add Team Member"}
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

        {/* Team Members List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">All Team Members ({teamMembers.length})</h2>
          
          {loading && !showForm && <p>Loading team members...</p>}
          
          {teamMembers.length === 0 && !loading && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No team members yet. Add your first team member!</p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member._id} className={!member.isActive ? "opacity-60" : ""}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="relative w-full h-72 bg-foreground/10 rounded-lg overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{member.name}</h3>
                          <p className="text-sm font-semibold text-muted-foreground">{member.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{member.email}</p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Order: {member.order}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                        {member.experience}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(member._id)}
                        title={member.isActive ? "Deactivate" : "Activate"}
                        className="flex-1"
                      >
                        {member.isActive ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                        {member.isActive ? "Active" : "Inactive"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(member._id)}
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
    </div>
  );
}

