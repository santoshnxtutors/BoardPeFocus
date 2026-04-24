-- Add publishable structured-content fields to existing content entities.
ALTER TABLE "Tutor"
ADD COLUMN "teachingMethod" TEXT,
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "metaDescription" TEXT,
ADD COLUMN "canonical" TEXT,
ADD COLUMN "ogTitle" TEXT,
ADD COLUMN "ogDescription" TEXT,
ADD COLUMN "ogImage" TEXT,
ADD COLUMN "schemaData" JSONB;

ALTER TABLE "Board"
ADD COLUMN "shortDescription" TEXT,
ADD COLUMN "longDescription" TEXT,
ADD COLUMN "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "metaDescription" TEXT,
ADD COLUMN "canonical" TEXT,
ADD COLUMN "ogTitle" TEXT,
ADD COLUMN "ogDescription" TEXT,
ADD COLUMN "ogImage" TEXT,
ADD COLUMN "schemaData" JSONB,
ADD COLUMN "relatedLinks" JSONB;

UPDATE "Board" SET "status" = 'PUBLISHED' WHERE "status" = 'DRAFT';

ALTER TABLE "Subject"
ADD COLUMN "shortDescription" TEXT,
ADD COLUMN "longDescription" TEXT,
ADD COLUMN "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "metaDescription" TEXT,
ADD COLUMN "canonical" TEXT,
ADD COLUMN "ogTitle" TEXT,
ADD COLUMN "ogDescription" TEXT,
ADD COLUMN "ogImage" TEXT,
ADD COLUMN "schemaData" JSONB,
ADD COLUMN "relatedLinks" JSONB;

UPDATE "Subject" SET "status" = 'PUBLISHED' WHERE "status" = 'DRAFT';

ALTER TABLE "School"
ADD COLUMN "locality" TEXT,
ADD COLUMN "curriculumMix" TEXT,
ADD COLUMN "safeSupportWording" TEXT,
ADD COLUMN "contentBlocks" JSONB,
ADD COLUMN "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "metaDescription" TEXT,
ADD COLUMN "canonical" TEXT,
ADD COLUMN "ogTitle" TEXT,
ADD COLUMN "ogDescription" TEXT,
ADD COLUMN "ogImage" TEXT,
ADD COLUMN "schemaData" JSONB;

UPDATE "School" SET "status" = 'PUBLISHED' WHERE "status" = 'DRAFT';

ALTER TABLE "Sector"
ADD COLUMN "city" TEXT,
ADD COLUMN "corridor" TEXT,
ADD COLUMN "contentBlocks" JSONB,
ADD COLUMN "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "metaDescription" TEXT,
ADD COLUMN "canonical" TEXT,
ADD COLUMN "ogTitle" TEXT,
ADD COLUMN "ogDescription" TEXT,
ADD COLUMN "ogImage" TEXT,
ADD COLUMN "schemaData" JSONB;

UPDATE "Sector" SET "status" = 'PUBLISHED' WHERE "status" = 'DRAFT';

ALTER TABLE "Society"
ADD COLUMN "description" TEXT,
ADD COLUMN "contentBlocks" JSONB,
ADD COLUMN "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "metaDescription" TEXT,
ADD COLUMN "canonical" TEXT,
ADD COLUMN "ogTitle" TEXT,
ADD COLUMN "ogDescription" TEXT,
ADD COLUMN "ogImage" TEXT,
ADD COLUMN "schemaData" JSONB;

UPDATE "Society" SET "status" = 'PUBLISHED' WHERE "status" = 'DRAFT';

ALTER TABLE "PageRecord"
ADD COLUMN "classLevelId" TEXT;

ALTER TABLE "Lead"
ADD COLUMN "preferredMode" TEXT,
ADD COLUMN "preferredTimeSlot" TEXT;

-- Class taxonomy.
CREATE TABLE "ClassLevel" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER,
    "description" TEXT,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "metaDescription" TEXT,
    "canonical" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "schemaData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClassLevel_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ClassLevel_slug_key" ON "ClassLevel"("slug");

CREATE TABLE "BoardClass" (
    "boardId" TEXT NOT NULL,
    "classLevelId" TEXT NOT NULL,
    CONSTRAINT "BoardClass_pkey" PRIMARY KEY ("boardId","classLevelId")
);

CREATE TABLE "SubjectClass" (
    "subjectId" TEXT NOT NULL,
    "classLevelId" TEXT NOT NULL,
    CONSTRAINT "SubjectClass_pkey" PRIMARY KEY ("subjectId","classLevelId")
);

CREATE TABLE "TutorClass" (
    "tutorId" TEXT NOT NULL,
    "classLevelId" TEXT NOT NULL,
    CONSTRAINT "TutorClass_pkey" PRIMARY KEY ("tutorId","classLevelId")
);

-- School, locality, and taxonomy relationship tables.
CREATE TABLE "SchoolSubject" (
    "schoolId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "SchoolSubject_pkey" PRIMARY KEY ("schoolId","subjectId")
);

CREATE TABLE "SchoolSector" (
    "schoolId" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,
    CONSTRAINT "SchoolSector_pkey" PRIMARY KEY ("schoolId","sectorId")
);

CREATE TABLE "SchoolSociety" (
    "schoolId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    CONSTRAINT "SchoolSociety_pkey" PRIMARY KEY ("schoolId","societyId")
);

CREATE TABLE "SectorBoard" (
    "sectorId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    CONSTRAINT "SectorBoard_pkey" PRIMARY KEY ("sectorId","boardId")
);

CREATE TABLE "SectorSubject" (
    "sectorId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "SectorSubject_pkey" PRIMARY KEY ("sectorId","subjectId")
);

CREATE TABLE "SocietyBoard" (
    "societyId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    CONSTRAINT "SocietyBoard_pkey" PRIMARY KEY ("societyId","boardId")
);

CREATE TABLE "SocietySubject" (
    "societyId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "SocietySubject_pkey" PRIMARY KEY ("societyId","subjectId")
);

-- Global FAQs and assignment map.
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FaqAssignment" (
    "id" TEXT NOT NULL,
    "faqId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "pageSlug" TEXT,
    CONSTRAINT "FaqAssignment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "FaqAssignment_entityType_entityId_idx" ON "FaqAssignment"("entityType","entityId");
CREATE INDEX "FaqAssignment_pageSlug_idx" ON "FaqAssignment"("pageSlug");

-- Resources/blog.
CREATE TABLE "ResourceArticle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "summary" TEXT,
    "body" TEXT,
    "bodyBlocks" JSONB,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "metaDescription" TEXT,
    "canonical" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "schemaData" JSONB,
    "internalLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "ResourceArticle_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ResourceArticle_slug_key" ON "ResourceArticle"("slug");

CREATE TABLE "ResourceArticleMapping" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    CONSTRAINT "ResourceArticleMapping_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ResourceArticleMapping_resourceId_entityType_entityId_key" ON "ResourceArticleMapping"("resourceId","entityType","entityId");
CREATE INDEX "ResourceArticleMapping_entityType_entityId_idx" ON "ResourceArticleMapping"("entityType","entityId");

-- Process/support pages.
CREATE TABLE "ProcessContent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "body" TEXT,
    "contentBlocks" JSONB,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "metaDescription" TEXT,
    "canonical" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "schemaData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "ProcessContent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProcessContent_slug_key" ON "ProcessContent"("slug");

-- Results/testimonials.
CREATE TABLE "ResultStory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'TESTIMONIAL',
    "title" TEXT NOT NULL,
    "parentName" TEXT,
    "studentName" TEXT,
    "context" TEXT,
    "story" TEXT NOT NULL,
    "rating" INTEGER,
    "scoreLabel" TEXT,
    "displayControls" JSONB,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "visibility" BOOLEAN NOT NULL DEFAULT false,
    "boardId" TEXT,
    "classLevelId" TEXT,
    "subjectId" TEXT,
    "schoolId" TEXT,
    "sectorId" TEXT,
    "societyId" TEXT,
    "tutorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "ResultStory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ResultStory_slug_key" ON "ResultStory"("slug");
CREATE INDEX "ResultStory_status_visibility_idx" ON "ResultStory"("status","visibility");
CREATE INDEX "ResultStory_boardId_idx" ON "ResultStory"("boardId");
CREATE INDEX "ResultStory_classLevelId_idx" ON "ResultStory"("classLevelId");
CREATE INDEX "ResultStory_subjectId_idx" ON "ResultStory"("subjectId");
CREATE INDEX "ResultStory_schoolId_idx" ON "ResultStory"("schoolId");
CREATE INDEX "ResultStory_sectorId_idx" ON "ResultStory"("sectorId");
CREATE INDEX "ResultStory_societyId_idx" ON "ResultStory"("societyId");
CREATE INDEX "ResultStory_tutorId_idx" ON "ResultStory"("tutorId");

-- Foreign keys.
ALTER TABLE "PageRecord" ADD CONSTRAINT "PageRecord_classLevelId_fkey" FOREIGN KEY ("classLevelId") REFERENCES "ClassLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BoardClass" ADD CONSTRAINT "BoardClass_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BoardClass" ADD CONSTRAINT "BoardClass_classLevelId_fkey" FOREIGN KEY ("classLevelId") REFERENCES "ClassLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SubjectClass" ADD CONSTRAINT "SubjectClass_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SubjectClass" ADD CONSTRAINT "SubjectClass_classLevelId_fkey" FOREIGN KEY ("classLevelId") REFERENCES "ClassLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TutorClass" ADD CONSTRAINT "TutorClass_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TutorClass" ADD CONSTRAINT "TutorClass_classLevelId_fkey" FOREIGN KEY ("classLevelId") REFERENCES "ClassLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSubject" ADD CONSTRAINT "SchoolSubject_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSubject" ADD CONSTRAINT "SchoolSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSector" ADD CONSTRAINT "SchoolSector_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSector" ADD CONSTRAINT "SchoolSector_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSociety" ADD CONSTRAINT "SchoolSociety_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSociety" ADD CONSTRAINT "SchoolSociety_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SectorBoard" ADD CONSTRAINT "SectorBoard_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SectorBoard" ADD CONSTRAINT "SectorBoard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SectorSubject" ADD CONSTRAINT "SectorSubject_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SectorSubject" ADD CONSTRAINT "SectorSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SocietyBoard" ADD CONSTRAINT "SocietyBoard_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SocietyBoard" ADD CONSTRAINT "SocietyBoard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SocietySubject" ADD CONSTRAINT "SocietySubject_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SocietySubject" ADD CONSTRAINT "SocietySubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FaqAssignment" ADD CONSTRAINT "FaqAssignment_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "Faq"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResourceArticleMapping" ADD CONSTRAINT "ResourceArticleMapping_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "ResourceArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResultStory" ADD CONSTRAINT "ResultStory_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ResultStory" ADD CONSTRAINT "ResultStory_classLevelId_fkey" FOREIGN KEY ("classLevelId") REFERENCES "ClassLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ResultStory" ADD CONSTRAINT "ResultStory_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ResultStory" ADD CONSTRAINT "ResultStory_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ResultStory" ADD CONSTRAINT "ResultStory_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ResultStory" ADD CONSTRAINT "ResultStory_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ResultStory" ADD CONSTRAINT "ResultStory_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
