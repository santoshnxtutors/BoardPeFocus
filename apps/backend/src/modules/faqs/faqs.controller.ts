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
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  findAll() {
    return this.faqsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'EDITOR')
  @Post()
  @ApiOperation({ summary: 'Create a new FAQ' })
  create(@Body() data: any) {
    return this.faqsService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'EDITOR')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an FAQ' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.faqsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'EDITOR')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an FAQ' })
  remove(@Param('id') id: string) {
    return this.faqsService.remove(id);
  }
}
