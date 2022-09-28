import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { PrismaService } from '../providers/prisma.service';
import { BlocksController } from './blocks.controller';

@Module({
  controllers: [BlocksController],
  providers: [BlocksService, PrismaService],
})
export class BlocksModule {}
