import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { PrismaService } from '../../common/database/prisma.service';

@Module({
  controllers: [FaqsController],
  providers: [FaqsService, PrismaService],
  exports: [FaqsService],
})
export class FaqsModule {}
