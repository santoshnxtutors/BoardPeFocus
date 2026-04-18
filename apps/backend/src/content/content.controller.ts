import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('v1/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('boards')
  getBoards() {
    return this.contentService.getBoards();
  }

  @Get('boards/:slug')
  getBoard(@Param('slug') slug: string) {
    return this.contentService.getBoardBySlug(slug);
  }

  @Get('schools')
  getSchools() {
    return this.contentService.getSchools();
  }

  @Get('schools/:slug')
  getSchool(@Param('slug') slug: string) {
    return this.contentService.getSchoolBySlug(slug);
  }

  @Get('locations')
  getLocations() {
    return this.contentService.getLocations();
  }

  @Get('locations/:slug')
  getLocation(@Param('slug') slug: string) {
    return this.contentService.getLocationBySlug(slug);
  }

  @Get('subjects')
  getSubjects() {
    return this.contentService.getSubjects();
  }
}
