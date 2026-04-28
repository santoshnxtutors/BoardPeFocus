import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';
import { publishedBoardInclude } from '../content/public-relations';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return (this.prisma as any).board.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        subjects: {
          where: { subject: { is: { status: 'PUBLISHED' } } },
          include: { subject: true },
        },
        classes: {
          where: { classLevel: { is: { status: 'PUBLISHED' } } },
          include: { classLevel: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const board = await (this.prisma as any).board.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: publishedBoardInclude,
    });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async create(data: Prisma.BoardCreateInput) {
    return this.prisma.board.create({ data });
  }

  async update(id: string, data: Prisma.BoardUpdateInput) {
    return this.prisma.board.update({ where: { id }, data });
  }
}
