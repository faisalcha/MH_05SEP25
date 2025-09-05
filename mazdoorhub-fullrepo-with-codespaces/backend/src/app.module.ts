import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './db/prisma.service';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import { JobsModule } from './jobs/jobs.module';
import { PaymentsModule } from './payments/payments.module';
import { RatingsModule } from './ratings/ratings.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, WorkersModule, JobsModule, PaymentsModule, RatingsModule, AdminModule],
  providers: [PrismaService],
})
export class AppModule {}
