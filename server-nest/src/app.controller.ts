import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EnvironmentVariables } from './config/types';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  @Get()
  home(): string {
    return '<a href="https://github.com/Enkel-Digital/SOP">SOP</a> API service';
  }

  /**
   * Read version info from env var which should just be the git commit hash
   */
  @Get('version')
  version(): string {
    return this.configService.get<string>('version', { infer: true });
  }
}
