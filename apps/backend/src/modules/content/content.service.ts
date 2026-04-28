import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import {
  publishedBoardInclude,
  publishedClassLevelInclude,
  publishedSchoolInclude,
  publishedSectorInclude,
  publishedSocietyInclude,
  publishedSubjectInclude,
} from './public-relations';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  listBoards() {
    return (this.prisma as any).board.findMany({
      where: { status: 'PUBLISHED' },
      include: publishedBoardInclude,
      orderBy: { name: 'asc' },
    });
  }

  async getBoard(slug: string) {
    const board = await (this.prisma as any).board.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: publishedBoardInclude,
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }

  listClasses() {
    return (this.prisma as any).classLevel.findMany({
      where: { status: 'PUBLISHED' },
      include: publishedClassLevelInclude,
      orderBy: [{ level: 'asc' }, { name: 'asc' }],
    });
  }

  async getClass(slug: string) {
    const classLevel = await (this.prisma as any).classLevel.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: publishedClassLevelInclude,
    });

    if (!classLevel) {
      throw new NotFoundException('Class not found');
    }

    return classLevel;
  }

  listSchools() {
    return (this.prisma as any).school.findMany({
      where: { status: 'PUBLISHED' },
      include: publishedSchoolInclude,
      orderBy: { name: 'asc' },
    });
  }

  async getSchool(slug: string) {
    const school = await (this.prisma as any).school.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: publishedSchoolInclude,
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return school;
  }

  async listLocations() {
    const [sectors, societies] = await Promise.all([
      (this.prisma as any).sector.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { name: 'asc' },
      }),
      (this.prisma as any).society.findMany({
        where: {
          status: 'PUBLISHED',
          sector: { is: { status: 'PUBLISHED' } },
        },
        orderBy: { name: 'asc' },
      }),
    ]);

    return [
      ...sectors.map((sector) => ({
        id: sector.id,
        slug: sector.slug,
        name: sector.name,
        description: sector.description,
        type: 'sector' as const,
      })),
      ...societies.map((society) => ({
        id: society.id,
        slug: society.slug,
        name: society.name,
        parentId: society.sectorId,
        type: 'society' as const,
      })),
    ];
  }

  async getLocation(slug: string) {
    const sector = await (this.prisma as any).sector.findFirst({
      where: { slug, status: 'PUBLISHED' },
    });
    if (sector) {
      return {
        id: sector.id,
        slug: sector.slug,
        name: sector.name,
        description: sector.description,
        type: 'sector' as const,
      };
    }

    const society = await (this.prisma as any).society.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
        sector: { is: { status: 'PUBLISHED' } },
      },
    });
    if (society) {
      return {
        id: society.id,
        slug: society.slug,
        name: society.name,
        parentId: society.sectorId,
        type: 'society' as const,
      };
    }

    throw new NotFoundException('Location not found');
  }

  listSubjects() {
    return (this.prisma as any).subject.findMany({
      where: { status: 'PUBLISHED' },
      include: publishedSubjectInclude,
      orderBy: { name: 'asc' },
    });
  }

  async getSubject(slug: string) {
    const subject = await (this.prisma as any).subject.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: publishedSubjectInclude,
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  listSectors() {
    return (this.prisma as any).sector.findMany({
      where: { status: 'PUBLISHED' },
      include: publishedSectorInclude,
      orderBy: { name: 'asc' },
    });
  }

  async getSector(slug: string) {
    const sector = await (this.prisma as any).sector.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: publishedSectorInclude,
    });

    if (!sector) {
      throw new NotFoundException('Sector not found');
    }

    return sector;
  }

  listSocieties() {
    return (this.prisma as any).society.findMany({
      where: {
        status: 'PUBLISHED',
        sector: { is: { status: 'PUBLISHED' } },
      },
      include: publishedSocietyInclude,
      orderBy: { name: 'asc' },
    });
  }

  async getSociety(slug: string) {
    const society = await (this.prisma as any).society.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
        sector: { is: { status: 'PUBLISHED' } },
      },
      include: publishedSocietyInclude,
    });

    if (!society) {
      throw new NotFoundException('Society not found');
    }

    return society;
  }

  listResources(category?: string) {
    return (this.prisma as any).resourceArticle.findMany({
      where: {
        deletedAt: null,
        status: 'PUBLISHED',
        ...(category ? { category } : {}),
      },
      include: { mappings: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getResource(slug: string) {
    const resource = await (this.prisma as any).resourceArticle.findFirst({
      where: { slug, deletedAt: null, status: 'PUBLISHED' },
      include: { mappings: true },
    });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    return resource;
  }

  listProcessContent() {
    return (this.prisma as any).processContent.findMany({
      where: {
        deletedAt: null,
        status: 'PUBLISHED',
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getProcessContent(slug: string) {
    const processContent = await (this.prisma as any).processContent.findFirst({
      where: {
        slug,
        deletedAt: null,
        status: 'PUBLISHED',
      },
    });

    if (!processContent) {
      throw new NotFoundException('Process content not found');
    }

    return processContent;
  }

  listFaqs(filters: { entityType?: string; entityId?: string; pageSlug?: string }) {
    const entityType = filters.entityType?.trim();
    const entityId = filters.entityId?.trim();
    const pageSlug = filters.pageSlug?.trim();

    return (this.prisma as any).faq.findMany({
      where: {
        deletedAt: null,
        status: 'PUBLISHED',
        visibility: true,
        ...(entityType || entityId || pageSlug
          ? {
              assignments: {
                some: {
                  ...(entityType ? { entityType } : {}),
                  ...(entityId ? { entityId } : {}),
                  ...(pageSlug ? { pageSlug } : {}),
                },
              },
            }
          : {}),
      },
      include: { assignments: true },
      orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
    });
  }

  listReviews() {
    return (this.prisma as any).resultStory.findMany({
      where: {
        deletedAt: null,
        status: 'APPROVED',
        visibility: true,
      },
      include: {
        board: true,
        classLevel: true,
        subject: true,
        school: true,
        sector: true,
        society: true,
        tutor: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getPageBySlug(slug?: string) {
    if (!slug) {
      throw new NotFoundException('Page not found');
    }

    const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
    const page = await this.prisma.pageRecord.findFirst({
      where: {
        slug: normalizedSlug,
        status: 'PUBLISHED',
        deletedAt: null,
      },
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

  async getRedirect(from?: string) {
    if (!from) {
      throw new NotFoundException('Redirect not found');
    }

    const normalizedFrom = from.startsWith('/') ? from : `/${from}`;
    const redirect = await this.prisma.redirect.findFirst({
      where: {
        from: normalizedFrom,
        isActive: true,
      },
    });

    if (!redirect) {
      throw new NotFoundException('Redirect not found');
    }

    return redirect;
  }
}
