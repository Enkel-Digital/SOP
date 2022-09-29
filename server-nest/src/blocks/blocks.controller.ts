import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksService.getBlockAndChildren(id);
  }

  @Delete(':id')
  deleteBlock(@Param('id') id: string) {
    return this.blocksService.deleteBlock(id);
  }
}
