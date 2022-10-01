import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe.skip('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return the correct API version', () => {
    // @todo Get the last git commit hash to test it
    expect(appController.version()).toBe('');
  });
});
