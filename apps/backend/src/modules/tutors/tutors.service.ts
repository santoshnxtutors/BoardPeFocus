import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, TutorStatus } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';

interface TutorPublicFilters {
  board?: string;
  subject?: string;
  location?: string;
  school?: string;
}

@Injectable()
export class TutorsService {
  constructor(private prisma: PrismaService) {}

  private normalizeRequiredString(value: string, fieldName: string): string {
    const normalized = value.trim();
    if (!normalized) {
      throw new BadRequestException(`${fieldName} is required.`);
    }

    return normalized;
  }

  private normalizeOptionalString(value?: string): string | null | undefined {
    if (value === undefined) {
      return undefined;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private toSlug(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
  }

  private buildTutorCreateData(dto: CreateTutorDto): any {
    const name = this.normalizeRequiredString(dto.name, 'Name');
    const slugSource = dto.slug ?? name;
    const slug = this.toSlug(slugSource);

    if (!slug) {
      throw new BadRequestException(
        'Slug could not be generated for this tutor.',
      );
    }

    if (
      dto.hourlyRateMin !== undefined &&
      dto.hourlyRateMax !== undefined &&
      dto.hourlyRateMax < dto.hourlyRateMin
    ) {
      throw new BadRequestException(
        'hourlyRateMax must be greater than or equal to hourlyRateMin.',
      );
    }

    return {
      slug,
      name,
      displayName: this.normalizeOptionalString(dto.displayName),
      email: this.normalizeOptionalString(dto.email)?.toLowerCase() ?? null,
      phone: this.normalizeOptionalString(dto.phone),
      photoUrl: this.normalizeOptionalString(dto.photoUrl),
      videoUrl: this.normalizeOptionalString(dto.videoUrl),
      tagline: this.normalizeOptionalString(dto.tagline),
      bio: this.normalizeOptionalString(dto.bio),
      about: this.normalizeOptionalString(dto.about),
      methodology: this.normalizeOptionalString(dto.methodology),
      teachingMethod: this.normalizeOptionalString(dto.teachingMethod),
      seoTitle: this.normalizeOptionalString(dto.seoTitle),
      metaDescription: this.normalizeOptionalString(dto.metaDescription),
      canonical: this.normalizeOptionalString(dto.canonical),
      ogTitle: this.normalizeOptionalString(dto.ogTitle),
      ogDescription: this.normalizeOptionalString(dto.ogDescription),
      ogImage: this.normalizeOptionalString(dto.ogImage),
      experienceYrs: dto.experienceYrs ?? 0,
      studentsTaught: dto.studentsTaught ?? 0,
      hourlyRateMin: dto.hourlyRateMin ?? null,
      hourlyRateMax: dto.hourlyRateMax ?? null,
      rating: dto.rating ?? 0,
      reviewsCount: dto.reviewsCount ?? 0,
      priority: dto.priority ?? 0,
      isFeatured: dto.isFeatured ?? false,
      isVerified: dto.isVerified ?? false,
      status: dto.status ?? TutorStatus.DRAFT,
    };
  }

  private buildTutorUpdateData(dto: UpdateTutorDto): any {
    if (
      dto.hourlyRateMin !== undefined &&
      dto.hourlyRateMax !== undefined &&
      dto.hourlyRateMax < dto.hourlyRateMin
    ) {
      throw new BadRequestException(
        'hourlyRateMax must be greater than or equal to hourlyRateMin.',
      );
    }

    const data: any = {};

    if (dto.name !== undefined) {
      data.name = this.normalizeRequiredString(dto.name, 'Name');
    }
    if (dto.slug !== undefined) {
      const normalizedSlug = this.toSlug(dto.slug);
      if (!normalizedSlug) {
        throw new BadRequestException(
          'Slug could not be generated for this tutor.',
        );
      }
      data.slug = normalizedSlug;
    }
    if (dto.displayName !== undefined) {
      data.displayName = this.normalizeOptionalString(dto.displayName);
    }
    if (dto.email !== undefined) {
      data.email =
        this.normalizeOptionalString(dto.email)?.toLowerCase() ?? null;
    }
    if (dto.phone !== undefined) {
      data.phone = this.normalizeOptionalString(dto.phone);
    }
    if (dto.photoUrl !== undefined) {
      data.photoUrl = this.normalizeOptionalString(dto.photoUrl);
    }
    if (dto.videoUrl !== undefined) {
      data.videoUrl = this.normalizeOptionalString(dto.videoUrl);
    }
    if (dto.tagline !== undefined) {
      data.tagline = this.normalizeOptionalString(dto.tagline);
    }
    if (dto.bio !== undefined) {
      data.bio = this.normalizeOptionalString(dto.bio);
    }
    if (dto.about !== undefined) {
      data.about = this.normalizeOptionalString(dto.about);
    }
    if (dto.methodology !== undefined) {
      data.methodology = this.normalizeOptionalString(dto.methodology);
    }
    if (dto.teachingMethod !== undefined) {
      data.teachingMethod = this.normalizeOptionalString(dto.teachingMethod);
    }
    if (dto.seoTitle !== undefined) {
      data.seoTitle = this.normalizeOptionalString(dto.seoTitle);
    }
    if (dto.metaDescription !== undefined) {
      data.metaDescription = this.normalizeOptionalString(dto.metaDescription);
    }
    if (dto.canonical !== undefined) {
      data.canonical = this.normalizeOptionalString(dto.canonical);
    }
    if (dto.ogTitle !== undefined) {
      data.ogTitle = this.normalizeOptionalString(dto.ogTitle);
    }
    if (dto.ogDescription !== undefined) {
      data.ogDescription = this.normalizeOptionalString(dto.ogDescription);
    }
    if (dto.ogImage !== undefined) {
      data.ogImage = this.normalizeOptionalString(dto.ogImage);
    }
    if (dto.experienceYrs !== undefined) {
      data.experienceYrs = dto.experienceYrs;
    }
    if (dto.studentsTaught !== undefined) {
      data.studentsTaught = dto.studentsTaught;
    }
    if (dto.hourlyRateMin !== undefined) {
      data.hourlyRateMin = dto.hourlyRateMin;
    }
    if (dto.hourlyRateMax !== undefined) {
      data.hourlyRateMax = dto.hourlyRateMax;
    }
    if (dto.rating !== undefined) {
      data.rating = dto.rating;
    }
    if (dto.reviewsCount !== undefined) {
      data.reviewsCount = dto.reviewsCount;
    }
    if (dto.priority !== undefined) {
      data.priority = dto.priority;
    }
    if (dto.isFeatured !== undefined) {
      data.isFeatured = dto.isFeatured;
    }
    if (dto.isVerified !== undefined) {
      data.isVerified = dto.isVerified;
    }
    if (dto.status !== undefined) {
      data.status = dto.status;
    }

    return data;
  }

  private calculateCompletenessScore(snapshot: {
    about: string | null;
    bio: string | null;
    boardsCount: number;
    methodology: string | null;
    photoUrl: string | null;
    qualificationsCount: number;
    subjectsCount: number;
    tagline: string | null;
  }): number {
    let score = 0;
    if (snapshot.photoUrl) score += 15;
    if (snapshot.bio && snapshot.bio.length > 200) score += 20;
    if (snapshot.tagline) score += 5;
    if (snapshot.about && snapshot.about.length > 500) score += 20;
    if (snapshot.methodology) score += 10;
    if (snapshot.qualificationsCount > 0) score += 10;
    if (snapshot.boardsCount > 0) score += 10;
    if (snapshot.subjectsCount > 0) score += 10;
    return Math.min(score, 100);
  }

  private async assertPublishable(
    id: string | null,
    data: any,
    relationInput?: {
      boardIds?: string[];
      subjectIds?: string[];
      qualifications?: Array<unknown>;
    },
  ) {
    let qualificationsCount = 0;
    let boardsCount = 0;
    let subjectsCount = 0;
    let currentValues: {
      photoUrl: string | null;
      bio: string | null;
      tagline: string | null;
      about: string | null;
      methodology: string | null;
    } = {
      photoUrl: null,
      bio: null,
      tagline: null,
      about: null,
      methodology: null,
    };

    if (id) {
      const tutor = await (this.prisma as any).tutor.findUnique({
        where: { id },
        include: {
          qualifications: true,
          boards: true,
          subjects: true,
        },
      });

      if (!tutor) {
        throw new NotFoundException('Tutor not found');
      }

      qualificationsCount = tutor.qualifications.length;
      boardsCount = relationInput?.boardIds?.length ?? tutor.boards.length;
      subjectsCount =
        relationInput?.subjectIds?.length ?? tutor.subjects.length;
      currentValues = {
        photoUrl: tutor.photoUrl,
        bio: tutor.bio,
        tagline: tutor.tagline,
        about: tutor.about,
        methodology: tutor.methodology,
      };
    }

    const score = this.calculateCompletenessScore({
      photoUrl:
        'photoUrl' in data
          ? ((data.photoUrl as string | null | undefined) ?? null)
          : currentValues.photoUrl,
      bio:
        'bio' in data
          ? ((data.bio as string | null | undefined) ?? null)
          : currentValues.bio,
      tagline:
        'tagline' in data
          ? ((data.tagline as string | null | undefined) ?? null)
          : currentValues.tagline,
      about:
        'about' in data
          ? ((data.about as string | null | undefined) ?? null)
          : currentValues.about,
      methodology:
        'methodology' in data
          ? ((data.methodology as string | null | undefined) ?? null)
          : currentValues.methodology,
      qualificationsCount:
        relationInput?.qualifications?.length ?? qualificationsCount,
      boardsCount: relationInput?.boardIds?.length ?? boardsCount,
      subjectsCount: relationInput?.subjectIds?.length ?? subjectsCount,
    });

    if (score < 80) {
      throw new BadRequestException(
        `Profile completeness too low (${score}%). Need 80% to publish.`,
      );
    }
  }

  private rethrowKnownErrors(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(
        'A tutor with the same slug or email already exists.',
      );
    }

    throw error;
  }

  async findAllPublic(filters: TutorPublicFilters) {
    const { board, subject, location, school } = filters;

    return (this.prisma as any).tutor.findMany({
      where: {
        deletedAt: null,
        status: 'PUBLISHED',
        isVerified: true,
        ...(board && { boards: { some: { board: { slug: board } } } }),
        ...(subject && { subjects: { some: { subject: { slug: subject } } } }),
        ...(location && {
          locations: {
            some: {
              OR: [
                { sector: { slug: location } },
                { society: { slug: location } },
              ],
            },
          },
        }),
        ...(school && { schools: { some: { school: { slug: school } } } }),
      },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
        classes: { include: { classLevel: true } },
        locations: { include: { sector: true, society: true } },
      },
      orderBy: { priority: 'desc' },
    });
  }

  findAllAdmin() {
    return (this.prisma as any).tutor.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
        classes: { include: { classLevel: true } },
        schools: { include: { school: true } },
        locations: { include: { sector: true, society: true } },
      },
      orderBy: [{ priority: 'desc' }, { updatedAt: 'desc' }],
    });
  }

  async findOneBySlug(slug: string) {
    const tutor = await (this.prisma as any).tutor.findFirst({
      where: {
        slug,
        deletedAt: null,
        isVerified: true,
        status: 'PUBLISHED',
      },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
        classes: { include: { classLevel: true } },
        schools: { include: { school: true } },
        locations: { include: { sector: true, society: true } },
        reviews: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
        },
        faqs: { orderBy: { order: 'asc' } },
        qualifications: true,
        achievements: true,
        claimProofs: true,
      },
    });

    if (!tutor) throw new NotFoundException('Tutor not found');
    return tutor;
  }

  async findOneAdmin(id: string) {
    const tutor = await (this.prisma as any).tutor.findFirst({
      where: { id, deletedAt: null },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
        classes: { include: { classLevel: true } },
        schools: { include: { school: true } },
        locations: { include: { sector: true, society: true } },
        reviews: true,
        faqs: true,
        qualifications: true,
        achievements: true,
        claimProofs: true,
      },
    });

    if (!tutor) {
      throw new NotFoundException('Tutor not found');
    }

    return tutor;
  }

  async calculateCompleteness(id: string): Promise<number> {
    const tutor = await (this.prisma as any).tutor.findUnique({
      where: { id },
      include: {
        qualifications: true,
        achievements: true,
        boards: true,
        subjects: true,
        classes: true,
        faqs: true,
      },
    });

    if (!tutor) return 0;

    return this.calculateCompletenessScore({
      photoUrl: tutor.photoUrl,
      bio: tutor.bio,
      tagline: tutor.tagline,
      about: tutor.about,
      methodology: tutor.methodology,
      qualificationsCount: tutor.qualifications.length,
      boardsCount: tutor.boards.length,
      subjectsCount: tutor.subjects.length,
    });
  }

  async updateStatus(id: string, status: string) {
    if (status === 'PUBLISHED') {
      const score = await this.calculateCompleteness(id);
      if (score < 80) {
        throw new BadRequestException(
          `Profile completeness too low (${score}%). Need 80% to publish.`,
        );
      }
    }

    return this.prisma.tutor.update({
      where: { id },
      data: { status: status as TutorStatus },
    });
  }

  async findRelated(id: string) {
    const tutor = await this.prisma.tutor.findUnique({
      where: { id },
      include: { boards: true, subjects: true },
    });

    if (!tutor) return [];

    // Find tutors with same subjects/boards
    return this.prisma.tutor.findMany({
      where: {
        id: { not: id },
        deletedAt: null,
        status: 'PUBLISHED',
        OR: [
          {
            subjects: {
              some: {
                subjectId: { in: tutor.subjects.map((s) => s.subjectId) },
              },
            },
          },
          {
            boards: {
              some: { boardId: { in: tutor.boards.map((b) => b.boardId) } },
            },
          },
        ],
      },
      take: 4,
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
      },
    });
  }

  async create(dto: CreateTutorDto) {
    const data = this.buildTutorCreateData(dto);

    if (data.status === TutorStatus.PUBLISHED) {
      await this.assertPublishable(null, data, dto);
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const tutor = await tx.tutor.create({ data });
        await this.replaceRelations(tx as any, tutor.id, dto);
        await this.replaceProfileDetails(tx as any, tutor.id, dto);
        return (tx as any).tutor.findUnique({
          where: { id: tutor.id },
          include: this.adminInclude(),
        });
      });
    } catch (error) {
      this.rethrowKnownErrors(error);
    }
  }

  async update(id: string, dto: UpdateTutorDto) {
    const existingTutor = await this.prisma.tutor.findFirst({
      where: { id, deletedAt: null },
      select: { id: true },
    });

    if (!existingTutor) {
      throw new NotFoundException('Tutor not found');
    }

    const data = this.buildTutorUpdateData(dto);
    if ((data.status as TutorStatus | undefined) === TutorStatus.PUBLISHED) {
      await this.assertPublishable(id, data, dto);
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.tutor.update({
          where: { id },
          data,
        });
        await this.replaceRelations(tx as any, id, dto);
        await this.replaceProfileDetails(tx as any, id, dto);
        return (tx as any).tutor.findUnique({
          where: { id },
          include: this.adminInclude(),
        });
      });
    } catch (error) {
      this.rethrowKnownErrors(error);
    }
  }

  async remove(id: string) {
    await this.findOneAdmin(id);
    return this.prisma.tutor.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: TutorStatus.ARCHIVED,
      },
    });
  }

  private adminInclude() {
    return {
      boards: { include: { board: true } },
      subjects: { include: { subject: true } },
      classes: { include: { classLevel: true } },
      schools: { include: { school: true } },
      locations: { include: { sector: true, society: true } },
      reviews: true,
      faqs: true,
      qualifications: true,
      achievements: true,
      claimProofs: true,
    };
  }

  private async replaceRelations(
    tx: any,
    tutorId: string,
    dto: CreateTutorDto | UpdateTutorDto,
  ) {
    await this.replaceComposite(
      tx.tutorBoard,
      'tutorId',
      'boardId',
      tutorId,
      dto.boardIds,
    );
    await this.replaceComposite(
      tx.tutorSubject,
      'tutorId',
      'subjectId',
      tutorId,
      dto.subjectIds,
    );
    await this.replaceComposite(
      tx.tutorClass,
      'tutorId',
      'classLevelId',
      tutorId,
      dto.classLevelIds,
    );
    await this.replaceComposite(
      tx.tutorSchool,
      'tutorId',
      'schoolId',
      tutorId,
      dto.schoolIds,
    );
    await this.replaceLocationCoverage(
      tx,
      tutorId,
      dto.sectorIds,
      dto.societyIds,
    );
  }

  private async replaceComposite(
    delegate: any,
    parentField: string,
    childField: string,
    parentId: string,
    ids?: string[],
  ) {
    if (!delegate || ids === undefined) return;
    await delegate.deleteMany({ where: { [parentField]: parentId } });
    const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
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
    if (sectorIds === undefined && societyIds === undefined) return;

    await tx.tutorLocationCoverage.deleteMany({ where: { tutorId } });
    const sectorRows = (sectorIds ?? []).filter(Boolean).map((sectorId) => ({
      tutorId,
      sectorId,
    }));
    const societyRows = (societyIds ?? []).filter(Boolean).map((societyId) => ({
      tutorId,
      societyId,
    }));
    const data = [...sectorRows, ...societyRows];

    if (data.length > 0) {
      await tx.tutorLocationCoverage.createMany({ data });
    }
  }

  private async replaceProfileDetails(
    tx: any,
    tutorId: string,
    dto: CreateTutorDto | UpdateTutorDto,
  ) {
    if (dto.qualifications !== undefined) {
      await tx.tutorQualification.deleteMany({ where: { tutorId } });
      const qualifications = dto.qualifications
        .map((item) => ({
          degree: this.normalizeOptionalString(item.degree) ?? '',
          institution: this.normalizeOptionalString(item.institution) ?? '',
          year: this.toOptionalInteger(item.year),
        }))
        .filter((item) => item.degree && item.institution);

      if (qualifications.length > 0) {
        await tx.tutorQualification.createMany({
          data: qualifications.map((item) => ({ ...item, tutorId })),
        });
      }
    }

    if (dto.achievements !== undefined) {
      await tx.tutorAchievement.deleteMany({ where: { tutorId } });
      const achievements = dto.achievements
        .map((item) => ({
          title: this.normalizeOptionalString(item.title) ?? '',
          description: this.normalizeOptionalString(item.description),
          year: this.toOptionalInteger(item.year),
        }))
        .filter((item) => item.title);

      if (achievements.length > 0) {
        await tx.tutorAchievement.createMany({
          data: achievements.map((item) => ({ ...item, tutorId })),
        });
      }
    }

    if (dto.faqs !== undefined) {
      await tx.tutorFaq.deleteMany({ where: { tutorId } });
      const faqs = dto.faqs
        .map((item, index) => ({
          question: this.normalizeOptionalString(item.question) ?? '',
          answer: this.normalizeOptionalString(item.answer) ?? '',
          order: this.toOptionalInteger(item.order) ?? index,
        }))
        .filter((item) => item.question && item.answer);

      if (faqs.length > 0) {
        await tx.tutorFaq.createMany({
          data: faqs.map((item) => ({ ...item, tutorId })),
        });
      }
    }
  }

  private toOptionalInteger(value: unknown): number | null {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    const numericValue = Number(value);
    return Number.isInteger(numericValue) ? numericValue : null;
  }
}
