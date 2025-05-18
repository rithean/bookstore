import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().optional(),
    dob: z.date().optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    address: z.string().optional(),
    avatar: z.string().optional(),
    tags: z.array(z.string()).optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  phone: z.string().optional(),
  dob: z.date().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
  tags: z.array(z.string()).optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});