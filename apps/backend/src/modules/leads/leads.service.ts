import { Injectable, Logger } from '@nestjs/common';
import { Lead, LeadStatus } from '@boardpefocus/database';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        ...dto,
        status: 'NEW',
      },
    });

    this.logger.log(`New lead created: ${lead.id} from ${lead.name}`);

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
      // Persist outbound notification intent until the delivery layer is wired in.
      await this.prisma.notificationDelivery.create({
        data: {
          type: 'WHATSAPP',
          recipient: process.env.ADMIN_PHONE_NUMBER ?? lead.phone,
          subject: `New lead: ${lead.name}`,
          content: JSON.stringify(lead),
          status: 'PENDING',
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to trigger notification for lead ${lead.id}`,
        error,
      );
    }
  }
}
