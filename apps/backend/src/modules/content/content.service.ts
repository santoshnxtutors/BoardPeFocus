import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  listSchools() {
    return (this.prisma as any).school.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        boards: {
          include: {
            board: true,
          },
        },
        subjects: { include: { subject: true } },
        sectors: { include: { sector: true } },
        societies: { include: { society: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getSchool(slug: string) {
    const school = await (this.prisma as any).school.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        boards: {
          include: {
            board: true,
          },
        },
        subjects: { include: { subject: true } },
        sectors: { include: { sector: true } },
        societies: { include: { society: true } },
      },
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
        where: { status: 'PUBLISHED' },
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
      where: { slug, status: 'PUBLISHED' },
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
      include: {
        boards: { include: { board: true } },
        classes: { include: { classLevel: true } },
      },
      orderBy: { name: 'asc' },
    });
  }
}
