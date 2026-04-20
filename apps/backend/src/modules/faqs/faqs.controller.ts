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
import { FaqsService } from './faqs.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('FAQs')
@Controller('v1/faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  findAll() {
    return this.faqsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new FAQ' })
  create(@Body() data: any) {
    return this.faqsService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an FAQ' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.faqsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an FAQ' })
  remove(@Param('id') id: string) {
    return this.faqsService.remove(id);
  }
}
