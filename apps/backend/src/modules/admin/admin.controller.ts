import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { TriggerGenerationDto } from './dto/trigger-generation.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';
import { UpdatePageDto } from './dto/update-page.dto';

const ADMIN_ROLES = ['SUPERADMIN', 'EDITOR'];

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...ADMIN_ROLES)
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
    @Body() dto: UpdateLeadStatusDto,
  ) {
    return this.adminService.updateLeadStatus(id, dto.status);
  }

  @Get('boards')
  boards() {
    return this.adminService.listBoards();
  }

  @Get('schools')
  schools() {
    return this.adminService.listSchools();
  }

  @Get('lookups')
  lookups() {
    return this.adminService.listLookups();
  }

  @Get('content/:entity')
  listContent(@Param('entity') entity: string) {
    return this.adminService.listContent(entity as any);
  }

  @Get('content/:entity/:id')
  getContent(@Param('entity') entity: string, @Param('id') id: string) {
    return this.adminService.getContent(entity as any, id);
  }

  @Post('content/:entity')
  createContent(@Param('entity') entity: string, @Body() data: Record<string, unknown>) {
    return this.adminService.createContent(entity as any, data);
  }

  @Patch('content/:entity/:id')
  updateContent(
    @Param('entity') entity: string,
    @Param('id') id: string,
    @Body() data: Record<string, unknown>,
  ) {
    return this.adminService.updateContent(entity as any, id, data);
  }

  @Delete('content/:entity/:id')
  archiveContent(@Param('entity') entity: string, @Param('id') id: string) {
    return this.adminService.archiveContent(entity as any, id);
  }

  @Get('pages')
  pages() {
    return this.adminService.listPages();
  }

  @Get('pages/:id')
  page(@Param('id') id: string) {
    return this.adminService.getPage(id);
  }

  @Patch('pages/:id')
  updatePage(@Param('id') id: string, @Body() dto: UpdatePageDto) {
    return this.adminService.updatePage(id, dto);
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
  async triggerPageGeneration(@Body() dto: TriggerGenerationDto) {
    const job = await this.adminService.triggerGeneration(dto.type);
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
