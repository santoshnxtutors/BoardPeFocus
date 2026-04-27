import { Body, Controller, Post } from '@nestjs/common';
import { CreateTutorApplicationDto } from '../dto/create-tutor-application.dto';
import { TutorApplicationsService } from '../tutor-applications.service';

@Controller('public/tutor-applications')
export class PublicTutorApplicationsController {
  constructor(
    private readonly tutorApplicationsService: TutorApplicationsService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTutorApplicationDto) {
    const application = await this.tutorApplicationsService.create(dto);
    return {
      success: true,
      id: application.id,
      status: application.status,
    };
  }
}
