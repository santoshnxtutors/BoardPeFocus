import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminTutorApplicationsController } from './controllers/admin-tutor-applications.controller';
import { PublicTutorApplicationsController } from './controllers/public-tutor-applications.controller';
import { TutorApplicationsService } from './tutor-applications.service';

@Module({
  imports: [AuthModule],
  controllers: [
    PublicTutorApplicationsController,
    AdminTutorApplicationsController,
  ],
  providers: [TutorApplicationsService],
  exports: [TutorApplicationsService],
})
export class TutorApplicationsModule {}
