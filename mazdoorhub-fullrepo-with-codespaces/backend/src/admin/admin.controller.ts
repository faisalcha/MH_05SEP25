import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Controller('v1/admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get('workers')
  list() { return this.prisma.workerProfile.findMany({ where: { kycStatus: 'PENDING' }, include: { user: true } }); }

  @Post('workers/:id/verify')
  verify(@Param('id') id: string, @Body() body: { approve: boolean }) {
    return this.prisma.workerProfile.update({ where: { id }, data: { kycStatus: body.approve ? 'VERIFIED' : 'REJECTED' } });
  }
}
