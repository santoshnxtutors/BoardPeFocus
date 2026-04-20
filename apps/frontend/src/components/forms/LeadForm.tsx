"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { Loader2, CheckCircle2, Send, Phone, User, GraduationCap } from "lucide-react";
import { FadeIn } from "@/lib/animations";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number (10 digits)"),
  board: z.string().optional(),
  class: z.string().optional(),
  subject: z.string().optional(),
  school: z.string().optional(),
  location: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<LeadFormData>;
  title?: string;
  subtitle?: string;
}

export function LeadForm({ onSuccess, defaultValues, title, subtitle }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues,
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.leads.submit(data);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <FadeIn className="text-center py-12 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-heading font-bold text-primary mb-4">Request Received!</h3>
        <p className="text-muted-foreground text-lg mb-8">
          One of our academic advisors will contact you within 24 hours to match you with the perfect tutor.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-xl">
          Submit Another Request
        </Button>
      </FadeIn>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border/50">
      {title && <h3 className="text-3xl font-heading font-bold text-primary mb-2">{title}</h3>}
      {subtitle && <p className="text-muted-foreground mb-8">{subtitle}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              id="name" 
              {...register("name")} 
              placeholder="Enter your name" 
              className="h-14 pl-12 rounded-xl border-border/60 focus:border-primary focus:ring-primary/5 transition-all"
            />
          </div>
          {errors.name && <p className="text-destructive text-xs mt-1 font-medium">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              id="phone" 
              {...register("phone")} 
              placeholder="10-digit mobile number" 
              className="h-14 pl-12 rounded-xl border-border/60 focus:border-primary focus:ring-primary/5 transition-all"
            />
          </div>
          {errors.phone && <p className="text-destructive text-xs mt-1 font-medium">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="board" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Board</Label>
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select 
              id="board" 
              {...register("board")} 
              className="flex h-14 w-full rounded-xl border border-border/60 bg-transparent pl-12 pr-4 py-1 text-base shadow-sm transition-colors focus:border-primary focus:ring-primary/5 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              <option value="">Select Board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="IGCSE">IGCSE</option>
              <option value="IB">IB DP / MYP</option>
            </select>
          </div>
        </div>

        {error && <p className="text-destructive text-sm font-medium bg-destructive/5 p-3 rounded-lg border border-destructive/10">{error}</p>}

        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Get Free Demo Class
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
