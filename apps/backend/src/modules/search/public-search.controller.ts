import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('public/search')
export class PublicSearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('q') query: string) {
    return this.searchService.globalSearch(query);
  }
}
