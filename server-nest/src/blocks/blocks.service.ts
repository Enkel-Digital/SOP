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
        id: createBlockDto.type + '-' + cuid(),
        type: createBlockDto.type as block_type,
        properties: createBlockDto.properties,
        parentID: createBlockDto.parent,
      },
    });
  }

  /**
   * Get the requested block and its child blocks back in one single Blocks map
   */
  async getBlockAndChildren(id: string): Promise<{ [key: number]: Block }> {
    const block = await this.prisma.block.findUnique({ where: { id } });
    if (block === null)
      throw new HttpException(`Invalid block ID '${id}'`, HttpStatus.NOT_FOUND);

    // Get the child blocks that have the original block's block ID as their parent field
    const children = await this.prisma.block.findMany({
      where: { parentID: block.id },
    });

    const blocks = children.reduce(
      (blocks, block) => ((blocks[block.id] = block), blocks),
      {} as { [key: string]: Block },
    );

    // Add the original block into the map
    blocks[block.id] = block;

    return blocks;
  }

  async update(id: number, updateBlockDto: UpdateBlockDto): Promise<void> {
    console.log(`This action updates a #${id} block`);
  }

  /**
   * Delete a block without returning anything
   */
  async deleteBlock(id: string): Promise<void> {
    await this.prisma.block.delete({ where: { id } });
  }
}
