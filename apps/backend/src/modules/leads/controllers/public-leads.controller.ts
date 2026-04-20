import { Controller, Post, Body } from '@nestjs/common';
import { LeadsService } from '../leads.service';
import { CreateLeadDto } from '../dto/create-lead.dto';

@Controller('public/leads')
export class PublicLeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }
}
