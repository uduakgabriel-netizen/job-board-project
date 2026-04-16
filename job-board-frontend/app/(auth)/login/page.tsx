"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data.username, data.password);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl border-border/50">
      <CardHeader className="text-center pb-2">
        <Link href="/" className="flex items-center justify-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Briefcase className="h-5 w-5" />
          </div>
        </Link>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              autoFocus
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Sign In
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Separator />
        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Register
          </Link>
        </p>
        <p className="text-xs text-muted-foreground text-center">
          Are you an employer?{" "}
          <Link href="/register/employer" className="text-primary font-medium hover:underline">
            Create Employer Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
