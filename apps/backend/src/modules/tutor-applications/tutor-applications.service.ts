import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TutorApplication,
  TutorApplicationStatus,
  TutorStatus,
} from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';
import { ConvertTutorApplicationDto } from './dto/convert-tutor-application.dto';
import { CreateTutorApplicationDto } from './dto/create-tutor-application.dto';
import { UpdateTutorApplicationDto } from './dto/update-tutor-application.dto';

@Injectable()
export class TutorApplicationsService {
  private readonly logger = new Logger(TutorApplicationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateTutorApplicationDto) {
    const data = this.buildCreateData(dto);
    const application = await this.prisma.tutorApplication.create({ data });

    this.logger.log(`New tutor application created: ${application.id}`);
    void this.triggerNotification(application);

    return application;
  }

  findAll(status?: TutorApplicationStatus) {
    if (status && !Object.values(TutorApplicationStatus).includes(status)) {
      throw new BadRequestException('Invalid tutor application status.');
    }

    const where = status ? { status } : undefined;
    return this.prisma.tutorApplication.findMany({
      where,
      include: {
        publishedTutor: {
          select: { id: true, name: true, slug: true, status: true },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const application = await this.prisma.tutorApplication.findUnique({
      where: { id },
      include: {
        publishedTutor: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true,
            photoUrl: true,
            email: true,
            isVerified: true,
            isFeatured: true,
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException('Tutor application not found.');
    }

    return application;
  }

  async update(id: string, dto: UpdateTutorApplicationDto) {
    await this.findOne(id);
    const data = this.buildUpdateData(dto);

    return this.prisma.tutorApplication.update({
      where: { id },
      data,
      include: {
        publishedTutor: {
          select: { id: true, name: true, slug: true, status: true },
        },
      },
    });
  }

  async convertToTutor(id: string, dto: ConvertTutorApplicationDto) {
    const application = await this.prisma.tutorApplication.findUnique({
      where: { id },
      include: {
        publishedTutor: {
          select: {
            id: true,
            slug: true,
            email: true,
            photoUrl: true,
            isVerified: true,
            isFeatured: true,
            metaDescription: true,
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException('Tutor application not found.');
    }

    if (
      application.status === TutorApplicationStatus.REJECTED ||
      application.status === TutorApplicationStatus.ARCHIVED
    ) {
      throw new BadRequestException(
        'Rejected or archived applications cannot be converted to tutors.',
      );
    }

    const tutorStatus = dto.tutorStatus ?? TutorStatus.DRAFT;

    if (
      tutorStatus === TutorStatus.PUBLISHED &&
      application.status !== TutorApplicationStatus.APPROVED &&
      application.status !== TutorApplicationStatus.PUBLISHED
    ) {
      throw new BadRequestException(
        'Only approved tutor applications can be published.',
      );
    }

    if (tutorStatus === TutorStatus.PUBLISHED) {
      this.assertPublishMappings(application);
    }

    return this.prisma.$transaction(async (tx) => {
      const now = new Date();
      const tutorData = await this.buildTutorData(
        tx as any,
        application,
        tutorStatus,
      );

      const tutor = application.publishedTutor?.id
        ? await tx.tutor.update({
            where: { id: application.publishedTutor.id },
            data: tutorData,
          })
        : await tx.tutor.create({ data: tutorData });

      await this.replaceTutorRelations(tx as any, tutor.id, application);
      await this.seedTutorProfileDetails(tx as any, tutor.id, application);

      await tx.tutorApplication.update({
        where: { id: application.id },
        data: {
          status:
            tutorStatus === TutorStatus.PUBLISHED
              ? TutorApplicationStatus.PUBLISHED
              : TutorApplicationStatus.APPROVED,
          reviewedAt: now,
          publishedAt:
            tutorStatus === TutorStatus.PUBLISHED
              ? now
              : application.publishedAt,
        },
      });

      return tx.tutorApplication.findUnique({
        where: { id: application.id },
        include: {
          publishedTutor: {
            select: { id: true, name: true, slug: true, status: true },
          },
        },
      });
    });
  }

  private buildCreateData(dto: CreateTutorApplicationDto) {
    this.assertFeeRange(dto.expectedFeeMin, dto.expectedFeeMax);

    return {
      fullName: this.requiredString(dto.fullName, 'Full name'),
      phone: this.normalizePhone(dto.phone),
      email: this.normalizeEmail(dto.email),
      city: this.requiredString(dto.city, 'City'),
      currentLocation: this.requiredString(
        dto.currentLocation,
        'Current location',
      ),
      gender: this.optionalString(dto.gender) ?? null,
      experienceYears: dto.experienceYears,
      highestQualification: this.requiredString(
        dto.highestQualification,
        'Highest qualification',
      ),
      universityInstitution: this.requiredString(
        dto.universityInstitution,
        'University / institution',
      ),
      subjectsHandled: this.requiredStringArray(
        dto.subjectsHandled,
        'Subjects handled',
      ),
      boardsHandled: this.requiredStringArray(
        dto.boardsHandled,
        'Boards handled',
      ),
      classesHandled: this.requiredStringArray(
        dto.classesHandled,
        'Classes handled',
      ),
      preferredTeachingMode: this.requiredString(
        dto.preferredTeachingMode,
        'Preferred teaching mode',
      ),
      areasWillingToServe: this.requiredStringArray(
        dto.areasWillingToServe,
        'Areas willing to serve',
      ),
      schoolsFamiliarWith: this.normalizeStringArray(dto.schoolsFamiliarWith),
      professionalBio: this.requiredString(
        dto.professionalBio,
        'Professional bio',
      ),
      teachingApproach: this.requiredString(
        dto.teachingApproach,
        'Teaching approach',
      ),
      availability: this.requiredString(dto.availability, 'Availability'),
      expectedFeeMin: dto.expectedFeeMin ?? null,
      expectedFeeMax: dto.expectedFeeMax ?? null,
      demoClassWilling: dto.demoClassWilling ?? false,
      boardExamSpecialization:
        this.optionalString(dto.boardExamSpecialization) ?? null,
      languageFluency: this.normalizeStringArray(dto.languageFluency),
      priorResults: this.optionalString(dto.priorResults) ?? null,
      portfolioLinks: this.normalizeStringArray(dto.portfolioLinks),
      referenceDetails: this.optionalString(dto.referenceDetails) ?? null,
      resumeUrl: this.optionalString(dto.resumeUrl) ?? null,
      profilePhotoUrl: this.optionalString(dto.profilePhotoUrl) ?? null,
      supportingDocumentUrls: this.normalizeStringArray(
        dto.supportingDocumentUrls,
      ),
      consentAccepted: dto.consentAccepted,
      contactConsent: dto.contactConsent,
      source: this.optionalString(dto.source) ?? 'public_tutor_application',
      pageUrl: this.optionalString(dto.pageUrl) ?? null,
      campaignParams: this.normalizeCampaignParams(dto.campaignParams),
      status: TutorApplicationStatus.NEW,
    };
  }

  private buildUpdateData(dto: UpdateTutorApplicationDto) {
    this.assertFeeRange(dto.expectedFeeMin, dto.expectedFeeMax);
    const data: Record<string, unknown> = {};

    if (dto.fullName !== undefined) {
      data.fullName = this.requiredString(dto.fullName, 'Full name');
    }
    if (dto.phone !== undefined) {
      data.phone = this.normalizePhone(dto.phone);
    }
    if (dto.email !== undefined) {
      data.email = this.normalizeEmail(dto.email);
    }
    if (dto.city !== undefined) {
      data.city = this.requiredString(dto.city, 'City');
    }
    if (dto.currentLocation !== undefined) {
      data.currentLocation = this.requiredString(
        dto.currentLocation,
        'Current location',
      );
    }
    if (dto.gender !== undefined) {
      data.gender = this.optionalString(dto.gender) ?? null;
    }
    if (dto.experienceYears !== undefined) {
      data.experienceYears = dto.experienceYears;
    }
    if (dto.highestQualification !== undefined) {
      data.highestQualification = this.requiredString(
        dto.highestQualification,
        'Highest qualification',
      );
    }
    if (dto.universityInstitution !== undefined) {
      data.universityInstitution = this.requiredString(
        dto.universityInstitution,
        'University / institution',
      );
    }
    if (dto.subjectsHandled !== undefined) {
      data.subjectsHandled = this.requiredStringArray(
        dto.subjectsHandled,
        'Subjects handled',
      );
    }
    if (dto.boardsHandled !== undefined) {
      data.boardsHandled = this.requiredStringArray(
        dto.boardsHandled,
        'Boards handled',
      );
    }
    if (dto.classesHandled !== undefined) {
      data.classesHandled = this.requiredStringArray(
        dto.classesHandled,
        'Classes handled',
      );
    }
    if (dto.preferredTeachingMode !== undefined) {
      data.preferredTeachingMode = this.requiredString(
        dto.preferredTeachingMode,
        'Preferred teaching mode',
      );
    }
    if (dto.areasWillingToServe !== undefined) {
      data.areasWillingToServe = this.requiredStringArray(
        dto.areasWillingToServe,
        'Areas willing to serve',
      );
    }
    if (dto.schoolsFamiliarWith !== undefined) {
      data.schoolsFamiliarWith = this.normalizeStringArray(
        dto.schoolsFamiliarWith,
      );
    }
    if (dto.professionalBio !== undefined) {
      data.professionalBio = this.requiredString(
        dto.professionalBio,
        'Professional bio',
      );
    }
    if (dto.teachingApproach !== undefined) {
      data.teachingApproach = this.requiredString(
        dto.teachingApproach,
        'Teaching approach',
      );
    }
    if (dto.availability !== undefined) {
      data.availability = this.requiredString(dto.availability, 'Availability');
    }
    if (dto.expectedFeeMin !== undefined) {
      data.expectedFeeMin = dto.expectedFeeMin ?? null;
    }
    if (dto.expectedFeeMax !== undefined) {
      data.expectedFeeMax = dto.expectedFeeMax ?? null;
    }
    if (dto.demoClassWilling !== undefined) {
      data.demoClassWilling = dto.demoClassWilling;
    }
    if (dto.boardExamSpecialization !== undefined) {
      data.boardExamSpecialization =
        this.optionalString(dto.boardExamSpecialization) ?? null;
    }
    if (dto.languageFluency !== undefined) {
      data.languageFluency = this.normalizeStringArray(dto.languageFluency);
    }
    if (dto.priorResults !== undefined) {
      data.priorResults = this.optionalString(dto.priorResults) ?? null;
    }
    if (dto.portfolioLinks !== undefined) {
      data.portfolioLinks = this.normalizeStringArray(dto.portfolioLinks);
    }
    if (dto.referenceDetails !== undefined) {
      data.referenceDetails = this.optionalString(dto.referenceDetails) ?? null;
    }
    if (dto.resumeUrl !== undefined) {
      data.resumeUrl = this.optionalString(dto.resumeUrl) ?? null;
    }
    if (dto.profilePhotoUrl !== undefined) {
      data.profilePhotoUrl = this.optionalString(dto.profilePhotoUrl) ?? null;
    }
    if (dto.supportingDocumentUrls !== undefined) {
      data.supportingDocumentUrls = this.normalizeStringArray(
        dto.supportingDocumentUrls,
      );
    }
    if (dto.consentAccepted !== undefined) {
      data.consentAccepted = dto.consentAccepted;
    }
    if (dto.contactConsent !== undefined) {
      data.contactConsent = dto.contactConsent;
    }
    if (dto.source !== undefined) {
      data.source = this.optionalString(dto.source) ?? null;
    }
    if (dto.pageUrl !== undefined) {
      data.pageUrl = this.optionalString(dto.pageUrl) ?? null;
    }
    if (dto.campaignParams !== undefined) {
      data.campaignParams = this.normalizeCampaignParams(dto.campaignParams);
    }
    if (dto.status !== undefined) {
      data.status = dto.status;
      if (dto.status === TutorApplicationStatus.PUBLISHED) {
        data.publishedAt = new Date();
      }
      if (
        dto.status === TutorApplicationStatus.UNDER_REVIEW ||
        dto.status === TutorApplicationStatus.SHORTLISTED ||
        dto.status === TutorApplicationStatus.APPROVED ||
        dto.status === TutorApplicationStatus.REJECTED ||
        dto.status === TutorApplicationStatus.PUBLISHED
      ) {
        data.reviewedAt = new Date();
      }
    }
    if (dto.adminNotes !== undefined) {
      data.adminNotes = this.optionalString(dto.adminNotes) ?? null;
    }
    if (dto.mappedBoardIds !== undefined) {
      data.mappedBoardIds = this.normalizeStringArray(dto.mappedBoardIds);
    }
    if (dto.mappedSubjectIds !== undefined) {
      data.mappedSubjectIds = this.normalizeStringArray(dto.mappedSubjectIds);
    }
    if (dto.mappedClassLevelIds !== undefined) {
      data.mappedClassLevelIds = this.normalizeStringArray(
        dto.mappedClassLevelIds,
      );
    }
    if (dto.mappedSchoolIds !== undefined) {
      data.mappedSchoolIds = this.normalizeStringArray(dto.mappedSchoolIds);
    }
    if (dto.mappedSectorIds !== undefined) {
      data.mappedSectorIds = this.normalizeStringArray(dto.mappedSectorIds);
    }
    if (dto.mappedSocietyIds !== undefined) {
      data.mappedSocietyIds = this.normalizeStringArray(dto.mappedSocietyIds);
    }

    return data;
  }

  private async buildTutorData(
    tx: any,
    application: TutorApplication & {
      publishedTutor?: {
        id: string;
        slug: string;
        email: string | null;
        photoUrl: string | null;
        isVerified: boolean;
        isFeatured: boolean;
        metaDescription: string | null;
      } | null;
    },
    tutorStatus: TutorStatus,
  ) {
    const existingTutorId = application.publishedTutor?.id ?? null;
    const slug =
      application.publishedTutor?.slug ??
      (await this.createUniqueTutorSlug(tx, application.fullName));
    const email = this.normalizeEmail(application.email);

    const emailOwner = await tx.tutor.findFirst({
      where: {
        email,
        deletedAt: null,
        ...(existingTutorId ? { id: { not: existingTutorId } } : {}),
      },
      select: { id: true },
    });

    if (emailOwner) {
      throw new ConflictException(
        'A tutor profile with this email already exists. Review the application email before converting.',
      );
    }

    return {
      slug,
      name: application.fullName,
      displayName: application.fullName,
      email,
      phone: application.phone,
      photoUrl:
        this.optionalString(application.profilePhotoUrl) ??
        application.publishedTutor?.photoUrl ??
        null,
      tagline: this.buildTutorTagline(application),
      bio: application.professionalBio,
      about: this.buildTutorAbout(application),
      methodology: this.buildTutorMethodology(application),
      teachingMethod: application.teachingApproach,
      experienceYrs: application.experienceYears,
      hourlyRateMin: application.expectedFeeMin ?? null,
      hourlyRateMax: application.expectedFeeMax ?? null,
      isFeatured: application.publishedTutor?.isFeatured ?? false,
      isVerified:
        tutorStatus === TutorStatus.PUBLISHED
          ? true
          : (application.publishedTutor?.isVerified ?? false),
      status: tutorStatus,
      sourceApplicationId: application.id,
      metaDescription:
        application.publishedTutor?.metaDescription ??
        `${application.fullName} is part of the curated BoardPeFocus tutor onboarding pipeline for board-focused one-to-one academic support in Gurugram.`,
    };
  }

  private buildTutorTagline(application: TutorApplication) {
    const subjectLine = application.subjectsHandled.slice(0, 2).join(' & ');
    const base = subjectLine || 'Board-focused';
    return `${base} Tutor | ${application.experienceYears}+ Years Experience`;
  }

  private buildTutorAbout(application: TutorApplication) {
    const sections = [
      application.professionalBio,
      application.priorResults
        ? `Results and achievements: ${application.priorResults}`
        : null,
      application.boardExamSpecialization
        ? `Board exam specialization: ${application.boardExamSpecialization}`
        : null,
      application.referenceDetails
        ? `References and portfolio notes: ${application.referenceDetails}`
        : null,
    ].filter(Boolean);

    return sections.join('\n\n');
  }

  private buildTutorMethodology(application: TutorApplication) {
    const sections = [
      application.teachingApproach,
      `Availability: ${application.availability}`,
      application.languageFluency.length > 0
        ? `Languages: ${application.languageFluency.join(', ')}`
        : null,
      application.demoClassWilling
        ? 'Open to an interaction or demo class as part of onboarding.'
        : null,
    ].filter(Boolean);

    return sections.join('\n\n');
  }

  private async createUniqueTutorSlug(tx: any, fullName: string) {
    const baseSlug = this.slugify(fullName);
    if (!baseSlug) {
      throw new BadRequestException('Unable to generate a tutor slug.');
    }

    let slug = baseSlug;
    let suffix = 2;

    while (
      await tx.tutor.findFirst({
        where: { slug },
        select: { id: true },
      })
    ) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    return slug;
  }

  private assertPublishMappings(application: TutorApplication) {
    if (application.mappedBoardIds.length === 0) {
      throw new BadRequestException(
        'At least one mapped board is required before publishing a tutor profile.',
      );
    }

    if (application.mappedSubjectIds.length === 0) {
      throw new BadRequestException(
        'At least one mapped subject is required before publishing a tutor profile.',
      );
    }

    if (application.mappedClassLevelIds.length === 0) {
      throw new BadRequestException(
        'At least one mapped class is required before publishing a tutor profile.',
      );
    }
  }

  private async replaceTutorRelations(
    tx: any,
    tutorId: string,
    application: TutorApplication,
  ) {
    await this.replaceComposite(
      tx.tutorBoard,
      'tutorId',
      'boardId',
      tutorId,
      application.mappedBoardIds,
    );
    await this.replaceComposite(
      tx.tutorSubject,
      'tutorId',
      'subjectId',
      tutorId,
      application.mappedSubjectIds,
    );
    await this.replaceComposite(
      tx.tutorClass,
      'tutorId',
      'classLevelId',
      tutorId,
      application.mappedClassLevelIds,
    );
    await this.replaceComposite(
      tx.tutorSchool,
      'tutorId',
      'schoolId',
      tutorId,
      application.mappedSchoolIds,
    );
    await this.replaceLocationCoverage(
      tx,
      tutorId,
      application.mappedSectorIds,
      application.mappedSocietyIds,
    );
  }

  private async seedTutorProfileDetails(
    tx: any,
    tutorId: string,
    application: TutorApplication,
  ) {
    const existingQualifications = await tx.tutorQualification.count({
      where: { tutorId },
    });

    if (existingQualifications === 0) {
      await tx.tutorQualification.create({
        data: {
          tutorId,
          degree: application.highestQualification,
          institution: application.universityInstitution,
        },
      });
    }

    const existingAchievements = await tx.tutorAchievement.count({
      where: { tutorId },
    });

    if (existingAchievements === 0) {
      const achievements = [
        application.priorResults
          ? {
              tutorId,
              title: 'Prior results and achievements',
              description: application.priorResults,
            }
          : null,
        application.boardExamSpecialization
          ? {
              tutorId,
              title: 'Board exam specialization',
              description: application.boardExamSpecialization,
            }
          : null,
      ].filter(Boolean);

      if (achievements.length > 0) {
        await tx.tutorAchievement.createMany({
          data: achievements,
        });
      }
    }
  }

  private async replaceComposite(
    delegate: any,
    parentField: string,
    childField: string,
    parentId: string,
    ids?: string[],
  ) {
    await delegate.deleteMany({ where: { [parentField]: parentId } });
    const uniqueIds = Array.from(new Set((ids ?? []).filter(Boolean)));
    if (uniqueIds.length === 0) return;

    await delegate.createMany({
      data: uniqueIds.map((childId) => ({
        [parentField]: parentId,
        [childField]: childId,
      })),
      skipDuplicates: true,
    });
  }

  private async replaceLocationCoverage(
    tx: any,
    tutorId: string,
    sectorIds?: string[],
    societyIds?: string[],
  ) {
    await tx.tutorLocationCoverage.deleteMany({ where: { tutorId } });
    const rows = [
      ...(sectorIds ?? []).filter(Boolean).map((sectorId) => ({
        tutorId,
        sectorId,
      })),
      ...(societyIds ?? []).filter(Boolean).map((societyId) => ({
        tutorId,
        societyId,
      })),
    ];

    if (rows.length > 0) {
      await tx.tutorLocationCoverage.createMany({ data: rows });
    }
  }

  private requiredString(value: unknown, fieldName: string) {
    const normalized = this.optionalString(value);
    if (!normalized) {
      throw new BadRequestException(`${fieldName} is required.`);
    }
    return normalized;
  }

  private requiredStringArray(value: string[] | undefined, fieldName: string) {
    const normalized = this.normalizeStringArray(value);
    if (normalized.length === 0) {
      throw new BadRequestException(`${fieldName} is required.`);
    }
    return normalized;
  }

  private optionalString(value: unknown): string | null | undefined {
    if (value === undefined) return undefined;
    if (value === null) return null;
    const normalized = String(value).trim();
    return normalized.length > 0 ? normalized : null;
  }

  private normalizeStringArray(values?: string[] | null) {
    return Array.from(
      new Set(
        (values ?? [])
          .map((value) => this.optionalString(value))
          .filter((value): value is string => Boolean(value)),
      ),
    );
  }

  private normalizeEmail(value: unknown) {
    const normalized = this.requiredString(value, 'Email').toLowerCase();
    return normalized;
  }

  private normalizePhone(value: unknown) {
    const normalized = this.requiredString(value, 'Phone');
    if (!/^\+?[0-9\s-]{10,15}$/.test(normalized)) {
      throw new BadRequestException('Phone number must be 10 to 15 digits.');
    }
    return normalized;
  }

  private assertFeeRange(min?: number | null, max?: number | null) {
    if (typeof min === 'number' && typeof max === 'number' && max < min) {
      throw new BadRequestException(
        'Expected fee max must be greater than or equal to expected fee min.',
      );
    }
  }

  private normalizeCampaignParams(params?: Record<string, string>) {
    if (!params || typeof params !== 'object') {
      return null;
    }

    const normalizedEntries = Object.entries(params)
      .map(
        ([key, value]) =>
          [this.optionalString(key), this.optionalString(value)] as const,
      )
      .filter(
        (entry): entry is readonly [string, string] =>
          Boolean(entry[0]) && Boolean(entry[1]),
      );

    return normalizedEntries.length > 0
      ? Object.fromEntries(normalizedEntries)
      : null;
  }

  private slugify(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
  }

  private async triggerNotification(application: TutorApplication) {
    try {
      const adminPhone = this.configService.get<string>('ADMIN_PHONE_NUMBER');
      if (!adminPhone) {
        this.logger.warn(
          `Skipping tutor application notification for ${application.id} because ADMIN_PHONE_NUMBER is not configured.`,
        );
        return;
      }

      await this.prisma.notificationDelivery.create({
        data: {
          type: 'WHATSAPP',
          recipient: adminPhone,
          subject: `New tutor application: ${application.fullName}`,
          content: JSON.stringify({
            applicationId: application.id,
            fullName: application.fullName,
            phone: application.phone,
            email: application.email,
            city: application.city,
            experienceYears: application.experienceYears,
            createdAt: application.createdAt.toISOString(),
          }),
          status: 'PENDING',
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to trigger notification for tutor application ${application.id}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}
