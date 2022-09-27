/**
 * @module prisma database provider
 *
 * Reference: https://docs.nestjs.com/recipes/prisma
 */

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * This `onModuleInit` method is optional to implement.
   * If not defined, Prisma will connect lazily on its first call to the database.
   * However it is implemented here to ensure that the service can connect to the DB on startup.
   */
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
