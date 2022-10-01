import { Test, TestingModule } from '@nestjs/testing';
import { BlocksService } from './blocks.service';

describe('BlocksService', () => {
  let service: BlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlocksService],
    }).compile();

    service = module.get<BlocksService>(BlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a new block', async () => {
    // The mock DTO passed to the service method
    const createBlockDto = {
      type: 'SOP',
      properties: {
        title: 'My SOP',
      },
    };

    expect(await service.create(createBlockDto)).toEqual({
      // Sample ID:  SOP-cs9lri8508001ocjv9c44oxz5
      id: expect.stringMatching(/SOP-c\w+/),

      type: 'SOP',
      parentID: null,
      properties: {
        title: 'My SOP',
      },

      // Note that although these are defined as date types, it will be
      // converted to a date string after JSON stringification and thats
      // whats seen by the client. Which is why this expects Date objects
      // rather than string since this is before the JSON.stringify()
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
