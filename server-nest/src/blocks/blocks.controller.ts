import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
    // https://stackoverflow.com/questions/6682997/what-is-the-purpose-of-a-plus-symbol-before-a-variable
    return this.blocksService.getBlockAndChildren(+id);
  }
}
