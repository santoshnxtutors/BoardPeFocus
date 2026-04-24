import {
  Controller,
  Get,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    return this.readiness();
  }

  @Get('live')
  live() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  async readiness() {
    const timestamp = new Date().toISOString();

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        database: 'connected',
        timestamp,
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'disconnected',
        timestamp,
      });
    }
  }
}
