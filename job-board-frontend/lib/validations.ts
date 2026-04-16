import { z } from "zod/v4";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be under 30 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const postJobSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(2, "Location is required"),
  salary: z.union([z.coerce.number().positive("Must be a positive number"), z.literal(""), z.undefined()]).optional(),
  is_remote: z.boolean().optional(),
  category: z.coerce.number().optional(),
});

export const applySchema = z.object({
  job: z.number(),
  cover_letter: z.string().min(20, "Cover letter must be at least 20 characters"),
});

export const companySchema = z.object({
  name: z.string().min(2, "Company name is required"),
  description: z.string().optional(),
  website: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  location: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type PostJobFormData = z.infer<typeof postJobSchema>;
export type ApplyFormData = z.infer<typeof applySchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
