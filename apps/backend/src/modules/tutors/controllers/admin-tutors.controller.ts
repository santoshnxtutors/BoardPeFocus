import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TutorsService } from '../tutors.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { UpdateTutorDto } from '../dto/update-tutor.dto';

const ADMIN_ROLES = ['SUPERADMIN', 'EDITOR'];

@ApiTags('Admin Tutors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...ADMIN_ROLES)
@Controller('admin/tutors')
export class AdminTutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tutors (admin)' })
  findAll() {
    return this.tutorsService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one tutor (admin)' })
  findOne(@Param('id') id: string) {
    return this.tutorsService.findOneAdmin(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new tutor' })
  create(@Body() data: CreateTutorDto) {
    return this.tutorsService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tutor' })
  update(@Param('id') id: string, @Body() data: UpdateTutorDto) {
    return this.tutorsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tutor' })
  remove(@Param('id') id: string) {
    return this.tutorsService.remove(id);
  }
}
