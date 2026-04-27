import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LeadStatus, PageStatus, Prisma, ReviewStatus } from '@boardpefocus/database';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/database/prisma.service';
import { ADMIN_USER_ROLES, CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

const GENERATOR_THRESHOLDS = {
  minTutorsForGeo: 5,
  minProfileCompleteness: 80,
  maxDuplicationScore: 30,
};
const GENERATOR_THRESHOLDS_JOB_TYPE = 'GENERATOR_THRESHOLDS';

const PAGE_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;
const REVIEW_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const;
const ROLE_DESCRIPTIONS: Record<string, string> = {
  SUPERADMIN: 'Full system access',
  ADMIN: 'Administrative access',
  EDITOR: 'Content editing access',
  MODERATOR: 'Review and moderation access',
};

type ContentEntity =
  | 'boards'
  | 'classes'
  | 'subjects'
  | 'schools'
  | 'sectors'
  | 'societies'
  | 'faqs'
  | 'resources'
  | 'process-content'
  | 'results';

type SeoTargetEntity = ContentEntity | 'pages';

type RawPayload = Record<string, unknown>;

interface EntityConfig {
  delegate: string;
  displayName: string;
  softDeleteWith?: 'pageStatus' | 'reviewStatus' | 'deletedAt';
}

const ENTITY_CONFIG: Record<ContentEntity, EntityConfig> = {
  boards: { delegate: 'board', displayName: 'Board', softDeleteWith: 'pageStatus' },
  classes: { delegate: 'classLevel', displayName: 'Class', softDeleteWith: 'pageStatus' },
  subjects: { delegate: 'subject', displayName: 'Subject', softDeleteWith: 'pageStatus' },
  schools: { delegate: 'school', displayName: 'School', softDeleteWith: 'pageStatus' },
  sectors: { delegate: 'sector', displayName: 'Sector', softDeleteWith: 'pageStatus' },
  societies: { delegate: 'society', displayName: 'Society', softDeleteWith: 'pageStatus' },
  faqs: { delegate: 'faq', displayName: 'FAQ', softDeleteWith: 'deletedAt' },
  resources: {
    delegate: 'resourceArticle',
    displayName: 'Resource article',
    softDeleteWith: 'deletedAt',
  },
  'process-content': {
    delegate: 'processContent',
    displayName: 'Process content',
    softDeleteWith: 'deletedAt',
  },
  results: {
    delegate: 'resultStory',
    displayName: 'Result story',
    softDeleteWith: 'reviewStatus',
  },
};

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  private get db(): any {
    return this.prisma as any;
  }

  getStatsOverview() {
    return Promise.all([
      this.prisma.tutor.count({ where: { deletedAt: null } }),
      this.prisma.lead.count(),
      this.prisma.pageRecord.count({
        where: { status: 'PUBLISHED', deletedAt: null },
      }),
      this.prisma.tutor.count({
        where: { status: 'PENDING_REVIEW', deletedAt: null },
      }),
      this.db.faq?.count?.({ where: { deletedAt: null } }) ?? 0,
      this.db.resourceArticle?.count?.({ where: { deletedAt: null } }) ?? 0,
    ]).then(
      ([
        totalTutors,
        totalLeads,
        activePages,
        pendingReviews,
        totalFaqs,
        totalResources,
      ]) => ({
        totalTutors,
        totalLeads,
        activePages,
        pendingReviews,
        totalFaqs,
        totalResources,
      }),
    );
  }

  listLeads() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  updateLeadStatus(id: string, status: LeadStatus) {
    return this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }

  async listUsers() {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
      orderBy: [{ isActive: 'desc' }, { updatedAt: 'desc' }],
    });

    return users.map((user) => this.formatAdminUser(user));
  }

  async createUser(dto: CreateAdminUserDto) {
    const email = this.normalizeEmail(dto.email);
    const name = this.requiredString(dto.name, 'Name');
    const role = this.normalizeAdminRole(dto.role);
    const passwordHash = await bcrypt.hash(
      this.requiredString(dto.password, 'Password'),
      10,
    );

    const existing = await this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (existing && !existing.deletedAt) {
      throw new ConflictException('A user with this email already exists.');
    }

    const user = await this.prisma.$transaction(async (tx) => {
      const roleRecord = await this.ensureRole(tx as any, role);

      if (existing) {
        await tx.userRole.deleteMany({ where: { userId: existing.id } });
        return tx.user.update({
          where: { id: existing.id },
          data: {
            email,
            name,
            passwordHash,
            isActive: dto.isActive ?? true,
            deletedAt: null,
            roles: {
              create: {
                roleId: roleRecord.id,
              },
            },
          },
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        });
      }

      return tx.user.create({
        data: {
          email,
          name,
          passwordHash,
          isActive: dto.isActive ?? true,
          roles: {
            create: {
              roleId: roleRecord.id,
            },
          },
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
    });

    return this.formatAdminUser(user);
  }

  async updateUser(id: string, dto: UpdateAdminUserDto, currentUserId: string) {
    const existing = await this.findActiveUserForAdmin(id);
    const data: any = {};

    if (dto.name !== undefined) {
      data.name = this.requiredString(dto.name, 'Name');
    }

    if (dto.email !== undefined) {
      const email = this.normalizeEmail(dto.email);
      const emailOwner = await this.prisma.user.findUnique({
        where: { email },
      });

      if (emailOwner && emailOwner.id !== id) {
        throw new ConflictException('A user with this email already exists.');
      }

      data.email = email;
    }

    if (dto.password !== undefined) {
      data.passwordHash = await bcrypt.hash(
        this.requiredString(dto.password, 'Password'),
        10,
      );
    }

    if (dto.isActive !== undefined) {
      if (id === currentUserId && dto.isActive === false) {
        throw new BadRequestException('You cannot deactivate your own account.');
      }

      data.isActive = dto.isActive;
    }

    const nextRole =
      dto.role !== undefined ? this.normalizeAdminRole(dto.role) : undefined;
    const currentRoles = this.getUserRoleNames(existing);
    const removesSuperAdmin =
      currentRoles.includes('SUPERADMIN') &&
      (nextRole !== undefined && nextRole !== 'SUPERADMIN');
    const deactivatesSuperAdmin =
      currentRoles.includes('SUPERADMIN') && dto.isActive === false;

    if (id === currentUserId && removesSuperAdmin) {
      throw new BadRequestException(
        'You cannot remove your own superadmin access.',
      );
    }

    if (removesSuperAdmin || deactivatesSuperAdmin) {
      await this.assertAnotherActiveSuperAdmin(id);
    }

    const user = await this.prisma.$transaction(async (tx) => {
      if (nextRole) {
        const roleRecord = await this.ensureRole(tx as any, nextRole);
        await tx.userRole.deleteMany({ where: { userId: id } });
        await tx.userRole.create({
          data: {
            userId: id,
            roleId: roleRecord.id,
          },
        });
      }

      return tx.user.update({
        where: { id },
        data,
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
    });

    return this.formatAdminUser(user);
  }

  async deleteUser(id: string, currentUserId: string) {
    if (id === currentUserId) {
      throw new BadRequestException('You cannot delete your own account.');
    }

    const user = await this.findActiveUserForAdmin(id);
    if (this.getUserRoleNames(user).includes('SUPERADMIN')) {
      await this.assertAnotherActiveSuperAdmin(id);
    }

    const deletedUser = await this.prisma.user.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return this.formatAdminUser(deletedUser);
  }

  listBoards() {
    return this.listContent('boards');
  }

  listSchools() {
    return this.listContent('schools');
  }

  listPages() {
    return this.prisma.pageRecord.findMany({
      where: { deletedAt: null },
      include: {
        seo: true,
        blocks: { orderBy: { order: 'asc' } },
        entityRelations: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async createPage(payload: RawPayload) {
    const title = this.requiredString(payload.title, 'Title');
    const slug = this.requiredSlug(payload.slug ?? title);
    const status =
      payload.status !== undefined
        ? this.normalizePageStatus(payload.status)
        : 'DRAFT';
    const pageData = this.pickPageRecordPayload(payload, 'create');
    const seo = this.pickPageSeoPayload(payload);
    const blocks = this.parseContentBlocks(payload.blocks);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const page = await tx.pageRecord.create({
          data: {
            ...pageData,
            title,
            slug,
            status,
          },
        });

        await this.replacePageSeo(tx as any, page.id, seo);
        await this.replacePageBlocks(tx as any, page.id, blocks);

        return tx.pageRecord.findUnique({
          where: { id: page.id },
          include: {
            seo: true,
            blocks: { orderBy: { order: 'asc' } },
            entityRelations: true,
          },
        });
      });
    } catch (error) {
      this.rethrowKnownWriteError(error, 'Page');
    }
  }

  async getPage(id: string) {
    const page = await this.prisma.pageRecord.findFirst({
      where: { id, deletedAt: null },
      include: {
        seo: true,
        blocks: { orderBy: { order: 'asc' } },
        entityRelations: true,
        internalLinks: { include: { rule: true } },
      },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async updatePage(id: string, payload: RawPayload) {
    await this.getPage(id);
    const pageData = this.pickPageRecordPayload(payload, 'update');
    const seo = this.pickPageSeoPayload(payload);
    const blocks =
      payload.blocks !== undefined
        ? this.parseContentBlocks(payload.blocks)
        : undefined;

    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.pageRecord.update({
          where: { id },
          data: pageData,
        });

        await this.replacePageSeo(tx as any, id, seo);
        if (blocks !== undefined) {
          await this.replacePageBlocks(tx as any, id, blocks);
        }

        return tx.pageRecord.findUnique({
          where: { id },
          include: {
            seo: true,
            blocks: { orderBy: { order: 'asc' } },
            entityRelations: true,
          },
        });
      });
    } catch (error) {
      this.rethrowKnownWriteError(error, 'Page');
    }
  }

  async archivePage(id: string) {
    await this.getPage(id);
    return this.prisma.pageRecord.update({
      where: { id },
      data: { status: 'ARCHIVED', deletedAt: new Date() },
    });
  }

  async listSeoMetadata() {
    const [
      pages,
      boards,
      classes,
      subjects,
      schools,
      sectors,
      societies,
      resources,
      processContent,
    ] = await Promise.all([
      this.prisma.pageRecord.findMany({
        where: { deletedAt: null },
        include: { seo: true },
        orderBy: { updatedAt: 'desc' },
      }),
      this.db.board.findMany({ orderBy: { updatedAt: 'desc' } }),
      this.db.classLevel.findMany({ orderBy: { updatedAt: 'desc' } }),
      this.db.subject.findMany({ orderBy: { updatedAt: 'desc' } }),
      this.db.school.findMany({ orderBy: { updatedAt: 'desc' } }),
      this.db.sector.findMany({ orderBy: { updatedAt: 'desc' } }),
      this.db.society.findMany({ orderBy: { updatedAt: 'desc' } }),
      this.db.resourceArticle?.findMany?.({
        where: { deletedAt: null },
        orderBy: { updatedAt: 'desc' },
      }) ?? [],
      this.db.processContent?.findMany?.({
        where: { deletedAt: null },
        orderBy: { updatedAt: 'desc' },
      }) ?? [],
    ]);

    return [
      ...pages.map((page) => this.formatSeoTarget('pages', page)),
      ...boards.map((item) => this.formatSeoTarget('boards', item)),
      ...classes.map((item) => this.formatSeoTarget('classes', item)),
      ...subjects.map((item) => this.formatSeoTarget('subjects', item)),
      ...schools.map((item) => this.formatSeoTarget('schools', item)),
      ...sectors.map((item) => this.formatSeoTarget('sectors', item)),
      ...societies.map((item) => this.formatSeoTarget('societies', item)),
      ...resources.map((item) => this.formatSeoTarget('resources', item)),
      ...processContent.map((item) =>
        this.formatSeoTarget('process-content', item),
      ),
    ];
  }

  updateSeoMetadata(targetType: string, id: string, payload: RawPayload) {
    const entity = this.normalizeSeoTarget(targetType);
    if (entity === 'pages') {
      return this.updatePage(id, payload);
    }

    return this.updateContent(entity, id, payload);
  }

  listRedirects() {
    return this.prisma.redirect.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createRedirect(payload: RawPayload) {
    const data = this.pickRedirect(payload, 'create');
    try {
      return await this.prisma.redirect.create({ data: data as any });
    } catch (error) {
      this.rethrowKnownWriteError(error, 'Redirect');
    }
  }

  async updateRedirect(id: string, payload: RawPayload) {
    await this.getRedirect(id);
    const data = this.pickRedirect(payload, 'update');
    try {
      return await this.prisma.redirect.update({ where: { id }, data });
    } catch (error) {
      this.rethrowKnownWriteError(error, 'Redirect');
    }
  }

  async archiveRedirect(id: string) {
    await this.getRedirect(id);
    return this.prisma.redirect.update({
      where: { id },
      data: { isActive: false },
    });
  }

  listMedia(query?: string) {
    const normalized = query?.trim();
    return this.prisma.mediaAsset.findMany({
      where: normalized
        ? {
            OR: [
              { filename: { contains: normalized, mode: 'insensitive' } },
              { originalName: { contains: normalized, mode: 'insensitive' } },
              { altText: { contains: normalized, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  createMedia(payload: RawPayload) {
    const data = this.pickMedia(payload, 'create');
    return this.prisma.mediaAsset.create({ data: data as any });
  }

  async updateMedia(id: string, payload: RawPayload) {
    await this.getMedia(id);
    const data = this.pickMedia(payload, 'update');
    return this.prisma.mediaAsset.update({ where: { id }, data });
  }

  async deleteMedia(id: string) {
    await this.getMedia(id);
    return this.prisma.mediaAsset.delete({ where: { id } });
  }

  async listLookups() {
    const [
      boards,
      classes,
      subjects,
      schools,
      sectors,
      societies,
      tutors,
      resources,
      results,
      processContent,
      pages,
    ] = await Promise.all([
      this.db.board.findMany({ orderBy: { name: 'asc' } }),
      this.db.classLevel?.findMany?.({ orderBy: [{ level: 'asc' }, { name: 'asc' }] }) ?? [],
      this.db.subject.findMany({ orderBy: { name: 'asc' } }),
      this.db.school.findMany({ orderBy: { name: 'asc' } }),
      this.db.sector.findMany({ orderBy: { name: 'asc' } }),
      this.db.society.findMany({ orderBy: { name: 'asc' } }),
      this.db.tutor.findMany({
        where: { deletedAt: null },
        orderBy: { name: 'asc' },
        select: { id: true, name: true, slug: true },
      }),
      this.db.resourceArticle?.findMany?.({
        where: { deletedAt: null },
        orderBy: { title: 'asc' },
        select: { id: true, title: true, slug: true },
      }) ?? [],
      this.db.resultStory?.findMany?.({
        where: { deletedAt: null },
        orderBy: { title: 'asc' },
        select: { id: true, title: true, slug: true },
      }) ?? [],
      this.db.processContent?.findMany?.({
        where: { deletedAt: null },
        orderBy: { title: 'asc' },
        select: { id: true, title: true, slug: true },
      }) ?? [],
      this.db.pageRecord.findMany({
        where: { deletedAt: null },
        orderBy: { title: 'asc' },
        select: { id: true, title: true, slug: true },
      }),
    ]);

    return {
      boards,
      classes,
      subjects,
      schools,
      sectors,
      societies,
      tutors,
      resources,
      results,
      processContent,
      pages,
    };
  }

  async listContent(entity: ContentEntity) {
    const config = this.getEntityConfig(entity);
    const delegate = this.getDelegate(config);

    const findArgs = {
      where: this.listWhere(entity),
      include: this.includeFor(entity),
      orderBy: this.orderByFor(entity),
    };

    return delegate.findMany(findArgs);
  }

  async getContent(entity: ContentEntity, id: string) {
    const config = this.getEntityConfig(entity);
    const item = await this.getDelegate(config).findFirst({
      where: {
        id,
        ...(this.supportsDeletedAt(entity) ? { deletedAt: null } : {}),
      },
      include: this.includeFor(entity),
    });

    if (!item) {
      throw new NotFoundException(`${config.displayName} not found`);
    }

    return item;
  }

  async createContent(entity: ContentEntity, payload: RawPayload) {
    const config = this.getEntityConfig(entity);
    const data = this.sanitizePayload(entity, payload, 'create');
    const relations = this.extractRelations(payload);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const delegate = (tx as any)[config.delegate];
        const item = await delegate.create({ data });
        await this.replaceRelations(tx as any, entity, item.id, relations);
        return delegate.findUnique({
          where: { id: item.id },
          include: this.includeFor(entity),
        });
      });
    } catch (error) {
      this.rethrowKnownWriteError(error, config.displayName);
    }
  }

  async updateContent(entity: ContentEntity, id: string, payload: RawPayload) {
    const config = this.getEntityConfig(entity);
    await this.getContent(entity, id);

    const data = this.sanitizePayload(entity, payload, 'update');
    const relations = this.extractRelations(payload);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const delegate = (tx as any)[config.delegate];
        await delegate.update({ where: { id }, data });
        await this.replaceRelations(tx as any, entity, id, relations);
        return delegate.findUnique({
          where: { id },
          include: this.includeFor(entity),
        });
      });
    } catch (error) {
      this.rethrowKnownWriteError(error, config.displayName);
    }
  }

  async archiveContent(entity: ContentEntity, id: string) {
    const config = this.getEntityConfig(entity);
    await this.getContent(entity, id);

    if (config.softDeleteWith === 'deletedAt') {
      return this.getDelegate(config).update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }

    if (config.softDeleteWith === 'reviewStatus') {
      return this.getDelegate(config).update({
        where: { id },
        data: { status: 'REJECTED', visibility: false, deletedAt: new Date() },
      });
    }

    return this.getDelegate(config).update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
  }

  listGenerationJobs() {
    return this.prisma.generationJob.findMany({
      where: { type: { not: GENERATOR_THRESHOLDS_JOB_TYPE } },
      include: {
        issues: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async triggerGeneration(type: string) {
    const generationType = this.requiredString(type, 'Generation type').toUpperCase();
    const job = await this.prisma.generationJob.create({
      data: {
        type: generationType,
        status: 'RUNNING',
        progress: 0,
        startedAt: new Date(),
        config: {
          requestedAt: new Date().toISOString(),
          source: 'admin',
        } satisfies Prisma.InputJsonValue,
      },
    });

    try {
      const candidates = await this.buildGenerationCandidates(generationType);
      const results: Array<Record<string, unknown>> = [];

      if (candidates.length === 0) {
        await this.prisma.generationIssue.create({
          data: {
            jobId: job.id,
            level: 'WARN',
            message: `No eligible ${generationType.toLowerCase()} records were found.`,
          },
        });
      }

      for (const [index, candidate] of candidates.entries()) {
        const page = await this.upsertGeneratedPage(candidate);
        results.push({
          slug: page.slug,
          title: page.title,
          source: candidate.source,
        });

        if (candidates.length > 0) {
          await this.prisma.generationJob.update({
            where: { id: job.id },
            data: {
              progress: Math.round(((index + 1) / candidates.length) * 100),
            },
          });
        }
      }

      return this.prisma.generationJob.update({
        where: { id: job.id },
        data: {
          status: 'COMPLETED',
          progress: 100,
          completedAt: new Date(),
          results: results as Prisma.InputJsonValue,
        },
      });
    } catch (error) {
      await this.prisma.generationIssue.create({
        data: {
          jobId: job.id,
          level: 'ERROR',
          message:
            error instanceof Error
              ? error.message
              : 'Page generation failed unexpectedly.',
        },
      });

      await this.prisma.generationJob.update({
        where: { id: job.id },
        data: {
          status: 'FAILED',
          progress: 100,
          completedAt: new Date(),
        },
      });

      throw error;
    }
  }

  async getGenerationThresholds() {
    const saved = await this.prisma.generationJob.findFirst({
      where: { type: GENERATOR_THRESHOLDS_JOB_TYPE },
      orderBy: { createdAt: 'desc' },
    });

    return {
      ...GENERATOR_THRESHOLDS,
      ...(this.isObject(saved?.config) ? saved?.config : {}),
    };
  }

  async updateGenerationThresholds(data: Record<string, unknown>) {
    const thresholds = {
      minTutorsForGeo: this.toInteger(
        data.minTutorsForGeo ?? GENERATOR_THRESHOLDS.minTutorsForGeo,
        'Minimum tutors for geo',
      ),
      minProfileCompleteness: this.toInteger(
        data.minProfileCompleteness ??
          GENERATOR_THRESHOLDS.minProfileCompleteness,
        'Minimum profile completeness',
      ),
      maxDuplicationScore: this.toInteger(
        data.maxDuplicationScore ?? GENERATOR_THRESHOLDS.maxDuplicationScore,
        'Maximum duplication score',
      ),
    };

    await this.prisma.generationJob.create({
      data: {
        type: GENERATOR_THRESHOLDS_JOB_TYPE,
        status: 'COMPLETED',
        progress: 100,
        config: thresholds,
        results: { savedAt: new Date().toISOString() },
        completedAt: new Date(),
      },
    });

    return {
      status: 'saved',
      data: thresholds,
    };
  }

  private pickPageRecordPayload(
    payload: RawPayload,
    mode: 'create' | 'update',
  ): RawPayload {
    const data: RawPayload = {};

    if (mode === 'update') {
      if (payload.title !== undefined) {
        data.title = this.requiredString(payload.title, 'Title');
      }

      if (payload.slug !== undefined) {
        data.slug = this.requiredSlug(payload.slug);
      }

      if (payload.status !== undefined) {
        data.status = this.normalizePageStatus(payload.status);
      }
    }

    for (const field of [
      'templateId',
      'boardId',
      'classLevelId',
      'subjectId',
      'schoolId',
      'sectorId',
      'societyId',
    ]) {
      if (payload[field] !== undefined) {
        data[field] = this.optionalString(payload[field]);
      }
    }

    return data;
  }

  private pickPageSeoPayload(payload: RawPayload) {
    const data: RawPayload = {};
    if (payload.seoTitle !== undefined) {
      data.title = this.optionalString(payload.seoTitle);
    }
    if (payload.metaDescription !== undefined) {
      data.description = this.optionalString(payload.metaDescription);
    }
    if (payload.keywords !== undefined) {
      data.keywords = this.optionalString(payload.keywords);
    }
    if (payload.ogImage !== undefined) {
      data.ogImage = this.optionalString(payload.ogImage);
    }
    if (payload.canonical !== undefined) {
      data.canonical = this.optionalString(payload.canonical);
    }
    if (payload.noIndex !== undefined) {
      data.noIndex = this.toBoolean(payload.noIndex);
    }

    return Object.keys(data).length > 0 ? data : undefined;
  }

  private parseContentBlocks(value: unknown) {
    if (value === undefined || value === null || value === '') return [];

    const parsed =
      typeof value === 'string'
        ? this.parseJsonField(value, 'Content blocks')
        : value;

    if (!Array.isArray(parsed)) {
      throw new BadRequestException('Content blocks must be a JSON array.');
    }

    return parsed.map((block, index) => {
      if (!this.isObject(block)) {
        throw new BadRequestException('Every content block must be an object.');
      }

      return {
        type: this.optionalString(block.type) ?? 'TEXT_BLOCK',
        content: (block.content ?? block) as Prisma.InputJsonValue,
        order:
          block.order !== undefined
            ? this.toInteger(block.order, 'Block order')
            : index,
      };
    });
  }

  private async replacePageSeo(
    tx: any,
    pageRecordId: string,
    seo?: RawPayload,
  ) {
    if (!seo) return;

    await tx.seoMeta.upsert({
      where: { pageRecordId },
      update: seo,
      create: {
        pageRecordId,
        ...seo,
      },
    });
  }

  private async replacePageBlocks(
    tx: any,
    pageRecordId: string,
    blocks: Array<{ type: string; content: Prisma.InputJsonValue; order: number }>,
  ) {
    await tx.contentBlock.deleteMany({ where: { pageRecordId } });
    if (blocks.length === 0) return;

    await tx.contentBlock.createMany({
      data: blocks.map((block) => ({
        pageRecordId,
        type: block.type,
        content: block.content,
        order: block.order,
      })),
    });
  }

  private formatSeoTarget(targetType: SeoTargetEntity, item: any) {
    const pageSeo = item.seo;
    const title = item.title ?? item.name ?? item.question ?? item.slug;

    return {
      id: `${targetType}:${item.id}`,
      targetType,
      targetId: item.id,
      label: title,
      slug: item.slug ?? null,
      status: item.status ?? null,
      seoTitle: pageSeo?.title ?? item.seoTitle ?? '',
      metaDescription: pageSeo?.description ?? item.metaDescription ?? '',
      keywords: pageSeo?.keywords ?? '',
      canonical: pageSeo?.canonical ?? item.canonical ?? '',
      ogTitle: item.ogTitle ?? '',
      ogDescription: item.ogDescription ?? '',
      ogImage: pageSeo?.ogImage ?? item.ogImage ?? '',
      noIndex: pageSeo?.noIndex ?? false,
      updatedAt: item.updatedAt ?? item.createdAt,
    };
  }

  private normalizeSeoTarget(targetType: string): SeoTargetEntity {
    const normalized = targetType.trim().toLowerCase() as SeoTargetEntity;
    if (normalized === 'pages') return normalized;
    this.getEntityConfig(normalized);
    return normalized;
  }

  private async getRedirect(id: string) {
    const redirect = await this.prisma.redirect.findUnique({ where: { id } });
    if (!redirect) {
      throw new NotFoundException('Redirect not found');
    }

    return redirect;
  }

  private pickRedirect(
    payload: RawPayload,
    mode: 'create' | 'update',
  ): RawPayload {
    const data: RawPayload = {};

    if (mode === 'create' || payload.from !== undefined) {
      data.from = this.normalizeRedirectFrom(payload.from);
    }
    if (mode === 'create' || payload.to !== undefined) {
      data.to = this.normalizeRedirectTarget(payload.to, 'Destination URL');
    }
    if (payload.code !== undefined) {
      const code = this.toInteger(payload.code, 'Redirect code');
      if (![301, 302, 307, 308].includes(code)) {
        throw new BadRequestException('Redirect code must be 301, 302, 307, or 308.');
      }
      data.code = code;
    }
    if (payload.isActive !== undefined) {
      data.isActive = this.toBoolean(payload.isActive);
    }

    return data;
  }

  private normalizeRedirectFrom(value: unknown) {
    const from = this.requiredString(value, 'Source URL');
    const normalized = from.startsWith('/') ? from : `/${from}`;
    if (/^\/\//.test(normalized)) {
      throw new BadRequestException('Source URL must be a local path.');
    }

    return normalized;
  }

  private normalizeRedirectTarget(value: unknown, fieldName: string) {
    const target = this.requiredString(value, fieldName);
    if (/^https?:\/\//i.test(target)) return target;
    return target.startsWith('/') ? target : `/${target}`;
  }

  private async getMedia(id: string) {
    const media = await this.prisma.mediaAsset.findUnique({ where: { id } });
    if (!media) {
      throw new NotFoundException('Media asset not found');
    }

    return media;
  }

  private pickMedia(
    payload: RawPayload,
    mode: 'create' | 'update',
  ): RawPayload {
    const data: RawPayload = {};

    if (mode === 'create' || payload.url !== undefined) {
      data.url = this.requiredString(payload.url, 'Media URL');
    }

    const filenameSource =
      payload.filename ??
      payload.originalName ??
      (typeof data.url === 'string' ? data.url.split('/').pop() : undefined);

    if (mode === 'create' || payload.filename !== undefined) {
      data.filename = this.requiredString(filenameSource, 'Filename');
    }

    if (mode === 'create' || payload.originalName !== undefined) {
      data.originalName = this.requiredString(
        payload.originalName ?? data.filename,
        'Original filename',
      );
    }

    if (mode === 'create' || payload.mimeType !== undefined) {
      data.mimeType =
        this.optionalString(payload.mimeType) ??
        this.guessMimeType(String(data.filename ?? payload.filename ?? ''));
    }

    if (mode === 'create' || payload.size !== undefined) {
      data.size = this.toOptionalInteger(payload.size ?? 0, 'File size') ?? 0;
    }

    for (const field of ['provider', 'bucket', 'key', 'altText']) {
      if (payload[field] !== undefined) {
        data[field] = this.optionalString(payload[field]);
      }
    }

    if (payload.metadata !== undefined) {
      data.metadata =
        typeof payload.metadata === 'string'
          ? this.parseJsonField(payload.metadata, 'Metadata')
          : (payload.metadata as Prisma.InputJsonValue);
    }

    if (mode === 'create' && data.provider === undefined) {
      data.provider = 'EXTERNAL';
    }

    return data;
  }

  private guessMimeType(filename: string) {
    const extension = filename.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      pdf: 'application/pdf',
      mp4: 'video/mp4',
    };

    return mimeTypes[extension ?? ''] ?? 'application/octet-stream';
  }

  private async buildGenerationCandidates(type: string) {
    const candidates: Array<{
      slug: string;
      title: string;
      description: string;
      source: string;
      relations?: RawPayload;
    }> = [];

    if (['ALL', 'ACADEMIC'].includes(type)) {
      const [boards, classes, subjects] = await Promise.all([
        this.db.board.findMany({ where: { status: 'PUBLISHED' } }),
        this.db.classLevel.findMany({ where: { status: 'PUBLISHED' } }),
        this.db.subject.findMany({ where: { status: 'PUBLISHED' } }),
      ]);

      for (const board of boards) {
        candidates.push({
          slug: `boards/${board.slug}`,
          title: `${board.name} home tutors in Gurugram`,
          description:
            board.metaDescription ??
            board.description ??
            `Explore ${board.name} board tutoring support in Gurugram.`,
          source: 'BOARD',
          relations: { boardId: board.id },
        });
      }
      for (const classLevel of classes) {
        candidates.push({
          slug: `classes/${classLevel.slug}`,
          title: `${classLevel.name} home tutors in Gurugram`,
          description:
            classLevel.metaDescription ??
            classLevel.description ??
            `Explore ${classLevel.name} tutoring support in Gurugram.`,
          source: 'CLASS',
          relations: { classLevelId: classLevel.id },
        });
      }
      for (const subject of subjects) {
        candidates.push({
          slug: `subjects/${subject.slug}`,
          title: `${subject.name} home tutors in Gurugram`,
          description:
            subject.metaDescription ??
            subject.description ??
            `Explore ${subject.name} subject tutoring support in Gurugram.`,
          source: 'SUBJECT',
          relations: { subjectId: subject.id },
        });
      }
    }

    if (['ALL', 'GEO'].includes(type)) {
      const [schools, sectors, societies] = await Promise.all([
        this.db.school.findMany({ where: { status: 'PUBLISHED' } }),
        this.db.sector.findMany({ where: { status: 'PUBLISHED' } }),
        this.db.society.findMany({
          where: { status: 'PUBLISHED' },
          include: { sector: true },
        }),
      ]);

      for (const school of schools) {
        candidates.push({
          slug: `schools/${school.slug}`,
          title: `${school.name} home tutors`,
          description:
            school.metaDescription ??
            school.safeSupportWording ??
            school.description ??
            `Explore school-aware tutoring support for ${school.name}.`,
          source: 'SCHOOL',
          relations: { schoolId: school.id },
        });
      }
      for (const sector of sectors) {
        candidates.push({
          slug: `gurugram/sectors/${sector.slug}`,
          title: `Home tutors in ${sector.name}`,
          description:
            sector.metaDescription ??
            sector.description ??
            `Explore locality-aware home tutoring support in ${sector.name}.`,
          source: 'SECTOR',
          relations: { sectorId: sector.id },
        });
      }
      for (const society of societies) {
        candidates.push({
          slug: `gurugram/sectors/${society.sector?.slug ?? 'sector'}/${society.slug}`,
          title: `Home tutors in ${society.name}`,
          description:
            society.metaDescription ??
            society.description ??
            `Explore home tutoring support in ${society.name}.`,
          source: 'SOCIETY',
          relations: { societyId: society.id, sectorId: society.sectorId },
        });
      }
    }

    if (['ALL', 'TUTOR'].includes(type)) {
      const tutors = await this.prisma.tutor.findMany({
        where: { status: 'PUBLISHED', deletedAt: null },
      });

      for (const tutor of tutors) {
        candidates.push({
          slug: `tutors/${tutor.slug}`,
          title: `${tutor.displayName ?? tutor.name} | BoardPeFocus tutor`,
          description:
            tutor.metaDescription ??
            tutor.tagline ??
            `Explore ${tutor.displayName ?? tutor.name}'s tutoring profile.`,
          source: 'TUTOR',
          relations: {},
        });
      }
    }

    return candidates;
  }

  private async upsertGeneratedPage(candidate: {
    slug: string;
    title: string;
    description: string;
    source: string;
    relations?: RawPayload;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const page = await tx.pageRecord.upsert({
        where: { slug: candidate.slug },
        update: {
          title: candidate.title,
          status: 'PUBLISHED',
          deletedAt: null,
          ...(candidate.relations ?? {}),
        },
        create: {
          slug: candidate.slug,
          title: candidate.title,
          status: 'PUBLISHED',
          ...(candidate.relations ?? {}),
        },
      });

      await tx.contentBlock.deleteMany({ where: { pageRecordId: page.id } });
      await tx.contentBlock.createMany({
        data: [
          {
            pageRecordId: page.id,
            type: 'HERO',
            order: 0,
            content: {
              title: candidate.title,
              description: candidate.description,
              source: candidate.source,
            },
          },
          {
            pageRecordId: page.id,
            type: 'TEXT_BLOCK',
            order: 1,
            content: {
              body: candidate.description,
            },
          },
        ],
      });

      await tx.seoMeta.upsert({
        where: { pageRecordId: page.id },
        update: {
          title: candidate.title,
          description: candidate.description,
        },
        create: {
          pageRecordId: page.id,
          title: candidate.title,
          description: candidate.description,
        },
      });

      return page;
    });
  }

  private async findActiveUserForAdmin(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async ensureRole(tx: any, roleName: string) {
    return tx.role.upsert({
      where: { name: roleName },
      update: {
        description: ROLE_DESCRIPTIONS[roleName] ?? null,
      },
      create: {
        name: roleName,
        description: ROLE_DESCRIPTIONS[roleName] ?? null,
      },
    });
  }

  private formatAdminUser(user: {
    id: string;
    email: string;
    name: string;
    isActive: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
    roles: Array<{ role: { name: string } }>;
  }) {
    const roles = this.getUserRoleNames(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isActive: user.isActive,
      role: this.getPrimaryRole(roles),
      roles,
      lastLogin: user.lastLogin?.toISOString() ?? null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  private getUserRoleNames(user: { roles: Array<{ role: { name: string } }> }) {
    return Array.from(
      new Set(user.roles.map(({ role }) => role.name).filter(Boolean)),
    );
  }

  private getPrimaryRole(roles: string[]) {
    if (roles.includes('SUPERADMIN')) return 'SUPERADMIN';
    return roles[0] ?? 'UNASSIGNED';
  }

  private async assertAnotherActiveSuperAdmin(excludedUserId: string) {
    const remainingSuperAdmins = await this.prisma.user.count({
      where: {
        id: { not: excludedUserId },
        isActive: true,
        deletedAt: null,
        roles: {
          some: {
            role: {
              name: 'SUPERADMIN',
            },
          },
        },
      },
    });

    if (remainingSuperAdmins === 0) {
      throw new BadRequestException(
        'At least one active superadmin account is required.',
      );
    }
  }

  private normalizeAdminRole(value: unknown) {
    const role = this.requiredString(value, 'Role').toUpperCase();
    if (!ADMIN_USER_ROLES.includes(role as (typeof ADMIN_USER_ROLES)[number])) {
      throw new BadRequestException('Invalid system role.');
    }

    return role;
  }

  private normalizeEmail(value: unknown) {
    const email = this.requiredString(value, 'Email').toLowerCase();
    if (!email.includes('@')) {
      throw new BadRequestException('Email must be valid.');
    }

    return email;
  }

  private getEntityConfig(entity: string): EntityConfig {
    if (!(entity in ENTITY_CONFIG)) {
      throw new BadRequestException('Unsupported admin content entity.');
    }

    return ENTITY_CONFIG[entity as ContentEntity];
  }

  private getDelegate(config: EntityConfig) {
    const delegate = this.db[config.delegate];
    if (!delegate) {
      throw new BadRequestException(
        `${config.displayName} storage is not available. Run Prisma generate and migrations.`,
      );
    }

    return delegate;
  }

  private supportsDeletedAt(entity: ContentEntity) {
    return ['faqs', 'resources', 'process-content', 'results'].includes(entity);
  }

  private listWhere(entity: ContentEntity) {
    return this.supportsDeletedAt(entity) ? { deletedAt: null } : {};
  }

  private orderByFor(entity: ContentEntity) {
    if (entity === 'faqs') {
      return [{ order: 'asc' }, { updatedAt: 'desc' }];
    }

    if (entity === 'classes') {
      return [{ level: 'asc' }, { name: 'asc' }];
    }

    return { updatedAt: 'desc' };
  }

  private includeFor(entity: ContentEntity) {
    switch (entity) {
      case 'boards':
        return {
          subjects: { include: { subject: true } },
          classes: { include: { classLevel: true } },
          schools: { include: { school: true } },
          sectors: { include: { sector: true } },
          societies: { include: { society: true } },
        };
      case 'classes':
        return {
          boards: { include: { board: true } },
          subjects: { include: { subject: true } },
          tutors: { include: { tutor: { select: { id: true, name: true, slug: true } } } },
        };
      case 'subjects':
        return {
          boards: { include: { board: true } },
          classes: { include: { classLevel: true } },
          schools: { include: { school: true } },
          sectors: { include: { sector: true } },
          societies: { include: { society: true } },
          tutors: { include: { tutor: { select: { id: true, name: true, slug: true } } } },
        };
      case 'schools':
        return {
          boards: { include: { board: true } },
          subjects: { include: { subject: true } },
          sectors: { include: { sector: true } },
          societies: { include: { society: true } },
          tutors: { include: { tutor: { select: { id: true, name: true, slug: true } } } },
        };
      case 'sectors':
        return {
          schools: { include: { school: true } },
          boards: { include: { board: true } },
          subjects: { include: { subject: true } },
          societies: true,
          tutors: { include: { tutor: { select: { id: true, name: true, slug: true } } } },
        };
      case 'societies':
        return {
          sector: true,
          schools: { include: { school: true } },
          boards: { include: { board: true } },
          subjects: { include: { subject: true } },
          tutors: { include: { tutor: { select: { id: true, name: true, slug: true } } } },
        };
      case 'faqs':
        return { assignments: true };
      case 'resources':
        return { mappings: true };
      case 'results':
        return {
          board: true,
          classLevel: true,
          subject: true,
          school: true,
          sector: true,
          society: true,
          tutor: { select: { id: true, name: true, slug: true } },
        };
      default:
        return undefined;
    }
  }

  private sanitizePayload(
    entity: ContentEntity,
    payload: RawPayload,
    mode: 'create' | 'update',
  ): RawPayload {
    switch (entity) {
      case 'boards':
        return this.pickCommonPublishable(payload, mode, [
          'name',
          'shortName',
          'description',
          'shortDescription',
          'longDescription',
          'status',
        ]);
      case 'classes':
        return this.pickCommonPublishable(payload, mode, [
          'name',
          'level',
          'description',
          'status',
        ]);
      case 'subjects':
        return this.pickCommonPublishable(payload, mode, [
          'name',
          'description',
          'shortDescription',
          'longDescription',
          'status',
        ]);
      case 'schools':
        return this.pickCommonPublishable(payload, mode, [
          'name',
          'description',
          'address',
          'website',
          'locality',
          'curriculumMix',
          'safeSupportWording',
          'contentBlocks',
          'status',
        ]);
      case 'sectors':
        return this.pickCommonPublishable(payload, mode, [
          'name',
          'description',
          'city',
          'corridor',
          'contentBlocks',
          'status',
        ]);
      case 'societies':
        return this.pickCommonPublishable(payload, mode, [
          'name',
          'description',
          'sectorId',
          'contentBlocks',
          'status',
        ]);
      case 'faqs':
        return this.pickFaq(payload, mode);
      case 'resources':
        return this.pickResource(payload, mode);
      case 'process-content':
        return this.pickProcessContent(payload, mode);
      case 'results':
        return this.pickResult(payload, mode);
      default:
        throw new BadRequestException('Unsupported admin content entity.');
    }
  }

  private pickCommonPublishable(
    payload: RawPayload,
    mode: 'create' | 'update',
    fields: string[],
  ): RawPayload {
    const data: RawPayload = {};
    const name = this.optionalString(payload.name);
    const title = this.optionalString(payload.title);
    const slugSource = this.optionalString(payload.slug) ?? name ?? title;

    if (mode === 'create') {
      const requiredName = this.requiredString(name ?? title, 'Name');
      data.name = requiredName;
      data.slug = this.requiredSlug(slugSource ?? requiredName);
    } else {
      if (payload.name !== undefined) data.name = this.requiredString(payload.name, 'Name');
      if (payload.slug !== undefined) data.slug = this.requiredSlug(payload.slug);
    }

    for (const field of fields) {
      if (field === 'name' || payload[field] === undefined) continue;
      data[field] = this.normalizeField(field, payload[field]);
    }

    this.assignSeoFields(data, payload);
    return data;
  }

  private pickFaq(payload: RawPayload, mode: 'create' | 'update'): RawPayload {
    const data: RawPayload = {};
    if (mode === 'create' || payload.question !== undefined) {
      data.question = this.requiredString(payload.question, 'Question');
    }
    if (mode === 'create' || payload.answer !== undefined) {
      data.answer = this.requiredString(payload.answer, 'Answer');
    }
    if (payload.category !== undefined) data.category = this.optionalString(payload.category);
    if (payload.status !== undefined) data.status = this.normalizePageStatus(payload.status);
    if (payload.visibility !== undefined) data.visibility = this.toBoolean(payload.visibility);
    if (payload.order !== undefined) data.order = this.toInteger(payload.order, 'Order');
    return data;
  }

  private pickResource(payload: RawPayload, mode: 'create' | 'update'): RawPayload {
    const data: RawPayload = {};
    const title = this.optionalString(payload.title);
    const slugSource = this.optionalString(payload.slug) ?? title;

    if (mode === 'create') {
      data.title = this.requiredString(title, 'Title');
      data.slug = this.requiredSlug(slugSource ?? title);
    } else {
      if (payload.title !== undefined) data.title = this.requiredString(payload.title, 'Title');
      if (payload.slug !== undefined) data.slug = this.requiredSlug(payload.slug);
    }

    for (const field of ['category', 'summary', 'body', 'bodyBlocks', 'internalLinks']) {
      if (payload[field] !== undefined) data[field] = this.normalizeField(field, payload[field]);
    }
    if (payload.status !== undefined) data.status = this.normalizePageStatus(payload.status);
    this.assignSeoFields(data, payload);
    return data;
  }

  private pickProcessContent(payload: RawPayload, mode: 'create' | 'update'): RawPayload {
    const data: RawPayload = {};
    const title = this.optionalString(payload.title);
    const slugSource = this.optionalString(payload.slug) ?? title;

    if (mode === 'create') {
      data.title = this.requiredString(title, 'Title');
      data.slug = this.requiredSlug(slugSource ?? title);
    } else {
      if (payload.title !== undefined) data.title = this.requiredString(payload.title, 'Title');
      if (payload.slug !== undefined) data.slug = this.requiredSlug(payload.slug);
    }

    for (const field of ['summary', 'body', 'contentBlocks']) {
      if (payload[field] !== undefined) data[field] = this.normalizeField(field, payload[field]);
    }
    if (payload.status !== undefined) data.status = this.normalizePageStatus(payload.status);
    this.assignSeoFields(data, payload);
    return data;
  }

  private pickResult(payload: RawPayload, mode: 'create' | 'update'): RawPayload {
    const data: RawPayload = {};
    const title = this.optionalString(payload.title);
    const slugSource = this.optionalString(payload.slug) ?? title;

    if (mode === 'create') {
      data.title = this.requiredString(title, 'Title');
      data.slug = this.requiredSlug(slugSource ?? title);
      data.story = this.requiredString(payload.story, 'Story');
    } else {
      if (payload.title !== undefined) data.title = this.requiredString(payload.title, 'Title');
      if (payload.slug !== undefined) data.slug = this.requiredSlug(payload.slug);
      if (payload.story !== undefined) data.story = this.requiredString(payload.story, 'Story');
    }

    for (const field of [
      'kind',
      'parentName',
      'studentName',
      'context',
      'scoreLabel',
      'displayControls',
      'boardId',
      'classLevelId',
      'subjectId',
      'schoolId',
      'sectorId',
      'societyId',
      'tutorId',
    ]) {
      if (payload[field] !== undefined) data[field] = this.normalizeField(field, payload[field]);
    }
    if (payload.rating !== undefined) data.rating = this.toInteger(payload.rating, 'Rating');
    if (payload.status !== undefined) data.status = this.normalizeReviewStatus(payload.status);
    if (payload.visibility !== undefined) data.visibility = this.toBoolean(payload.visibility);
    return data;
  }

  private assignSeoFields(data: RawPayload, payload: RawPayload) {
    for (const field of [
      'seoTitle',
      'metaDescription',
      'canonical',
      'ogTitle',
      'ogDescription',
      'ogImage',
      'schemaData',
      'relatedLinks',
    ]) {
      if (payload[field] !== undefined) {
        data[field] = this.normalizeField(field, payload[field]);
      }
    }
  }

  private extractRelations(payload: RawPayload) {
    return {
      boardIds: this.stringArray(payload.boardIds),
      classLevelIds: this.stringArray(payload.classLevelIds),
      subjectIds: this.stringArray(payload.subjectIds),
      schoolIds: this.stringArray(payload.schoolIds),
      sectorIds: this.stringArray(payload.sectorIds),
      societyIds: this.stringArray(payload.societyIds),
      tutorIds: this.stringArray(payload.tutorIds),
      assignments: Array.isArray(payload.assignments) ? payload.assignments : undefined,
      mappings: Array.isArray(payload.mappings) ? payload.mappings : undefined,
    };
  }

  private async replaceRelations(tx: any, entity: ContentEntity, id: string, relations: ReturnType<AdminService['extractRelations']>) {
    switch (entity) {
      case 'boards':
        await this.replaceComposite(tx.boardSubject, 'boardId', 'subjectId', id, relations.subjectIds);
        await this.replaceComposite(tx.boardClass, 'boardId', 'classLevelId', id, relations.classLevelIds);
        await this.replaceComposite(tx.schoolBoard, 'boardId', 'schoolId', id, relations.schoolIds);
        await this.replaceComposite(tx.sectorBoard, 'boardId', 'sectorId', id, relations.sectorIds);
        await this.replaceComposite(tx.societyBoard, 'boardId', 'societyId', id, relations.societyIds);
        break;
      case 'classes':
        await this.replaceComposite(tx.boardClass, 'classLevelId', 'boardId', id, relations.boardIds);
        await this.replaceComposite(tx.subjectClass, 'classLevelId', 'subjectId', id, relations.subjectIds);
        await this.replaceComposite(tx.tutorClass, 'classLevelId', 'tutorId', id, relations.tutorIds);
        break;
      case 'subjects':
        await this.replaceComposite(tx.boardSubject, 'subjectId', 'boardId', id, relations.boardIds);
        await this.replaceComposite(tx.subjectClass, 'subjectId', 'classLevelId', id, relations.classLevelIds);
        await this.replaceComposite(tx.schoolSubject, 'subjectId', 'schoolId', id, relations.schoolIds);
        await this.replaceComposite(tx.sectorSubject, 'subjectId', 'sectorId', id, relations.sectorIds);
        await this.replaceComposite(tx.societySubject, 'subjectId', 'societyId', id, relations.societyIds);
        await this.replaceComposite(tx.tutorSubject, 'subjectId', 'tutorId', id, relations.tutorIds);
        break;
      case 'schools':
        await this.replaceComposite(tx.schoolBoard, 'schoolId', 'boardId', id, relations.boardIds);
        await this.replaceComposite(tx.schoolSubject, 'schoolId', 'subjectId', id, relations.subjectIds);
        await this.replaceComposite(tx.schoolSector, 'schoolId', 'sectorId', id, relations.sectorIds);
        await this.replaceComposite(tx.schoolSociety, 'schoolId', 'societyId', id, relations.societyIds);
        await this.replaceComposite(tx.tutorSchool, 'schoolId', 'tutorId', id, relations.tutorIds);
        break;
      case 'sectors':
        await this.replaceComposite(tx.schoolSector, 'sectorId', 'schoolId', id, relations.schoolIds);
        await this.replaceComposite(tx.sectorBoard, 'sectorId', 'boardId', id, relations.boardIds);
        await this.replaceComposite(tx.sectorSubject, 'sectorId', 'subjectId', id, relations.subjectIds);
        break;
      case 'societies':
        await this.replaceComposite(tx.schoolSociety, 'societyId', 'schoolId', id, relations.schoolIds);
        await this.replaceComposite(tx.societyBoard, 'societyId', 'boardId', id, relations.boardIds);
        await this.replaceComposite(tx.societySubject, 'societyId', 'subjectId', id, relations.subjectIds);
        break;
      case 'faqs':
        await this.replaceAssignments(tx, id, relations.assignments);
        break;
      case 'resources':
        await this.replaceMappings(tx, id, relations.mappings ?? this.buildResourceMappings(relations));
        break;
    }
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

  private async replaceAssignments(tx: any, faqId: string, assignments?: unknown[]) {
    if (!assignments) return;
    await tx.faqAssignment.deleteMany({ where: { faqId } });
    const data = assignments
      .map((assignment) => {
        if (!assignment || typeof assignment !== 'object') return null;
        const item = assignment as RawPayload;
        const entityType = this.optionalString(item.entityType);
        if (!entityType) return null;
        return {
          faqId,
          entityType,
          entityId: this.optionalString(item.entityId),
          pageSlug: this.optionalString(item.pageSlug),
        };
      })
      .filter(Boolean);
    if (data.length > 0) await tx.faqAssignment.createMany({ data });
  }

  private async replaceMappings(tx: any, resourceId: string, mappings?: unknown[]) {
    if (!mappings) return;
    await tx.resourceArticleMapping.deleteMany({ where: { resourceId } });
    const data = mappings
      .map((mapping) => {
        if (!mapping || typeof mapping !== 'object') return null;
        const item = mapping as RawPayload;
        const entityType = this.optionalString(item.entityType);
        const entityId = this.optionalString(item.entityId);
        if (!entityType || !entityId) return null;
        return { resourceId, entityType, entityId };
      })
      .filter(Boolean);
    if (data.length > 0) await tx.resourceArticleMapping.createMany({ data, skipDuplicates: true });
  }

  private buildResourceMappings(relations: ReturnType<AdminService['extractRelations']>) {
    const rows: Array<{ entityType: string; entityId: string }> = [];
    for (const [entityType, ids] of [
      ['BOARD', relations.boardIds],
      ['CLASS', relations.classLevelIds],
      ['SUBJECT', relations.subjectIds],
      ['SCHOOL', relations.schoolIds],
      ['SECTOR', relations.sectorIds],
      ['SOCIETY', relations.societyIds],
    ] as const) {
      for (const entityId of ids ?? []) {
        rows.push({ entityType, entityId });
      }
    }
    return rows.length > 0 ? rows : undefined;
  }

  private normalizeField(field: string, value: unknown) {
    if (['status'].includes(field)) return this.normalizePageStatus(value);
    if (['level'].includes(field)) return this.toOptionalInteger(value, field);
    if (
      [
        'schemaData',
        'relatedLinks',
        'contentBlocks',
        'bodyBlocks',
        'internalLinks',
        'displayControls',
      ].includes(field)
    ) {
      if (value === '') return null;
      return typeof value === 'string'
        ? this.parseJsonField(value, field)
        : value;
    }
    return this.optionalString(value);
  }

  private requiredString(value: unknown, fieldName: string): string {
    const normalized = this.optionalString(value);
    if (!normalized) throw new BadRequestException(`${fieldName} is required.`);
    return normalized;
  }

  private optionalString(value: unknown): string | null | undefined {
    if (value === undefined) return undefined;
    if (value === null) return null;
    const normalized = String(value).trim();
    return normalized.length > 0 ? normalized : null;
  }

  private slugify(value: unknown): string {
    return String(value ?? '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
  }

  private requiredSlug(value: unknown): string {
    const slug = this.slugify(value);
    if (!slug) throw new BadRequestException('Slug could not be generated.');
    return slug;
  }

  private normalizePageStatus(value: unknown): PageStatus {
    if (PAGE_STATUSES.includes(value as (typeof PAGE_STATUSES)[number])) {
      return value as PageStatus;
    }
    throw new BadRequestException('Invalid publish status.');
  }

  private normalizeReviewStatus(value: unknown): ReviewStatus {
    if (REVIEW_STATUSES.includes(value as (typeof REVIEW_STATUSES)[number])) {
      return value as ReviewStatus;
    }
    throw new BadRequestException('Invalid review status.');
  }

  private toBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
    return Boolean(value);
  }

  private parseJsonField(value: string, fieldName: string): Prisma.InputJsonValue {
    try {
      return JSON.parse(value) as Prisma.InputJsonValue;
    } catch {
      throw new BadRequestException(`${fieldName} must be valid JSON.`);
    }
  }

  private isObject(value: unknown): value is Record<string, any> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  private toInteger(value: unknown, fieldName: string): number {
    const numberValue = Number(value);
    if (!Number.isInteger(numberValue)) {
      throw new BadRequestException(`${fieldName} must be an integer.`);
    }
    return numberValue;
  }

  private toOptionalInteger(value: unknown, fieldName: string): number | null {
    if (value === undefined || value === null || value === '') return null;
    return this.toInteger(value, fieldName);
  }

  private stringArray(value: unknown): string[] | undefined {
    if (value === undefined) return undefined;
    if (!Array.isArray(value)) return [];
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter(Boolean);
  }

  private rethrowKnownWriteError(error: unknown, entityName: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(`${entityName} slug or unique field already exists.`);
    }

    throw error;
  }
}
