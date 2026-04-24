import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { PublicContentController } from './public-content.controller';

@Module({
  controllers: [PublicContentController],
  providers: [ContentService],
})
export class ContentModule {}
