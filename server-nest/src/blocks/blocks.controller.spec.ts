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
    // The mock `block` object to be returned from the mock service
    const block: Block = {
      id: 'SOP-cs9lri8508001ocjv9c44oxz5',
      type: 'SOP',
      parentID: null,
      properties: {
        title: 'My SOP',
      },

      // Note that although these are defined as date types, it will be
      // converted to a date string after JSON stringification, which
      // is why this uses 2 random Date objects rather than string.
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock the `create` method to just return the fake `block` object directly
    jest.spyOn(service, 'create').mockImplementation(async () => block);

    // The mock DTO to pass into the controller
    const createBlockDto = {
      type: 'SOP',
      properties: {
        title: 'My SOP',
      },
    };

    expect(await controller.create(createBlockDto)).toBe(block);
  });
});
