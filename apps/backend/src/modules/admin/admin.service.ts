import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LeadStatus, PageStatus, Prisma, ReviewStatus } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';
import { UpdatePageDto } from './dto/update-page.dto';

const GENERATOR_THRESHOLDS = {
  minTutorsForGeo: 5,
  minProfileCompleteness: 80,
  maxDuplicationScore: 30,
};

const PAGE_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;
const REVIEW_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const;

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

  async updatePage(id: string, dto: UpdatePageDto) {
    await this.getPage(id);

    return this.prisma.pageRecord.update({
      where: { id },
      data: {
        ...(dto.slug !== undefined ? { slug: this.slugify(dto.slug) } : {}),
        ...(dto.title !== undefined ? { title: this.requiredString(dto.title, 'Title') } : {}),
        ...(dto.status !== undefined ? { status: dto.status } : {}),
      },
    });
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
    ]);

    return { boards, classes, subjects, schools, sectors, societies, tutors };
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
      include: {
        issues: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  triggerGeneration(type: string) {
    return this.prisma.generationJob.create({
      data: {
        type: this.requiredString(type, 'Generation type'),
        status: 'QUEUED',
        progress: 0,
        config: {
          requestedAt: new Date().toISOString(),
          source: 'admin',
        } satisfies Prisma.InputJsonValue,
      },
    });
  }

  getGenerationThresholds() {
    return GENERATOR_THRESHOLDS;
  }

  updateGenerationThresholds(data: Record<string, unknown>) {
    return {
      status: 'saved',
      data,
    };
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
      return value === '' ? null : value;
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
