import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { dbProvider } from './providers/database.provider';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      // From NestJS docs: Accessing process.env can be slow, caching it can increase
      // the performance of the `ConfigService.get` method when it comes to variables
      // stored in process.env
      cache: true,

      // Use Joi to ensure that all environment variables are required and defined
      validationSchema: Joi.object({
        // Expect version to be the git commit hash
        version: Joi.string().required(),
      }),

      // Strict Joi validation options
      // allowUnknown: false -> Do not allow unknown keys in the environment variables
      // abortEarly: false -> Continue validation on first error to get all errors
      // validationOptions: { allowUnknown: false, abortEarly: false },
    }),
  ],

  controllers: [AppController],

  providers: [
    // Use the dbProvider to inject the DB globally, so all services can get
    // the database injected to them rather than loading it seperately.
    dbProvider,
  ],
})
export class AppModule {}
