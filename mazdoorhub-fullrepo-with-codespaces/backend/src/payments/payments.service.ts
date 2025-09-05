import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private db: PrismaService) {}

  async initiate(dto: { jobId: string; amountPkr: number; method: 'jazzcash'|'easypaisa' }, employerId: string) {
    const job = await this.db.job.findFirst({ where: { id: dto.jobId } });
    if (!job) throw new ForbiddenException('Job not found');
    await this.db.job.update({ where: { id: job.id }, data: { escrowAmountPkr: dto.amountPkr, escrowStatus: 'hold', paymentMethod: dto.method } });
    return { provider: dto.method, jobId: job.id, amountPkr: dto.amountPkr, redirectUrl: 'https://sandbox.provider/redirect' };
  }

  async handleWebhook(provider: 'jazzcash'|'easypaisa', signature: string, body: any) {
    const secret = process.env.WEBHOOK_SECRET || 'devsecret';
    const computed = crypto.createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex');
    if (signature !== computed) throw new BadRequestException('Invalid signature');
    return { ok: true, provider };
  }
}
