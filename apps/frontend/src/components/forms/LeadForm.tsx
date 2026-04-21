"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { Loader2, CheckCircle2, Send, Phone, User, GraduationCap, BookOpen, School as SchoolIcon, MapPin } from "lucide-react";
import { FadeIn } from "@/lib/animations";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Please enter a valid 10-digit number"),
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
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const boardSelectRef = useRef<HTMLSelectElement | null>(null);
  const classSelectRef = useRef<HTMLSelectElement | null>(null);
  const subjectInputRef = useRef<HTMLInputElement | null>(null);
  const schoolInputRef = useRef<HTMLInputElement | null>(null);
  const locationInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues,
  });

  const { ref: nameRef, ...nameField } = register("name");
  const { ref: phoneRef, ...phoneField } = register("phone");
  const { ref: boardRef, ...boardField } = register("board");
  const { ref: classRef, ...classField } = register("class");
  const { ref: subjectRef, ...subjectField } = register("subject");
  const { ref: schoolRef, ...schoolField } = register("school");
  const { ref: locationRef, ...locationField } = register("location");

  const focusInput = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.focus();
  };

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
    <div className="relative isolate bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-border/50">
      {title && <h3 className="text-2xl font-heading font-bold text-primary mb-1 text-center">{title}</h3>}
      {subtitle && <p className="text-muted-foreground text-sm mb-6 text-center">{subtitle}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative z-10 space-y-1.5">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
            <label
              htmlFor="name"
              className="relative block cursor-text"
              onClick={() => focusInput(nameInputRef)}
            >
              <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                id="name" 
                {...nameField}
                ref={(node) => {
                  nameRef(node);
                  nameInputRef.current = node;
                }}
                placeholder="Name" 
                className="h-11 pl-10 rounded-lg border-border/60 focus:border-primary focus:ring-primary/5 transition-all text-sm"
              />
            </label>
            {errors.name && <p className="text-destructive text-[10px] mt-1 font-medium">{errors.name.message}</p>}
          </div>

          <div className="relative z-10 space-y-1.5">
            <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
            <label
              htmlFor="phone"
              className="relative block cursor-text"
              onClick={() => focusInput(phoneInputRef)}
            >
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                id="phone" 
                {...phoneField}
                ref={(node) => {
                  phoneRef(node);
                  phoneInputRef.current = node;
                }}
                placeholder="Phone" 
                className="h-11 pl-10 rounded-lg border-border/60 focus:border-primary focus:ring-primary/5 transition-all text-sm"
              />
            </label>
            {errors.phone && <p className="text-destructive text-[10px] mt-1 font-medium">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-10 space-y-1.5">
            <Label htmlFor="board" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Board</Label>
            <label
              htmlFor="board"
              className="relative block cursor-pointer"
            >
              <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <select 
                id="board" 
                {...boardField}
                ref={(node) => {
                  boardRef(node);
                  boardSelectRef.current = node;
                }}
                className="flex h-11 w-full rounded-lg border border-border/60 bg-transparent pl-10 pr-4 py-1 text-sm shadow-sm transition-colors focus:border-primary focus:ring-primary/5 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              >
                <option value="">Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE / ISC</option>
                <option value="IGCSE">IGCSE</option>
                <option value="IB">IB DP / MYP</option>
              </select>
            </label>
          </div>

          <div className="relative z-10 space-y-1.5">
            <Label htmlFor="class" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Class</Label>
            <label
              htmlFor="class"
              className="relative block cursor-pointer"
            >
              <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <select 
                id="class" 
                {...classField}
                ref={(node) => {
                  classRef(node);
                  classSelectRef.current = node;
                }}
                className="flex h-11 w-full rounded-lg border border-border/60 bg-transparent pl-10 pr-4 py-1 text-sm shadow-sm transition-colors focus:border-primary focus:ring-primary/5 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              >
                <option value="">Class</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 12">Class 12</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 11">Class 11</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
        </div>

        <div className="relative z-10 space-y-1.5">
          <Label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subject(s)</Label>
          <label
            htmlFor="subject"
            className="relative block cursor-text"
            onClick={() => focusInput(subjectInputRef)}
          >
            <BookOpen className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input 
              id="subject" 
              {...subjectField}
              ref={(node) => {
                subjectRef(node);
                subjectInputRef.current = node;
              }}
              placeholder="e.g. Maths, Physics" 
              className="h-11 pl-10 rounded-lg border-border/60 focus:border-primary focus:ring-primary/5 transition-all text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-10 space-y-1.5">
            <Label htmlFor="school" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">School</Label>
            <label
              htmlFor="school"
              className="relative block cursor-text"
              onClick={() => focusInput(schoolInputRef)}
            >
              <SchoolIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                id="school" 
                {...schoolField}
                ref={(node) => {
                  schoolRef(node);
                  schoolInputRef.current = node;
                }}
                placeholder="School" 
                className="h-11 pl-10 rounded-lg border-border/60 focus:border-primary focus:ring-primary/5 transition-all text-sm"
              />
            </label>
          </div>

          <div className="relative z-10 space-y-1.5">
            <Label htmlFor="location" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Location</Label>
            <label
              htmlFor="location"
              className="relative block cursor-text"
              onClick={() => focusInput(locationInputRef)}
            >
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                id="location" 
                {...locationField}
                ref={(node) => {
                  locationRef(node);
                  locationInputRef.current = node;
                }}
                placeholder="Area" 
                className="h-11 pl-10 rounded-lg border-border/60 focus:border-primary focus:ring-primary/5 transition-all text-sm"
              />
            </label>
          </div>
        </div>

        {error && <p className="text-destructive text-[11px] font-medium bg-destructive/5 p-2 rounded border border-destructive/10">{error}</p>}

        <Button 
          type="submit" 
          className="w-full h-12 text-base font-bold rounded-lg shadow-lg shadow-primary/10 hover:shadow-xl transition-all mt-2" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Get Free Demo Class
              <Send className="ml-2 h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );

}
