import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Lead, LeadStatus } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        ...dto,
        status: 'NEW',
      },
    });

    this.logger.log(`New lead created: ${lead.id}`);

    // Trigger notification (async)
    void this.triggerNotification(lead);

    return lead;
  }

  async findAll() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.lead.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: LeadStatus) {
    return this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }

  private async triggerNotification(lead: Lead) {
    try {
      const adminPhone = this.configService.get<string>('ADMIN_PHONE_NUMBER');
      if (!adminPhone) {
        this.logger.warn(
          `Skipping lead notification for ${lead.id} because ADMIN_PHONE_NUMBER is not configured.`,
        );
        return;
      }

      // Persist outbound notification intent until the delivery layer is wired in.
      await this.prisma.notificationDelivery.create({
        data: {
          type: 'WHATSAPP',
          recipient: adminPhone,
          subject: `New lead: ${lead.name}`,
          content: JSON.stringify({
            leadId: lead.id,
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            board: lead.board,
            subject: lead.subject,
            location: lead.location,
            createdAt: lead.createdAt.toISOString(),
          }),
          status: 'PENDING',
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to trigger notification for lead ${lead.id}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}
