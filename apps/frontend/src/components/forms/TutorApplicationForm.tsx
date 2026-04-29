"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const boardOptions = [
  "CBSE",
  "ICSE / ISC",
  "IGCSE",
  "IB MYP",
  "IB DP",
  "Cambridge AS / A Level",
];

const classOptions = [
  "Class 6-8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Undergraduate Foundation",
];

const teachingModeOptions = [
  { value: "home tuition", label: "Home tuition" },
  { value: "online", label: "Online" },
  { value: "both", label: "Both" },
];

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => !value || /^https?:\/\/.+/i.test(value),
    "Enter a valid URL starting with http:// or https://",
  );

const tutorApplicationSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required"),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s-]{10,15}$/, "Enter a valid phone number"),
    email: z.string().trim().email("Enter a valid email address"),
    city: z.string().trim().min(2, "City is required"),
    currentLocation: z
      .string()
      .trim()
      .min(2, "Current location / area is required"),
    gender: z.string().trim().optional(),
    experienceYears: z.coerce
      .number({ invalid_type_error: "Enter years of experience" })
      .min(0, "Experience cannot be negative")
      .max(60, "Enter a valid experience range"),
    highestQualification: z
      .string()
      .trim()
      .min(2, "Highest qualification is required"),
    universityInstitution: z
      .string()
      .trim()
      .min(2, "University / institution is required"),
    subjectsHandled: z.string().trim().min(2, "Add at least one subject"),
    boardsHandled: z.array(z.string()).min(1, "Select at least one board"),
    classesHandled: z
      .array(z.string())
      .min(1, "Select at least one class range"),
    preferredTeachingMode: z
      .string()
      .trim()
      .min(1, "Select a preferred teaching mode"),
    areasWillingToServe: z
      .string()
      .trim()
      .min(2, "Add at least one service area"),
    schoolsFamiliarWith: z.string().trim().optional(),
    professionalBio: z
      .string()
      .trim()
      .min(80, "Professional bio should be at least 80 characters"),
    teachingApproach: z
      .string()
      .trim()
      .min(80, "Teaching approach should be at least 80 characters"),
    availability: z
      .string()
      .trim()
      .min(10, "Availability details are required"),
    expectedFeeMin: z
      .union([z.literal(""), z.coerce.number().min(0)])
      .optional(),
    expectedFeeMax: z
      .union([z.literal(""), z.coerce.number().min(0)])
      .optional(),
    demoClassWilling: z.boolean().optional(),
    boardExamSpecialization: z.string().trim().optional(),
    languageFluency: z.string().trim().optional(),
    priorResults: z.string().trim().optional(),
    portfolioLinks: z.string().trim().optional(),
    referenceDetails: z.string().trim().optional(),
    resumeUrl: optionalUrl,
    profilePhotoUrl: optionalUrl,
    supportingDocumentUrls: z.string().trim().optional(),
    consentAccepted: z
      .boolean()
      .refine((value) => value, "Please confirm the declaration"),
    contactConsent: z
      .boolean()
      .refine((value) => value, "Please confirm that we may contact you"),
  })
  .superRefine((value, ctx) => {
    const min =
      value.expectedFeeMin === "" || value.expectedFeeMin === undefined
        ? undefined
        : Number(value.expectedFeeMin);
    const max =
      value.expectedFeeMax === "" || value.expectedFeeMax === undefined
        ? undefined
        : Number(value.expectedFeeMax);

    if (
      typeof min === "number" &&
      typeof max === "number" &&
      Number.isFinite(min) &&
      Number.isFinite(max) &&
      max < min
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expectedFeeMax"],
        message: "Maximum fee must be greater than or equal to minimum fee",
      });
    }
  });

type TutorApplicationFormValues = z.infer<typeof tutorApplicationSchema>;

function splitList(value?: string) {
  return (value ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function readCampaignParams() {
  if (typeof window === "undefined") {
    return undefined;
  }

  const params = new URLSearchParams(window.location.search);
  const entries = Object.fromEntries(
    Array.from(params.entries()).filter(([key]) =>
      key.toLowerCase().startsWith("utm_"),
    ),
  );

  return Object.keys(entries).length > 0 ? entries : undefined;
}

export function TutorApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TutorApplicationFormValues>({
    resolver: zodResolver(tutorApplicationSchema),
    defaultValues: {
      boardsHandled: [],
      classesHandled: [],
      preferredTeachingMode: "",
      demoClassWilling: false,
      consentAccepted: false,
      contactConsent: false,
    },
  });

  const selectedBoards = useWatch({ control, name: "boardsHandled" }) ?? [];
  const selectedClasses = useWatch({ control, name: "classesHandled" }) ?? [];
  const selectedTeachingMode =
    useWatch({ control, name: "preferredTeachingMode" }) ?? "";
  const totalErrors = useMemo(() => Object.keys(errors).length, [errors]);

  const toggleMultiSelect = (
    field: "boardsHandled" | "classesHandled",
    value: string,
  ) => {
    const current =
      field === "boardsHandled" ? selectedBoards : selectedClasses;
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setValue(field, next, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (values: TutorApplicationFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await api.tutorApplications.submit({
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        currentLocation: values.currentLocation.trim(),
        gender: values.gender?.trim() || undefined,
        experienceYears: values.experienceYears,
        highestQualification: values.highestQualification.trim(),
        universityInstitution: values.universityInstitution.trim(),
        subjectsHandled: splitList(values.subjectsHandled),
        boardsHandled: values.boardsHandled,
        classesHandled: values.classesHandled,
        preferredTeachingMode: values.preferredTeachingMode,
        areasWillingToServe: splitList(values.areasWillingToServe),
        schoolsFamiliarWith: splitList(values.schoolsFamiliarWith),
        professionalBio: values.professionalBio.trim(),
        teachingApproach: values.teachingApproach.trim(),
        availability: values.availability.trim(),
        expectedFeeMin:
          values.expectedFeeMin === "" || values.expectedFeeMin === undefined
            ? undefined
            : Number(values.expectedFeeMin),
        expectedFeeMax:
          values.expectedFeeMax === "" || values.expectedFeeMax === undefined
            ? undefined
            : Number(values.expectedFeeMax),
        demoClassWilling: Boolean(values.demoClassWilling),
        boardExamSpecialization:
          values.boardExamSpecialization?.trim() || undefined,
        languageFluency: splitList(values.languageFluency),
        priorResults: values.priorResults?.trim() || undefined,
        portfolioLinks: splitList(values.portfolioLinks),
        referenceDetails: values.referenceDetails?.trim() || undefined,
        resumeUrl: values.resumeUrl?.trim() || undefined,
        profilePhotoUrl: values.profilePhotoUrl?.trim() || undefined,
        supportingDocumentUrls: splitList(values.supportingDocumentUrls),
        consentAccepted: true,
        contactConsent: true,
        source: "website_become_our_tutor",
        pageUrl:
          typeof window !== "undefined" ? window.location.href : undefined,
        campaignParams: readCampaignParams(),
      });

      setSubmissionId(response.id);
      reset({
        boardsHandled: [],
        classesHandled: [],
        preferredTeachingMode: "",
        demoClassWilling: false,
        consentAccepted: false,
        contactConsent: false,
      });
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We could not submit your application right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionId) {
    return (
      <div className="rounded-3xl border border-border/50 bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-6 text-center text-2xl font-heading font-bold text-primary">
          Application submitted
        </h3>
        <p className="mt-3 text-center leading-relaxed text-muted-foreground">
          Your profile is now in the BoardPeFocus review queue. Our team will
          evaluate board fit, teaching depth, and Gurugram relevance before we
          contact you for the next step.
        </p>
        <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">
            Application Reference
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-primary">
            {submissionId}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setSubmissionId(null)}
          >
            Submit another application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[2rem] border border-border/50 bg-white p-6 shadow-xl md:p-8"
      noValidate
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">
            Tutor Application Form
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Share accurate academic, board, and service details. This submission
            goes directly into our admin review workflow.
          </p>
        </div>
        <div className="rounded-full bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary/70">
          {totalErrors > 0
            ? `${totalErrors} field${totalErrors > 1 ? "s" : ""} need attention`
            : "Review ready"}
        </div>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-primary">Basic profile</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName ? (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone ? (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender (optional)</Label>
              <Input
                id="gender"
                {...register("gender")}
                placeholder="Optional"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register("city")}
                aria-invalid={!!errors.city}
              />
              {errors.city ? (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentLocation">Current location / area</Label>
              <Input
                id="currentLocation"
                {...register("currentLocation")}
                aria-invalid={!!errors.currentLocation}
              />
              {errors.currentLocation ? (
                <p className="text-sm text-destructive">
                  {errors.currentLocation.message}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-primary">Academic profile</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="experienceYears">
                Years of teaching experience
              </Label>
              <Input
                id="experienceYears"
                type="number"
                min="0"
                {...register("experienceYears")}
                aria-invalid={!!errors.experienceYears}
              />
              {errors.experienceYears ? (
                <p className="text-sm text-destructive">
                  {errors.experienceYears.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="highestQualification">
                Highest qualification
              </Label>
              <Input
                id="highestQualification"
                {...register("highestQualification")}
                aria-invalid={!!errors.highestQualification}
              />
              {errors.highestQualification ? (
                <p className="text-sm text-destructive">
                  {errors.highestQualification.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="universityInstitution">
                University / institution
              </Label>
              <Input
                id="universityInstitution"
                {...register("universityInstitution")}
                aria-invalid={!!errors.universityInstitution}
              />
              {errors.universityInstitution ? (
                <p className="text-sm text-destructive">
                  {errors.universityInstitution.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subjectsHandled">Subjects handled</Label>
              <Input
                id="subjectsHandled"
                {...register("subjectsHandled")}
                placeholder="Example: Physics, Chemistry, Mathematics"
                aria-invalid={!!errors.subjectsHandled}
              />
              {errors.subjectsHandled ? (
                <p className="text-sm text-destructive">
                  {errors.subjectsHandled.message}
                </p>
              ) : null}
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Boards handled
            </legend>
            <div className="grid gap-3 md:grid-cols-3">
              {boardOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-medium"
                >
                  <input
                    type="checkbox"
                    checked={selectedBoards.includes(option)}
                    onChange={() => toggleMultiSelect("boardsHandled", option)}
                    className="h-4 w-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.boardsHandled ? (
              <p id="boards-handled-error" className="text-sm text-destructive">
                {errors.boardsHandled.message}
              </p>
            ) : null}
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Classes handled
            </legend>
            <div className="grid gap-3 md:grid-cols-3">
              {classOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-medium"
                >
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes(option)}
                    onChange={() => toggleMultiSelect("classesHandled", option)}
                    className="h-4 w-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.classesHandled ? (
              <p id="classes-handled-error" className="text-sm text-destructive">
                {errors.classesHandled.message}
              </p>
            ) : null}
          </fieldset>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-primary">Service fit</h3>
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Preferred teaching mode
            </legend>
            <div className="grid gap-3 md:grid-cols-3">
              {teachingModeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-medium"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedTeachingMode === option.value}
                    onChange={() =>
                      setValue("preferredTeachingMode", option.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className="h-4 w-4"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {errors.preferredTeachingMode ? (
              <p
                id="preferred-teaching-mode-error"
                className="text-sm text-destructive"
              >
                {errors.preferredTeachingMode.message}
              </p>
            ) : null}
          </fieldset>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="areasWillingToServe">
                Areas willing to serve
              </Label>
              <Input
                id="areasWillingToServe"
                {...register("areasWillingToServe")}
                placeholder="Example: DLF Phase 4, Golf Course Road, Sushant Lok"
                aria-invalid={!!errors.areasWillingToServe}
              />
              {errors.areasWillingToServe ? (
                <p className="text-sm text-destructive">
                  {errors.areasWillingToServe.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolsFamiliarWith">
                Schools familiar with (optional)
              </Label>
              <Input
                id="schoolsFamiliarWith"
                {...register("schoolsFamiliarWith")}
                placeholder="Example: DPS RK Puram, Heritage, Shiv Nadar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedFeeMin">
                Expected fee range (optional)
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="expectedFeeMin"
                  type="number"
                  min="0"
                  {...register("expectedFeeMin")}
                  placeholder="Min"
                />
                <Input
                  id="expectedFeeMax"
                  type="number"
                  min="0"
                  {...register("expectedFeeMax")}
                  placeholder="Max"
                  aria-invalid={!!errors.expectedFeeMax}
                />
              </div>
              {errors.expectedFeeMax ? (
                <p className="text-sm text-destructive">
                  {errors.expectedFeeMax.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">
                Availability / preferred time slots
              </Label>
              <Input
                id="availability"
                {...register("availability")}
                placeholder="Example: Weekday evenings, Saturday mornings"
                aria-invalid={!!errors.availability}
              />
              {errors.availability ? (
                <p className="text-sm text-destructive">
                  {errors.availability.message}
                </p>
              ) : null}
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-medium">
            <input
              type="checkbox"
              {...register("demoClassWilling")}
              className="h-4 w-4"
            />
            <span>
              I am open to a short interaction or demo class if shortlisted.
            </span>
          </label>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-primary">
            Review notes for our team
          </h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="professionalBio">Short professional bio</Label>
              <Textarea
                id="professionalBio"
                {...register("professionalBio")}
                aria-invalid={!!errors.professionalBio}
              />
              {errors.professionalBio ? (
                <p className="text-sm text-destructive">
                  {errors.professionalBio.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="teachingApproach">
                Teaching approach / methodology
              </Label>
              <Textarea
                id="teachingApproach"
                {...register("teachingApproach")}
                aria-invalid={!!errors.teachingApproach}
              />
              {errors.teachingApproach ? (
                <p className="text-sm text-destructive">
                  {errors.teachingApproach.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="boardExamSpecialization">
                Board-exam specialization (optional)
              </Label>
              <Textarea
                id="boardExamSpecialization"
                {...register("boardExamSpecialization")}
                placeholder="Example: CBSE Physics numericals, IGCSE Chemistry practical prep, IB EE mentoring"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languageFluency">
                Language fluency (optional)
              </Label>
              <Input
                id="languageFluency"
                {...register("languageFluency")}
                placeholder="Example: English, Hindi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priorResults">
                Prior results / achievements (optional)
              </Label>
              <Textarea
                id="priorResults"
                {...register("priorResults")}
                placeholder="Share brief result outcomes, notable student improvements, or recognitions."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referenceDetails">
                References or portfolio notes (optional)
              </Label>
              <Textarea
                id="referenceDetails"
                {...register("referenceDetails")}
                placeholder="Share reference context, LinkedIn, portfolio notes, or any relevant credibility markers."
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-primary">Supporting links</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL (optional)</Label>
              <Input
                id="resumeUrl"
                {...register("resumeUrl")}
                placeholder="Google Drive or any http/https link"
                aria-invalid={!!errors.resumeUrl}
              />
              {errors.resumeUrl ? (
                <p className="text-sm text-destructive">
                  {errors.resumeUrl.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePhotoUrl">
                Profile photo URL (optional)
              </Label>
              <Input
                id="profilePhotoUrl"
                {...register("profilePhotoUrl")}
                placeholder="Google Drive or any http/https link"
                aria-invalid={!!errors.profilePhotoUrl}
              />
              {errors.profilePhotoUrl ? (
                <p className="text-sm text-destructive">
                  {errors.profilePhotoUrl.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="portfolioLinks">
                Portfolio / supporting links (optional)
              </Label>
              <Textarea
                id="portfolioLinks"
                {...register("portfolioLinks")}
                placeholder="One link per line or comma-separated"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="supportingDocumentUrls">
                Certificate or supporting document URLs (optional)
              </Label>
              <Textarea
                id="supportingDocumentUrls"
                {...register("supportingDocumentUrls")}
                placeholder="One link per line or comma-separated"
              />
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            The current production stack does not expose direct binary uploads
            yet, so document and photo links are collected securely here instead
            of using an unverified upload path.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-primary">Declaration</h3>
          <label className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              {...register("consentAccepted")}
              className="mt-1 h-4 w-4"
            />
            <span>
              I confirm that the information shared here is accurate and may be
              used by BoardPeFocus for screening, academic review, and
              onboarding decisions.
            </span>
          </label>
          {errors.consentAccepted ? (
            <p className="text-sm text-destructive">
              {errors.consentAccepted.message}
            </p>
          ) : null}

          <label className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              {...register("contactConsent")}
              className="mt-1 h-4 w-4"
            />
            <span>
              I agree to be contacted by BoardPeFocus regarding my application,
              shortlisting, and onboarding process.
            </span>
          </label>
          {errors.contactConsent ? (
            <p className="text-sm text-destructive">
              {errors.contactConsent.message}
            </p>
          ) : null}
        </section>
      </div>

      {serverError ? (
        <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {serverError}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          This form is connected to our live backend and admin review queue.
        </p>
        <Button
          type="submit"
          className="h-12 rounded-xl px-8 text-base font-bold shadow-lg shadow-primary/15"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            <>
              Submit Application
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
