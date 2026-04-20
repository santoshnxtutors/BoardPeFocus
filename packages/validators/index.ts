import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number (10 digits)"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  board: z.string().optional(),
  class: z.string().optional(),
  subject: z.string().optional(),
  school: z.string().optional(),
  location: z.string().optional(),
  message: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const tutorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  experienceYears: z.number().min(0),
  subjects: z.array(z.string()).min(1),
  boards: z.array(z.string()).min(1),
});
