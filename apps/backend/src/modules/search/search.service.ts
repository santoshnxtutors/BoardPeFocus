import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

export type SearchResultType = 'tutor' | 'board' | 'school' | 'sector';

export interface SearchResultItem {
  id: string;
  name: string;
  slug: string;
  type: SearchResultType;
}

export interface SearchResponse {
  tutors: SearchResultItem[];
  boards: SearchResultItem[];
  schools: SearchResultItem[];
  sectors: SearchResultItem[];
}

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(query: string): Promise<SearchResponse> {
    const normalizedQuery = query?.trim() ?? '';
    if (normalizedQuery.length < 2) {
      return {
        tutors: [],
        boards: [],
        schools: [],
        sectors: [],
      };
    }

    const [tutors, boards, schools, sectors] = await Promise.all([
      this.prisma.tutor.findMany({
        where: {
          name: { contains: normalizedQuery, mode: 'insensitive' },
          isVerified: true,
          status: 'PUBLISHED',
          deletedAt: null,
        },
        take: 5,
      }),
      (this.prisma as any).board.findMany({
        where: {
          name: { contains: normalizedQuery, mode: 'insensitive' },
          status: 'PUBLISHED',
        },
        take: 3,
      }),
      (this.prisma as any).school.findMany({
        where: {
          name: { contains: normalizedQuery, mode: 'insensitive' },
          status: 'PUBLISHED',
        },
        take: 3,
      }),
      (this.prisma as any).sector.findMany({
        where: {
          name: { contains: normalizedQuery, mode: 'insensitive' },
          status: 'PUBLISHED',
        },
        take: 3,
      }),
    ]);

    return {
      tutors: tutors.map((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        type: 'tutor' as const,
      })),
      boards: boards.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        type: 'board' as const,
      })),
      schools: schools.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        type: 'school' as const,
      })),
      sectors: sectors.map((sec) => ({
        id: sec.id,
        name: sec.name,
        slug: sec.slug,
        type: 'sector' as const,
      })),
    };
  }
}
