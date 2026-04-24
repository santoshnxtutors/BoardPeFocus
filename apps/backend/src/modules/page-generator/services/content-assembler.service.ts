import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { PageType } from '../config/generator.config';
import * as crypto from 'crypto';

@Injectable()
export class ContentAssemblerService {
  constructor(private prisma: PrismaService) {}

  async assemble(
    type: PageType,
    context: any,
  ): Promise<{ title: string; content: any; seo: any; hash: string }> {
    let title = '';
    let blocks: any[] = [];
    let seo: any = {};

    switch (type) {
      case PageType.TUTOR:
        ({ title, blocks, seo } = await this.assembleTutorPage(
          context.tutorId,
        ));
        break;
      case PageType.SCHOOL:
        ({ title, blocks, seo } = await this.assembleSchoolPage(
          context.schoolId,
        ));
        break;
      case PageType.BOARD_SUBJECT:
        ({ title, blocks, seo } = await this.assembleBoardSubjectPage(
          context.boardId,
          context.subjectId,
        ));
        break;
    }

    const hash = crypto
      .createHash('md5')
      .update(JSON.stringify(blocks))
      .digest('hex');

    return { title, content: blocks, seo, hash };
  }

  private async assembleTutorPage(tutorId: string) {
    const tutor = await this.prisma.tutor.findUnique({
      where: { id: tutorId },
      include: {
        boards: { include: { board: true } },
        subjects: { include: { subject: true } },
      },
    });
    if (!tutor) throw new Error('Tutor not found');

    const boardNames = tutor.boards.map((b) => b.board.name).join(', ');
    const subjectNames = tutor.subjects.map((s) => s.subject.name).join(', ');

    return {
      title: `${tutor.name} - ${boardNames} ${subjectNames} Specialist`,
      blocks: [
        { type: 'hero', h1: tutor.name, tagline: tutor.tagline },
        { type: 'about', title: 'Teaching Philosophy', text: tutor.about },
        {
          type: 'stats',
          experience: tutor.experienceYrs,
          students: tutor.studentsTaught,
          rating: tutor.rating,
        },
      ],
      seo: {
        title: `Expert ${boardNames} ${subjectNames} Tutor: ${tutor.name} | BoardPeFocus`,
        description: `${tutor.name} is a verified ${boardNames} specialist in Gurugram with ${tutor.experienceYrs} years of experience in ${subjectNames}.`,
      },
    };
  }

  private async assembleSchoolPage(schoolId: string) {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new Error('School not found');

    return {
      title: `Board Preparation for ${school.name} Students`,
      blocks: [
        {
          type: 'hero',
          h1: `Top Tutors for ${school.name} Students`,
          text: `Customized support for students of ${school.name}, ${(school as any).locality ?? school.address ?? 'Gurugram'}.`,
        },
        {
          type: 'intro',
          text: `Every school has its own assessment pattern. We provide tutors who are familiar with the academic rigor of ${school.name}.`,
        },
      ],
      seo: {
        title: `Specialized Home Tutors for ${school.name} | Gurugram | BoardPeFocus`,
        description: `Target 95%+ in boards with home tutors who understand the ${school.name} curriculum and assessment style.`,
      },
    };
  }

  private async assembleBoardSubjectPage(boardId: string, subjectId: string) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!board || !subject) throw new Error('Entity not found');

    return {
      title: `${board.name} ${subject.name} Tutors in Gurugram`,
      blocks: [
        { type: 'hero', h1: `Master ${subject.name} for ${board.name} Boards` },
        {
          type: 'guide',
          title: `Why specialized ${board.name} ${subject.name} prep?`,
          text: `The ${board.name} marking scheme for ${subject.name} is unique. Our tutors focus on concept mastery and rubric-aligned answer framing.`,
        },
      ],
      seo: {
        title: `${board.name} ${subject.name} Home Tutors in Gurugram | BoardPeFocus`,
        description: `Expert ${board.name} ${subject.name} home tutoring in Gurugram. Structured preparation focusing on board rubrics and past papers.`,
      },
    };
  }
}
