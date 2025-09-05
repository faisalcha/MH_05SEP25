import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { PrismaService } from '../db/prisma.service';

@Module({ controllers: [WorkersController], providers: [PrismaService] })
export class WorkersModule {}
