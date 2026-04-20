import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { ScoringService } from './scoring.service';
import { LinkIntelligenceService } from './link-intelligence.service';
import { ContentAssemblerService } from './content-assembler.service';
import { PageType } from '../config/generator.config';

@Injectable()
export class PageGeneratorService {
  private readonly logger = new Logger(PageGeneratorService.name);

  constructor(
    private prisma: PrismaService,
    private scoring: ScoringService,
    private linking: LinkIntelligenceService,
    private assembler: ContentAssemblerService,
  ) {}

  async generatePage(type: PageType, context: any) {
    // 1. Check Eligibility & Score
    const { score, eligible, reasons } =
      await this.scoring.calculateEligibility(type, context);

    // 2. Slug Generation (Deterministic & Stable)
    const slug = await this.generateStableSlug(type, context);

    // 3. Handle Eligibility Rejection
    if (!eligible) {
      this.logger.warn(
        `Page generation rejected for ${slug}. Score: ${score}. Reasons: ${reasons.join(', ')}`,
      );

      // If page existed but no longer eligible, unpublish it (don't delete to preserve history)
      await this.prisma.page.updateMany({
        where: { slug, isPublished: true },
        data: { isPublished: false },
      });

      return { status: 'rejected', score, reasons };
    }

    // 4. Assemble Unique Content Blocks
    const { title, content, seo, hash } = await this.assembler.assemble(
      type,
      context,
    );

    // 5. Generate Intelligent Internal Links
    const internalLinks = await this.linking.generateLinks(type, context);

    // 6. Transactional Upsert with Versioning & Slug Locking
    const result = await this.prisma.$transaction(async (tx) => {
      const existingPage = await tx.page.findUnique({ where: { slug } });

      // Slug Locking Check: If a page exists with a different ID but same intent, we might need a redirect
      // For now, we assume slug is deterministic based on entity IDs.

      const page = await tx.page.upsert({
        where: { slug },
        update: {
          title,
          content,
          seoTitle: seo.title,
          seoDesc: seo.description,
          eligibilityScore: score,
          contentHash: hash,
          internalLinks: internalLinks as any,
          isPublished: true,
          updatedAt: new Date(),
        },
        create: {
          slug,
          title,
          content,
          seoTitle: seo.title,
          seoDesc: seo.description,
          type: type as any,
          eligibilityScore: score,
          contentHash: hash,
          internalLinks: internalLinks as any,
          isPublished: true,
          ...(context.boardId && { boardId: context.boardId }),
          ...(context.schoolId && { schoolId: context.schoolId }),
          ...(context.subjectId && { subjectId: context.subjectId }),
          ...(context.sectorId && { sectorId: context.sectorId }),
          ...(context.societyId && { societyId: context.societyId }),
          ...(context.tutorId && { tutorId: context.tutorId }),
        },
      });

      // Create Version History if content changed
      if (!existingPage || existingPage.contentHash !== hash) {
        await tx.pageVersion.create({
          data: {
            pageId: page.id,
            content: content,
            seoTitle: seo.title,
            seoDesc: seo.description,
            hash: hash,
            version: existingPage
              ? (await tx.pageVersion.count({ where: { pageId: page.id } })) + 1
              : 1,
          },
        });
      }

      return page;
    });

    return {
      status: 'success',
      pageId: result.id,
      slug: result.slug,
      score: score,
    };
  }

  private async generateStableSlug(
    type: PageType,
    context: any,
  ): Promise<string> {
    switch (type) {
      case PageType.TUTOR:
        const tutor = await this.prisma.tutor.findUnique({
          where: { id: context.tutorId },
        });
        return `tutors/${tutor?.slug || context.tutorId}`;
      case PageType.BOARD:
        const board = await this.prisma.board.findUnique({
          where: { id: context.boardId },
        });
        return `gurugram/${board?.slug}`;
      case PageType.BOARD_SUBJECT:
        const b = await this.prisma.board.findUnique({
          where: { id: context.boardId },
        });
        const s = await this.prisma.subject.findUnique({
          where: { id: context.subjectId },
        });
        return `gurugram/${b?.slug}/${s?.slug}`;
      case PageType.SCHOOL:
        const school = await this.prisma.school.findUnique({
          where: { id: context.schoolId },
        });
        return `gurugram/schools/${school?.slug}`;
      case PageType.SECTOR:
        const sector = await this.prisma.sector.findUnique({
          where: { id: context.sectorId },
        });
        return `gurugram/locations/${sector?.slug}`;
      case PageType.SECTOR_SOCIETY:
        const sec = await this.prisma.sector.findUnique({
          where: { id: context.sectorId },
        });
        const soc = await this.prisma.society.findUnique({
          where: { id: context.societyId },
        });
        return `gurugram/locations/${sec?.slug}/${soc?.slug}`;
      default:
        return `p/${Date.now()}`;
    }
  }
}
