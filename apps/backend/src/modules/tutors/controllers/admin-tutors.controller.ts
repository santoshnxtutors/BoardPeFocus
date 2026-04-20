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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Admin Tutors')
@UseGuards(JwtAuthGuard)
@Controller('admin/tutors')
export class AdminTutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tutors (admin)' })
  findAll() {
    return this.tutorsService.findAllPublic({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one tutor (admin)' })
  findOne(@Param('id') id: string) {
    return this.tutorsService.findOneAdmin(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new tutor' })
  create(@Body() data: any) {
    return this.tutorsService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tutor' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.tutorsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tutor' })
  remove(@Param('id') id: string) {
    return this.tutorsService.remove(id);
  }
}
