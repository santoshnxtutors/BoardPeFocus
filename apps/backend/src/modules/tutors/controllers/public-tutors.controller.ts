import { Controller, Get, Param, Query } from '@nestjs/common';
import { TutorsService } from '../tutors.service';

interface TutorQuery {
  board?: string;
  subject?: string;
  location?: string;
  school?: string;
}

@Controller('public/tutors')
export class PublicTutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  async findAll(@Query() query: TutorQuery) {
    return this.tutorsService.findAllPublic(query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.tutorsService.findOneBySlug(slug);
  }
}
