import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  listSchools() {
    return this.prisma.school.findMany({
      include: {
        boards: {
          include: {
            board: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getSchool(slug: string) {
    const school = await this.prisma.school.findUnique({
      where: { slug },
      include: {
        boards: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return school;
  }

  async listLocations() {
    const [sectors, societies] = await Promise.all([
      this.prisma.sector.findMany({ orderBy: { name: 'asc' } }),
      this.prisma.society.findMany({ orderBy: { name: 'asc' } }),
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
    const sector = await this.prisma.sector.findUnique({ where: { slug } });
    if (sector) {
      return {
        id: sector.id,
        slug: sector.slug,
        name: sector.name,
        description: sector.description,
        type: 'sector' as const,
      };
    }

    const society = await this.prisma.society.findUnique({ where: { slug } });
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
    return this.prisma.subject.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
