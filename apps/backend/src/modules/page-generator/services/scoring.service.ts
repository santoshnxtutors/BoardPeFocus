import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { PAGE_GENERATOR_CONFIG, PageType } from '../config/generator.config';

@Injectable()
export class ScoringService {
  constructor(private prisma: PrismaService) {}

  async calculateEligibility(
    type: PageType,
    context: any,
  ): Promise<{ score: number; eligible: boolean; reasons: string[] }> {
    const score = 0;
    const reasons: string[] = [];
    const thresholds = PAGE_GENERATOR_CONFIG.thresholds;

    switch (type) {
      case PageType.TUTOR:
        return this.scoreTutor(context.tutorId);
      case PageType.SCHOOL:
        return this.scoreSchool(context.schoolId);
      case PageType.BOARD_SUBJECT:
        return this.scoreBoardSubject(context.boardId, context.subjectId);
      case PageType.SECTOR_SOCIETY:
        return this.scoreSociety(context.societyId);
      default:
        return { score: 100, eligible: true, reasons: ['Standard page type'] };
    }
  }

  private async scoreTutor(tutorId: string) {
    const tutor = await this.prisma.tutor.findUnique({
      where: { id: tutorId },
      include: { boards: true, subjects: true },
    });

    if (!tutor)
      return { score: 0, eligible: false, reasons: ['Tutor not found'] };

    let points = 0;
    if (tutor.photoUrl) points += 30;
    if (tutor.about && tutor.about.length > 200) points += 40;
    if (tutor.boards.length > 0) points += 15;
    if (tutor.subjects.length > 0) points += 15;

    const eligible =
      points >= PAGE_GENERATOR_CONFIG.thresholds.tutor_profile.min_completeness;
    return {
      score: points,
      eligible,
      reasons: eligible ? [] : ['Incomplete profile'],
    };
  }

  private async scoreSchool(schoolId: string) {
    const tutorsCount = await this.prisma.tutorSchool.count({
      where: { schoolId },
    });
    const eligible =
      tutorsCount >= PAGE_GENERATOR_CONFIG.thresholds.school_page.min_tutors;

    return {
      score: tutorsCount * 10,
      eligible,
      reasons: eligible
        ? []
        : [
            `Only ${tutorsCount} tutors found, need ${PAGE_GENERATOR_CONFIG.thresholds.school_page.min_tutors}`,
          ],
    };
  }

  private async scoreBoardSubject(boardId: string, subjectId: string) {
    const tutorsCount = await this.prisma.tutorBoard.count({
      where: { boardId, tutor: { subjects: { some: { subjectId } } } },
    });
    const eligible =
      tutorsCount >= PAGE_GENERATOR_CONFIG.thresholds.board_subject.min_tutors;

    return {
      score: tutorsCount * 20,
      eligible,
      reasons: eligible
        ? []
        : ['Insufficient subject specialists for this board'],
    };
  }

  private async scoreSociety(societyId: string) {
    const society = await this.prisma.society.findUnique({
      where: { id: societyId },
    });
    if (!society)
      return { score: 0, eligible: false, reasons: ['Society not found'] };

    const tutorsCount = await this.prisma.tutorLocation.count({
      where: { sectorId: society.sectorId },
    });
    const eligible =
      tutorsCount >= PAGE_GENERATOR_CONFIG.thresholds.society_page.min_tutors;

    return {
      score: tutorsCount * 25,
      eligible,
      reasons: eligible ? [] : ['Low tutor coverage in parent sector'],
    };
  }
}
