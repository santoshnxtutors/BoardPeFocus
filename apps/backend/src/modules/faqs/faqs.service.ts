import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return (this.prisma as any).faq.findMany({
      where: {
        deletedAt: null,
        status: 'PUBLISHED',
        visibility: true,
      },
      include: { assignments: true },
      orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
    });
  }

  async create(data: any) {
    return (this.prisma as any).faq.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return (this.prisma as any).faq.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return (this.prisma as any).faq.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'ARCHIVED' },
    });
  }
}
