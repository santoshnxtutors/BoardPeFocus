import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class PublicContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('boards')
  boards() {
    return this.contentService.listBoards();
  }

  @Get('boards/:slug')
  board(@Param('slug') slug: string) {
    return this.contentService.getBoard(slug);
  }

  @Get('classes')
  classes() {
    return this.contentService.listClasses();
  }

  @Get('classes/:slug')
  classLevel(@Param('slug') slug: string) {
    return this.contentService.getClass(slug);
  }

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

  @Get('sectors')
  sectors() {
    return this.contentService.listSectors();
  }

  @Get('sectors/:slug')
  sector(@Param('slug') slug: string) {
    return this.contentService.getSector(slug);
  }

  @Get('societies')
  societies() {
    return this.contentService.listSocieties();
  }

  @Get('societies/:slug')
  society(@Param('slug') slug: string) {
    return this.contentService.getSociety(slug);
  }

  @Get('subjects')
  subjects() {
    return this.contentService.listSubjects();
  }

  @Get('subjects/:slug')
  subject(@Param('slug') slug: string) {
    return this.contentService.getSubject(slug);
  }

  @Get('resources')
  resources(@Query('category') category?: string) {
    return this.contentService.listResources(category);
  }

  @Get('resources/:slug')
  resource(@Param('slug') slug: string) {
    return this.contentService.getResource(slug);
  }

  @Get('process-content')
  processContent() {
    return this.contentService.listProcessContent();
  }

  @Get('process-content/:slug')
  processContentBySlug(@Param('slug') slug: string) {
    return this.contentService.getProcessContent(slug);
  }

  @Get('faqs')
  faqs(
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
    @Query('pageSlug') pageSlug?: string,
  ) {
    return this.contentService.listFaqs({ entityType, entityId, pageSlug });
  }

  @Get('reviews')
  reviews() {
    return this.contentService.listReviews();
  }

  @Get('pages')
  page(@Query('slug') slug?: string) {
    return this.contentService.getPageBySlug(slug);
  }

  @Get('redirects')
  redirect(@Query('from') from?: string) {
    return this.contentService.getRedirect(from);
  }
}
