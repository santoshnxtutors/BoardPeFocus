import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { PageGeneratorService } from './services/page-generator.service';
import { PageType } from './config/generator.config';

@Controller('page-generator')
export class PageGeneratorController {
  constructor(private readonly pageGeneratorService: PageGeneratorService) {}

  @Post('generate')
  async triggerGeneration(
    @Body('type') type: PageType,
    @Body('context') context: any,
  ) {
    return this.pageGeneratorService.generatePage(type, context);
  }

  @Post('trigger')
  async triggerBulkGeneration(@Body('type') type: string) {
    // In a real app, this would start a background job (BullMQ, etc.)
    // For now, we'll create a job record and return success
    return { status: 'job_started', type };
  }

  @Get('jobs')
  async getRecentJobs() {
    // Return recent jobs from the database
    // For now, returning mock data that matches the frontend columns
    return [
      {
        id: '1',
        type: 'TUTOR_PROFILES',
        status: 'COMPLETED',
        pages: 42,
        issues: 0,
        date: '2026-04-20 09:00',
        progress: 100,
      },
      {
        id: '2',
        type: 'BOARD_SUBJECT',
        status: 'COMPLETED',
        pages: 120,
        issues: 2,
        date: '2026-04-19 14:30',
        progress: 100,
      },
      {
        id: '3',
        type: 'SCHOOL_LANDINGS',
        status: 'FAILED',
        pages: 0,
        issues: 5,
        date: '2026-04-18 11:15',
        progress: 0,
      },
    ];
  }

  @Get('thresholds')
  async getThresholds() {
    return {
      minTutorsForGeo: 3,
      minProfileCompleteness: 80,
      maxDuplicationScore: 20,
    };
  }

  @Patch('thresholds')
  async updateThresholds(@Body() data: any) {
    return { status: 'success', data };
  }
}
