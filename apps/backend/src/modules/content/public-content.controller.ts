import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class PublicContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('schools')
  schools() {
    return this.contentService.listSchools();
  }

  @Get('schools/:slug')
  school(@Param('slug') slug: string) {
    return this.contentService.getSchool(slug);
  }

  @Get('locations')
  locations() {
    return this.contentService.listLocations();
  }

  @Get('locations/:slug')
  location(@Param('slug') slug: string) {
    return this.contentService.getLocation(slug);
  }

  @Get('subjects')
  subjects() {
    return this.contentService.listSubjects();
  }
}
