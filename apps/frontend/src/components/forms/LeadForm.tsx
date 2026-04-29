"use client";

import { useState } from "react";
import {
  Loader2,
  CheckCircle2,
  Send,
  Phone,
  User,
  GraduationCap,
  BookOpen,
  School as SchoolIcon,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { trackEvent } from "@/lib/tracking";

const LEAD_WHATSAPP_NUMBER = "918796367754";

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  board: string;
  class: string;
  subject: string;
  school: string;
  location: string;
  preferredMode: string;
  preferredTimeSlot: string;
  message: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

interface LeadFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<LeadFormData>;
  title?: string;
  subtitle?: string;
}

function createInitialValues(defaultValues?: Partial<LeadFormData>): LeadFormData {
  return {
    name: defaultValues?.name ?? "",
    phone: defaultValues?.phone ?? "",
    email: defaultValues?.email ?? "",
    board: defaultValues?.board ?? "",
    class: defaultValues?.class ?? "",
    subject: defaultValues?.subject ?? "",
    school: defaultValues?.school ?? "",
    location: defaultValues?.location ?? "",
    preferredMode: defaultValues?.preferredMode ?? "",
    preferredTimeSlot: defaultValues?.preferredTimeSlot ?? "",
    message: defaultValues?.message ?? "",
  };
}

function optionalField(value?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeLeadFormData(data: LeadFormData): LeadFormData {
  return {
    name: data.name.trim(),
    phone: data.phone.replace(/\D/g, ""),
    email: data.email.trim(),
    board: data.board.trim(),
    class: data.class.trim(),
    subject: data.subject.trim(),
    school: data.school.trim(),
    location: data.location.trim(),
    preferredMode: data.preferredMode.trim(),
    preferredTimeSlot: data.preferredTimeSlot.trim(),
    message: data.message.trim(),
  };
}

function validateLeadForm(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = "Name is required";
  }

  if (data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Please enter a valid 10-digit number";
  }

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email";
  }

  return errors;
}

function buildWhatsAppUrl(data: LeadFormData) {
  const lines = [
    "Hi BoardPeFocus, I want to request a free demo class.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${optionalField(data.email) ?? "Not provided"}`,
    `Board: ${optionalField(data.board) ?? "Not provided"}`,
    `Class: ${optionalField(data.class) ?? "Not provided"}`,
    `Preferred Mode: ${optionalField(data.preferredMode) ?? "Not provided"}`,
    `Preferred Time Slot: ${optionalField(data.preferredTimeSlot) ?? "Not provided"}`,
    `Subject(s): ${optionalField(data.subject) ?? "Not provided"}`,
    `School: ${optionalField(data.school) ?? "Not provided"}`,
    `Location: ${optionalField(data.location) ?? "Not provided"}`,
    `Notes: ${optionalField(data.message) ?? "Not provided"}`,
  ];

  return `https://wa.me/${LEAD_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function LeadForm({ onSuccess, defaultValues, title, subtitle }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>(() => createInitialValues(defaultValues));
  const [fieldErrors, setFieldErrors] = useState<LeadFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField =
    (field: keyof LeadFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;

      setFormData((current) => ({
        ...current,
        [field]: value,
      }));

      setFieldErrors((current) =>
        current[field] ? { ...current, [field]: undefined } : current,
      );

      if (error) {
        setError(null);
      }
    };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedData = normalizeLeadFormData(formData);
    const nextErrors = validateLeadForm(normalizedData);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...normalizedData,
      email: optionalField(normalizedData.email),
      board: optionalField(normalizedData.board),
      class: optionalField(normalizedData.class),
      subject: optionalField(normalizedData.subject),
      school: optionalField(normalizedData.school),
      location: optionalField(normalizedData.location),
      preferredMode: optionalField(normalizedData.preferredMode),
      preferredTimeSlot: optionalField(normalizedData.preferredTimeSlot),
      message: optionalField(normalizedData.message),
      source: "whatsapp_lead_form",
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
    };

    try {
      await api.leads.submit(payload);

      const whatsappUrl = buildWhatsAppUrl(normalizedData);
      const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      if (!whatsappWindow) {
        window.open(whatsappUrl, "_self");
      }

      trackEvent("lead_submit", {
        board: payload.board,
        class: payload.class,
        subject: payload.subject,
        school: payload.school,
        location: payload.location,
        preferred_mode: payload.preferredMode,
        delivery: "whatsapp",
      });

      setIsSuccess(true);
      onSuccess?.();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again or contact us on WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="px-6 py-12 text-center">
        <div aria-live="polite">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mb-4 text-3xl font-heading font-bold text-primary">WhatsApp Opened!</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Your details are ready in WhatsApp. Send the message there and our academic advisors will take it forward.
          </p>
          <Button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData(createInitialValues(defaultValues));
              setFieldErrors({});
              setError(null);
            }}
            variant="outline"
            className="rounded-xl"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate mx-auto max-w-md rounded-3xl border border-border/50 bg-white p-5 shadow-xl md:p-6">
      {title ? <h2 className="mb-1 text-center text-xl font-heading font-bold text-primary">{title}</h2> : null}
      {subtitle ? (
        <p className="mb-5 text-center text-[12px] text-muted-foreground">{subtitle}</p>
      ) : null}

      <form noValidate onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative z-10 space-y-1">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                value={formData.name}
                onChange={updateField("name")}
                aria-describedby={fieldErrors.name ? "lead-name-error" : undefined}
                aria-invalid={!!fieldErrors.name}
                autoComplete="name"
                placeholder="Name"
                required
                className="h-10 rounded-lg border-border/60 pl-8 text-xs transition-all focus:border-primary focus:ring-primary/5"
              />
            </div>
            {fieldErrors.name ? (
              <p id="lead-name-error" role="alert" className="mt-1 text-[10px] font-medium text-destructive">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div className="relative z-10 space-y-1">
            <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                value={formData.phone}
                onChange={updateField("phone")}
                aria-describedby={fieldErrors.phone ? "lead-phone-error" : undefined}
                aria-invalid={!!fieldErrors.phone}
                autoComplete="tel"
                inputMode="numeric"
                type="tel"
                placeholder="Phone"
                required
                className="h-10 rounded-lg border-border/60 pl-8 text-xs transition-all focus:border-primary focus:ring-primary/5"
              />
            </div>
            {fieldErrors.phone ? (
              <p id="lead-phone-error" role="alert" className="mt-1 text-[10px] font-medium text-destructive">
                {fieldErrors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Email (optional)
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={updateField("email")}
            aria-describedby={fieldErrors.email ? "lead-email-error" : undefined}
            aria-invalid={!!fieldErrors.email}
            autoComplete="email"
            placeholder="Parent email"
            className="h-10 rounded-lg border-border/60 text-xs transition-all focus:border-primary focus:ring-primary/5"
          />
          {fieldErrors.email ? (
            <p id="lead-email-error" role="alert" className="mt-1 text-[10px] font-medium text-destructive">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative z-10 space-y-1">
            <Label htmlFor="board" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Board
            </Label>
            <div className="relative">
              <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <select
                id="board"
                value={formData.board}
                onChange={updateField("board")}
                className="flex h-10 w-full appearance-none rounded-lg border border-border/60 bg-transparent py-1 pl-8 pr-4 text-xs shadow-sm transition-colors focus:border-primary focus:ring-primary/5 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE / ISC</option>
                <option value="IGCSE">IGCSE</option>
                <option value="IB">IB DP / MYP</option>
              </select>
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <Label htmlFor="class" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Class
            </Label>
            <div className="relative">
              <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <select
                id="class"
                value={formData.class}
                onChange={updateField("class")}
                className="flex h-10 w-full appearance-none rounded-lg border border-border/60 bg-transparent py-1 pl-8 pr-4 text-xs shadow-sm transition-colors focus:border-primary focus:ring-primary/5 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Class</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 12">Class 12</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 11">Class 11</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative z-10 space-y-1">
            <Label htmlFor="preferredMode" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Preferred mode
            </Label>
            <select
              id="preferredMode"
              value={formData.preferredMode}
              onChange={updateField("preferredMode")}
              className="flex h-10 w-full appearance-none rounded-lg border border-border/60 bg-transparent px-4 py-1 text-xs shadow-sm transition-colors focus:border-primary focus:ring-primary/5 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Preferred mode</option>
              <option value="Home tutoring">Home tutoring</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="relative z-10 space-y-1">
            <Label htmlFor="preferredTimeSlot" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Preferred time slot
            </Label>
            <select
              id="preferredTimeSlot"
              value={formData.preferredTimeSlot}
              onChange={updateField("preferredTimeSlot")}
              className="flex h-10 w-full appearance-none rounded-lg border border-border/60 bg-transparent px-4 py-1 text-xs shadow-sm transition-colors focus:border-primary focus:ring-primary/5 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Preferred time slot</option>
              <option value="Weekday mornings">Weekday mornings</option>
              <option value="Weekday afternoons">Weekday afternoons</option>
              <option value="Weekday evenings">Weekday evenings</option>
              <option value="Weekend mornings">Weekend mornings</option>
              <option value="Weekend afternoons">Weekend afternoons</option>
            </select>
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <Label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Subject(s)
          </Label>
          <div className="relative">
            <BookOpen className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="subject"
              value={formData.subject}
              onChange={updateField("subject")}
              placeholder="e.g. Maths, Physics"
              className="h-10 rounded-lg border-border/60 pl-8 text-xs transition-all focus:border-primary focus:ring-primary/5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative z-10 space-y-1">
            <Label htmlFor="school" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              School
            </Label>
            <div className="relative">
              <SchoolIcon className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="school"
                value={formData.school}
                onChange={updateField("school")}
                placeholder="School"
                className="h-10 rounded-lg border-border/60 pl-8 text-xs transition-all focus:border-primary focus:ring-primary/5"
              />
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <Label htmlFor="location" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Location
            </Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={updateField("location")}
                placeholder="Area"
                className="h-10 rounded-lg border-border/60 pl-8 text-xs transition-all focus:border-primary focus:ring-primary/5"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Notes
          </Label>
          <Input
            id="message"
            value={formData.message}
            onChange={updateField("message")}
            placeholder="Any school, sector, society, or timing details"
            className="h-10 rounded-lg border-border/60 text-xs transition-all focus:border-primary focus:ring-primary/5"
          />
        </div>

        {error ? (
          <p role="alert" className="rounded border border-destructive/10 bg-destructive/5 p-2 text-[11px] font-medium text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-lg text-base font-bold shadow-lg shadow-primary/10 transition-all hover:shadow-xl"
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
