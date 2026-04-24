import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return (this.prisma as any).board.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        subjects: { include: { subject: true } },
        classes: { include: { classLevel: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const board = await (this.prisma as any).board.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        subjects: { include: { subject: true } },
        classes: { include: { classLevel: true } },
        schools: { include: { school: true } },
        sectors: { include: { sector: true } },
        societies: { include: { society: true } },
      },
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
