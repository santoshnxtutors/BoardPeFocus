import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { PageType } from '../config/generator.config';

interface Link {
  label: string;
  url: string;
  type: 'parent' | 'child' | 'sibling' | 'related';
}

@Injectable()
export class LinkIntelligenceService {
  constructor(private prisma: PrismaService) {}

  async generateLinks(type: PageType, context: any): Promise<Link[]> {
    const links: Link[] = [];

    switch (type) {
      case PageType.TUTOR:
        links.push(...(await this.getTutorRelatedLinks(context.tutorId)));
        break;
      case PageType.SCHOOL:
        links.push(...(await this.getSchoolRelatedLinks(context.schoolId)));
        break;
      case PageType.BOARD_SUBJECT:
        links.push(
          ...(await this.getBoardSubjectRelatedLinks(
            context.boardId,
            context.subjectId,
          )),
        );
        break;
      case PageType.SECTOR:
        links.push(...(await this.getSectorRelatedLinks(context.sectorId)));
        break;
    }

    return links;
  }

  private async getTutorRelatedLinks(tutorId: string): Promise<Link[]> {
    const tutor = await this.prisma.tutor.findUnique({
      where: { id: tutorId },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
        schools: { include: { school: true } },
      },
    });
    if (!tutor) return [];

    const links: Link[] = [];

    // Parent: Boards & Subjects pages
    for (const b of tutor.boards) {
      links.push({
        label: `${b.board.name} Tutors`,
        url: `/gurugram/${b.board.slug}`,
        type: 'parent',
      });
    }

    // Related: Schools familiar with
    for (const s of tutor.schools) {
      links.push({
        label: `Tutors for ${s.school.name}`,
        url: `/gurugram/schools/${s.school.slug}`,
        type: 'related',
      });
    }

    return links;
  }

  private async getSchoolRelatedLinks(schoolId: string): Promise<Link[]> {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
      include: { boards: { include: { board: true } } },
    });
    if (!school) return [];

    const links: Link[] = [];

    // Child: School + Board pages
    for (const b of school.boards) {
      links.push({
        label: `${school.name} - ${b.board.name} Prep`,
        url: `/gurugram/schools/${school.slug}/${b.board.slug}`,
        type: 'child',
      });
    }

    return links;
  }

  private async getBoardSubjectRelatedLinks(
    boardId: string,
    subjectId: string,
  ): Promise<Link[]> {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!board || !subject) return [];

    const links: Link[] = [];

    // Parent: Board page
    links.push({
      label: `All ${board.name} Tutors`,
      url: `/gurugram/${board.slug}`,
      type: 'parent',
    });

    // Sibling: Other subjects for same board
    const otherSubjects = await this.prisma.subject.findMany({
      where: { id: { not: subjectId } },
      take: 5,
    });

    for (const s of otherSubjects) {
      links.push({
        label: `${board.name} ${s.name} Tutors`,
        url: `/gurugram/${board.slug}/${s.slug}`,
        type: 'sibling',
      });
    }

    return links;
  }

  private async getSectorRelatedLinks(sectorId: string): Promise<Link[]> {
    const sector = await this.prisma.sector.findUnique({
      where: { id: sectorId },
      include: { societies: true },
    });
    if (!sector) return [];

    const links: Link[] = [];

    // Child: Societies in this sector
    for (const soc of sector.societies) {
      links.push({
        label: `Tutors in ${soc.name}`,
        url: `/gurugram/locations/${sector.slug}/${soc.slug}`,
        type: 'child',
      });
    }

    return links;
  }
}
