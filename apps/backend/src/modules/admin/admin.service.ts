import { Injectable } from '@nestjs/common';
import { LeadStatus, Prisma } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';

const GENERATOR_THRESHOLDS = {
  minTutorsForGeo: 5,
  minProfileCompleteness: 80,
  maxDuplicationScore: 30,
};

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  getStatsOverview() {
    return Promise.all([
      this.prisma.tutor.count(),
      this.prisma.lead.count(),
      this.prisma.pageRecord.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.tutor.count({ where: { status: 'PENDING_REVIEW' } }),
    ]).then(([totalTutors, totalLeads, activePages, pendingReviews]) => ({
      totalTutors,
      totalLeads,
      activePages,
      pendingReviews,
    }));
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
    return this.prisma.board.findMany({
      include: {
        subjects: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  listSchools() {
    return this.prisma.school.findMany({
      orderBy: { name: 'asc' },
    });
  }

  listPages() {
    return this.prisma.pageRecord.findMany({
      orderBy: { updatedAt: 'desc' },
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
        type,
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
}
