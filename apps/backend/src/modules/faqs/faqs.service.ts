import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.fAQ.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.fAQ.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.fAQ.delete({
      where: { id },
    });
  }
}
