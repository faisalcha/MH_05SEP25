import { Body, Controller, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { AuthGuard } from '../auth';

@Controller('v1/workers')
export class WorkersController {
  constructor(private prisma: PrismaService) {}

  @Patch('me/availability')
  @UseGuards(AuthGuard)
  setAvail(@Req() req, @Body() dto: { isAvailable: boolean }) {
    return this.prisma.workerProfile.update({
      where: { userId: req.userId || 'EMP' },
      data: { isAvailable: dto.isAvailable, lastSeenAt: new Date() }
    });
  }

  @Patch('me/location')
  @UseGuards(AuthGuard)
  setLoc(@Req() req, @Body() dto: { lat: number; lon: number }) {
    return this.prisma.workerProfile.update({
      where: { userId: req.userId || 'EMP' },
      data: { lat: dto.lat, lon: dto.lon, lastSeenAt: new Date() }
    });
  }

  @Get('shortlist')
  @UseGuards(AuthGuard)
  async shortlist(@Query('lat') lat: string, @Query('lon') lon: string, @Query('meters') meters = '5000') {
    const latN = parseFloat(lat), lonN = parseFloat(lon), mN = parseFloat(meters);
    const rows = await this.prisma.$queryRawUnsafe(`
      SELECT u.id as user_id, u.name, w.skills, w.lat, w.lon,
        ST_Distance(w.location, ST_MakePoint(${lonN}, ${latN})::geography) AS meters
      FROM "WorkerProfile" w
      JOIN "User" u ON u.id = w."userId"
      WHERE w."isAvailable" = true
        AND w."lastSeenAt" > now() - interval '15 minutes'
        AND w.location IS NOT NULL
        AND ST_DWithin(w.location, ST_MakePoint(${lonN}, ${latN})::geography, ${mN})
      ORDER BY meters ASC
      LIMIT 100;
    `);
    return rows;
  }
}
