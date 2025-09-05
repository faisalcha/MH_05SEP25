import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { AuthGuard } from '../auth';

@Controller('v1/users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req) {
    const phone = req.userPhone;
    const user = await this.prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone, role: 'EMPLOYER' }
    });
    return user;
  }
}
