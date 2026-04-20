import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, TutorStatus } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';

interface TutorPublicFilters {
  board?: string;
  subject?: string;
  location?: string;
  school?: string;
}

@Injectable()
export class TutorsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic(filters: TutorPublicFilters) {
    const { board, subject, location, school } = filters;

    return this.prisma.tutor.findMany({
      where: {
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
        locations: { include: { sector: true, society: true } },
      },
      orderBy: { priority: 'desc' },
    });
  }

  async findOneBySlug(slug: string) {
    const tutor = await this.prisma.tutor.findUnique({
      where: { slug },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
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
    const tutor = await this.prisma.tutor.findUnique({
      where: { id },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
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
    const tutor = await this.prisma.tutor.findUnique({
      where: { id },
      include: {
        qualifications: true,
        achievements: true,
        boards: true,
        subjects: true,
        faqs: true,
      },
    });

    if (!tutor) return 0;

    let score = 0;
    if (tutor.photoUrl) score += 15;
    if (tutor.bio && tutor.bio.length > 200) score += 20;
    if (tutor.tagline) score += 5;
    if (tutor.about && tutor.about.length > 500) score += 20;
    if (tutor.methodology) score += 10;
    if (tutor.qualifications.length > 0) score += 10;
    if (tutor.boards.length > 0) score += 10;
    if (tutor.subjects.length > 0) score += 10;

    return Math.min(score, 100);
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

  async create(data: Prisma.TutorCreateInput) {
    return this.prisma.tutor.create({ data });
  }

  async update(id: string, data: Prisma.TutorUpdateInput) {
    return this.prisma.tutor.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.tutor.delete({
      where: { id },
    });
  }
}
