import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { AuthModule } from '../auth/auth.module';
import { AdminTutorsController } from './controllers/admin-tutors.controller';
import { PublicTutorsController } from './controllers/public-tutors.controller';

@Module({
  imports: [AuthModule],
  controllers: [PublicTutorsController, AdminTutorsController],
  providers: [TutorsService],
  exports: [TutorsService],
})
export class TutorsModule {}
