import { Test, TestingModule } from '@nestjs/testing';
import { BlocksController } from './blocks.controller';
import { BlocksService } from './blocks.service';
import { PrismaService } from '../providers/prisma.service';

import type { block as Block } from '@prisma/client';

describe('BlocksController', () => {
  let controller: BlocksController;
  let service: BlocksService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BlocksController],
      providers: [BlocksService, PrismaService],
    }).compile();

    service = moduleRef.get<BlocksService>(BlocksService);
    controller = moduleRef.get<BlocksController>(BlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to save a new block', async () => {
    const block: Block = {
      id: 'SOP-cs9lri8508001ocjv9c44oxz5',
      type: 'SOP',
      parentID: null,
      properties: {
        title: 'My SOP',
      },

      // @todo To use string dates instead
      // createdAt: '2022-10-01T04:25:57.520Z',
      // updatedAt: '2022-10-01T04:25:57.522Z',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createBlockDto = {
      type: 'SOP',
      properties: {
        title: 'My SOP',
      },
    };

    jest
      .spyOn(service, 'create')
      .mockImplementation(async (_createBlockDto) => block);

    expect(await service.create(createBlockDto)).toBe(block);
  });
});
