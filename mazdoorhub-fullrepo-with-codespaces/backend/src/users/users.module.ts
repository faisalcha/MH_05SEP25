import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '../db/prisma.service';

@Module({ controllers: [UsersController], providers: [PrismaService] })
export class UsersModule {}
