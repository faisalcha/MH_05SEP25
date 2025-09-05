import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { PrismaService } from '../db/prisma.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({ imports: [PaymentsModule], controllers: [JobsController], providers: [PrismaService] })
export class JobsModule {}
