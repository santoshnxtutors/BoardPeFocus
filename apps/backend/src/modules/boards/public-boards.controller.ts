import { Controller, Get, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('public/boards')
export class PublicBoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll() {
    return this.boardsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.boardsService.findBySlug(slug);
  }
}
