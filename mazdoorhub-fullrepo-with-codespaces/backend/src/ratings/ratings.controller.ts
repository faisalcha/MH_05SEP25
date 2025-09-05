import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { AuthGuard } from '../auth';

@Controller('v1/ratings')
export class RatingsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() dto: { jobId: string; rateeId: string; stars: number; comment?: string }) {
    return this.prisma.rating.create({ data: { raterId: req.userId || 'EMP', rateeId: dto.rateeId, jobId: dto.jobId, stars: dto.stars, comment: dto.comment || '' } });
  }

  @Get('/users/:id/summary')
  summary(@Param('id') id: string) {
    return this.prisma.rating.aggregate({ _avg: { stars: true }, _count: { _all: true }, where: { rateeId: id } });
  }
}
