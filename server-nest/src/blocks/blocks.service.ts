import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';

import { PrismaService } from '../providers/prisma.service';
import type { block as Block, block_type } from '@prisma/client';

import * as cuid from 'cuid';

@Injectable()
export class BlocksService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new block, save to DB and get back full block data.
   */
  create(createBlockDto: CreateBlockDto): Promise<Block> {
    return this.prisma.block.create({
      data: {
        type: createBlockDto.type as block_type,
        blockID: createBlockDto.type + '-' + cuid(),
        properties: createBlockDto.properties,
        parentID: createBlockDto.parent,
      },
    });
  }

  /**
   * Get the requested block and its child blocks back in one single Blocks map
   */
  async getBlockAndChildren(id: number): Promise<any> {
  }

  async update(id: number, updateBlockDto: UpdateBlockDto): Promise<void> {
    console.log(`This action updates a #${id} block`);
  }

  async deleteBlock(id: number): Promise<void> {
  }
}