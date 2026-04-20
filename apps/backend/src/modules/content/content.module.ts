import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { ContentService } from './content.service';
import { PublicContentController } from './public-content.controller';

@Module({
  controllers: [PublicContentController],
  providers: [ContentService, PrismaService],
})
export class ContentModule {}
