import { Module } from '@nestjs/common';
import { PageGeneratorService } from './services/page-generator.service';
import { ScoringService } from './services/scoring.service';
import { LinkIntelligenceService } from './services/link-intelligence.service';
import { ContentAssemblerService } from './services/content-assembler.service';

import { PageGeneratorController } from './page-generator.controller';

@Module({
  controllers: [PageGeneratorController],
  providers: [
    PageGeneratorService,
    ScoringService,
    LinkIntelligenceService,
    ContentAssemblerService,
  ],
  exports: [PageGeneratorService],
})
export class PageGeneratorModule {}
