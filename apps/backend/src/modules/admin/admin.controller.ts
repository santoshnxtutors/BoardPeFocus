import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LeadStatus } from '@boardpefocus/database';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats/overview')
  statsOverview() {
    return this.adminService.getStatsOverview();
  }

  @Get('leads')
  leads() {
    return this.adminService.listLeads();
  }

  @Patch('leads/:id/status')
  updateLeadStatus(
    @Param('id') id: string,
    @Body('status') status: LeadStatus,
  ) {
    return this.adminService.updateLeadStatus(id, status);
  }

  @Get('boards')
  boards() {
    return this.adminService.listBoards();
  }

  @Get('schools')
  schools() {
    return this.adminService.listSchools();
  }

  @Get('pages')
  pages() {
    return this.adminService.listPages();
  }

  @Get('page-generator/jobs')
  async pageGeneratorJobs() {
    const jobs = await this.adminService.listGenerationJobs();
    return jobs.map((job) => ({
      id: job.id,
      type: job.type,
      status: job.status,
      pages: Array.isArray(job.results) ? job.results.length : 0,
      issues: job.issues.length,
      date: job.createdAt.toISOString(),
      progress: job.progress,
    }));
  }

  @Post('page-generator/trigger')
  async triggerPageGeneration(@Body('type') type: string) {
    const job = await this.adminService.triggerGeneration(type);
    return {
      status: 'queued',
      id: job.id,
      type: job.type,
    };
  }

  @Get('page-generator/thresholds')
  pageGeneratorThresholds() {
    return this.adminService.getGenerationThresholds();
  }

  @Patch('page-generator/thresholds')
  updatePageGeneratorThresholds(@Body() data: Record<string, unknown>) {
    return this.adminService.updateGenerationThresholds(data);
  }
}
