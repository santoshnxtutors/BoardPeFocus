import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TutorApplicationStatus } from '@boardpefocus/database';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ConvertTutorApplicationDto } from '../dto/convert-tutor-application.dto';
import { UpdateTutorApplicationDto } from '../dto/update-tutor-application.dto';
import { TutorApplicationsService } from '../tutor-applications.service';

const ADMIN_ROLES = ['SUPERADMIN', 'EDITOR'];

@ApiTags('Admin Tutor Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...ADMIN_ROLES)
@Controller('admin/tutor-applications')
export class AdminTutorApplicationsController {
  constructor(
    private readonly tutorApplicationsService: TutorApplicationsService,
  ) {}

  @Get()
  findAll(@Query('status') status?: TutorApplicationStatus) {
    return this.tutorApplicationsService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorApplicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTutorApplicationDto) {
    return this.tutorApplicationsService.update(id, dto);
  }

  @Post(':id/convert')
  convert(@Param('id') id: string, @Body() dto: ConvertTutorApplicationDto) {
    return this.tutorApplicationsService.convertToTutor(id, dto);
  }
}
