CREATE TYPE "TutorApplicationStatus" AS ENUM (
  'NEW',
  'UNDER_REVIEW',
  'SHORTLISTED',
  'APPROVED',
  'REJECTED',
  'ARCHIVED',
  'PUBLISHED'
);

CREATE TABLE "TutorApplication" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "currentLocation" TEXT NOT NULL,
  "gender" TEXT,
  "experienceYears" INTEGER NOT NULL,
  "highestQualification" TEXT NOT NULL,
  "universityInstitution" TEXT NOT NULL,
  "subjectsHandled" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "boardsHandled" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "classesHandled" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "preferredTeachingMode" TEXT NOT NULL,
  "areasWillingToServe" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "schoolsFamiliarWith" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "professionalBio" TEXT NOT NULL,
  "teachingApproach" TEXT NOT NULL,
  "availability" TEXT NOT NULL,
  "expectedFeeMin" INTEGER,
  "expectedFeeMax" INTEGER,
  "demoClassWilling" BOOLEAN NOT NULL DEFAULT false,
  "boardExamSpecialization" TEXT,
  "languageFluency" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "priorResults" TEXT,
  "portfolioLinks" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "referenceDetails" TEXT,
  "resumeUrl" TEXT,
  "profilePhotoUrl" TEXT,
  "supportingDocumentUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "consentAccepted" BOOLEAN NOT NULL,
  "contactConsent" BOOLEAN NOT NULL,
  "source" TEXT DEFAULT 'public_tutor_application',
  "pageUrl" TEXT,
  "campaignParams" JSONB,
  "status" "TutorApplicationStatus" NOT NULL DEFAULT 'NEW',
  "adminNotes" TEXT,
  "mappedBoardIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "mappedSubjectIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "mappedClassLevelIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "mappedSchoolIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "mappedSectorIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "mappedSocietyIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "reviewedAt" TIMESTAMP(3),
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TutorApplication_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Tutor"
ADD COLUMN "sourceApplicationId" TEXT;

CREATE UNIQUE INDEX "Tutor_sourceApplicationId_key" ON "Tutor"("sourceApplicationId");
CREATE INDEX "TutorApplication_status_createdAt_idx" ON "TutorApplication"("status", "createdAt");
CREATE INDEX "TutorApplication_email_idx" ON "TutorApplication"("email");
CREATE INDEX "TutorApplication_phone_idx" ON "TutorApplication"("phone");

ALTER TABLE "Tutor"
ADD CONSTRAINT "Tutor_sourceApplicationId_fkey"
FOREIGN KEY ("sourceApplicationId") REFERENCES "TutorApplication"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
