"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.updateProfile(formData);
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground mb-8">Manage your account details</p>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input value={user?.username || ""} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">Username cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={user?.role?.replace("_", " ").toUpperCase() || ""} disabled className="bg-muted capitalize" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
