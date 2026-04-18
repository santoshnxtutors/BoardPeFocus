import { Controller, Get, Query, Param } from '@nestjs/common';
import { TutorsService } from './tutors.service';

@Controller('v1/tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.tutorsService.findAll(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.tutorsService.findOne(slug);
  }
}
