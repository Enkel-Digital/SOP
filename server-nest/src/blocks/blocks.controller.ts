import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
// import { UpdateBlockDto } from './dto/update-block.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @Get(':id')
  getBlocks(@Param('id') id: string) {
    return this.blocksService.getBlockAndChildren(id);
  }

  // @todo Is an update API needed or just delete and create a new one?
  // @todo Because without an update API, the updatedAt time stamp in the DB can be removed too
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
  //   return this.blocksService.update(id, updateBlockDto);
  // }

  @Delete(':id')
  deleteBlock(@Param('id') id: string) {
    return this.blocksService.deleteBlock(id);
  }
}
