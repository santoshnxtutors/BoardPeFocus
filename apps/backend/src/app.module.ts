import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './common/database/prisma.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContentModule } from './modules/content/content.module';
import { HealthController } from './modules/health/health.controller';

// Leads
import { LeadsService } from './modules/leads/leads.service';
import { PublicLeadsController } from './modules/leads/controllers/public-leads.controller';

// Tutors
import { TutorsModule } from './modules/tutors/tutors.module';

// Search
import { SearchService } from './modules/search/search.service';
import { PublicSearchController } from './modules/search/public-search.controller';

// Boards
import { BoardsService } from './modules/boards/boards.service';
import { PublicBoardsController } from './modules/boards/public-boards.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminModule,
    ContentModule,
    TutorsModule,
  ],
  controllers: [
    HealthController,
    PublicLeadsController,
    PublicSearchController,
    PublicBoardsController,
  ],
  providers: [PrismaService, LeadsService, SearchService, BoardsService],
})
export class AppModule {}
