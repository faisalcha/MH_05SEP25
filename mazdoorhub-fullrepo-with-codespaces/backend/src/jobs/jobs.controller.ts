import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { AuthGuard } from '../auth';
import { PaymentsService } from '../payments/payments.service';

@Controller('v1/jobs')
export class JobsController {
  constructor(private prisma: PrismaService, private payments: PaymentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() dto: { title: string; desc?: string; workerId?: string }) {
    return this.prisma.job.create({ data: { title: dto.title, desc: dto.desc || '', employerId: req.userId || 'EMP', workerId: dto.workerId || null } });
  }

  @Post(':id/complete')
  @UseGuards(AuthGuard)
  async complete(@Param('id') id: string) {
    return this.prisma.job.update({ where: { id }, data: { status: 'DONE' } });
  }

  @Post(':id/cash-paid')
  @UseGuards(AuthGuard)
  async cash(@Param('id') id: string, @Body() body: { amount: number }) {
    await this.prisma.walletLedger.create({ data: { userId: 'WORKER', jobId: id, type: 'ADJUST', amountPkr: body.amount } });
    return { ok: true };
  }
}
