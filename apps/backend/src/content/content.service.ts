import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getBoards() {
    return this.prisma.board.findMany();
  }

  async getBoardBySlug(slug: string) {
    return this.prisma.board.findUnique({ where: { slug } });
  }

  async getSchools() {
    return this.prisma.school.findMany();
  }

  async getSchoolBySlug(slug: string) {
    return this.prisma.school.findUnique({ where: { slug } });
  }

  async getLocations() {
    return this.prisma.location.findMany();
  }

  async getLocationBySlug(slug: string) {
    return this.prisma.location.findUnique({ where: { slug } });
  }

  async getSubjects() {
    return this.prisma.subject.findMany();
  }
}
