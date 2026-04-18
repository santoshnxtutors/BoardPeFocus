import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TutorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: any) {
    const { board, subject, location, school } = query || {};
    
    return this.prisma.tutor.findMany({
      where: {
        boards: board ? { some: { slug: board } } : undefined,
        subjects: subject ? { some: { slug: subject } } : undefined,
        locations: location ? { some: { slug: location } } : undefined,
        schools: school ? { some: { slug: school } } : undefined,
      },
      include: {
        boards: true,
        subjects: true,
        locations: true,
        schools: true,
      },
    });
  }

  async findOne(slug: string) {
    return this.prisma.tutor.findUnique({
      where: { slug },
      include: {
        boards: true,
        subjects: true,
        locations: true,
        schools: true,
      },
    });
  }
}
