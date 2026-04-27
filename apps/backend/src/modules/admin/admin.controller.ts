import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { TriggerGenerationDto } from './dto/trigger-generation.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';

const ADMIN_ROLES = ['SUPERADMIN', 'EDITOR'];

interface AuthenticatedRequest {
  user: {
    userId: string;
  };
}

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

  @Get('users')
  @Roles('SUPERADMIN')
  users() {
    return this.adminService.listUsers();
  }

  @Post('users')
  @Roles('SUPERADMIN')
  createUser(@Body() dto: CreateAdminUserDto) {
    return this.adminService.createUser(dto);
  }

  @Patch('users/:id')
  @Roles('SUPERADMIN')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateAdminUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminService.updateUser(id, dto, req.user.userId);
  }

  @Delete('users/:id')
  @Roles('SUPERADMIN')
  deleteUser(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.adminService.deleteUser(id, req.user.userId);
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

  @Post('pages')
  createPage(@Body() data: Record<string, unknown>) {
    return this.adminService.createPage(data);
  }

  @Get('pages/:id')
  page(@Param('id') id: string) {
    return this.adminService.getPage(id);
  }

  @Patch('pages/:id')
  updatePage(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    return this.adminService.updatePage(id, data);
  }

  @Delete('pages/:id')
  archivePage(@Param('id') id: string) {
    return this.adminService.archivePage(id);
  }

  @Get('seo')
  seoMetadata() {
    return this.adminService.listSeoMetadata();
  }

  @Patch('seo/:targetType/:id')
  updateSeoMetadata(
    @Param('targetType') targetType: string,
    @Param('id') id: string,
    @Body() data: Record<string, unknown>,
  ) {
    return this.adminService.updateSeoMetadata(targetType, id, data);
  }

  @Get('redirects')
  redirects() {
    return this.adminService.listRedirects();
  }

  @Post('redirects')
  createRedirect(@Body() data: Record<string, unknown>) {
    return this.adminService.createRedirect(data);
  }

  @Patch('redirects/:id')
  updateRedirect(
    @Param('id') id: string,
    @Body() data: Record<string, unknown>,
  ) {
    return this.adminService.updateRedirect(id, data);
  }

  @Delete('redirects/:id')
  archiveRedirect(@Param('id') id: string) {
    return this.adminService.archiveRedirect(id);
  }

  @Get('media')
  media(@Query('q') query?: string) {
    return this.adminService.listMedia(query);
  }

  @Post('media')
  createMedia(@Body() data: Record<string, unknown>) {
    return this.adminService.createMedia(data);
  }

  @Patch('media/:id')
  updateMedia(
    @Param('id') id: string,
    @Body() data: Record<string, unknown>,
  ) {
    return this.adminService.updateMedia(id, data);
  }

  @Delete('media/:id')
  deleteMedia(@Param('id') id: string) {
    return this.adminService.deleteMedia(id);
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
