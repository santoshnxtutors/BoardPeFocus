import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

export type SearchResultType = 'tutor' | 'board' | 'school' | 'sector';

export interface SearchResultItem {
  id: string;
  name: string;
  slug: string;
  type: SearchResultType;
}

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(query: string) {
    if (!query || query.length < 2) return [];

    const [tutors, boards, schools, sectors] = await Promise.all([
      this.prisma.tutor.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
          isVerified: true,
        },
        take: 5,
      }),
      this.prisma.board.findMany({
        where: { name: { contains: query, mode: 'insensitive' } },
        take: 3,
      }),
      this.prisma.school.findMany({
        where: { name: { contains: query, mode: 'insensitive' } },
        take: 3,
      }),
      this.prisma.sector.findMany({
        where: { name: { contains: query, mode: 'insensitive' } },
        take: 3,
      }),
    ]);

    return {
      tutors: tutors.map<SearchResultItem>((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        type: 'tutor',
      })),
      boards: boards.map<SearchResultItem>((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        type: 'board',
      })),
      schools: schools.map<SearchResultItem>((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        type: 'school',
      })),
      sectors: sectors.map<SearchResultItem>((sec) => ({
        id: sec.id,
        name: sec.name,
        slug: sec.slug,
        type: 'sector',
      })),
    };
  }
}
