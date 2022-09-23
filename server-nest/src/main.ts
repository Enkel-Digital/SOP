import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,

    // By default, if any error happens while creating the application your app will exit with the code 1.
    // Uncomment this if you want to make it throw an error instead of exiting.
    // { abortOnError: false },
  );

  await app
    // Bind ValidationPipe at the application level to ensure all endpoints will not receive incorrect data.
    .useGlobalPipes(
      new ValidationPipe({
        // This ensures that any property not included in the DTO is automatically stripped.
        whitelist: true,

        // This ensures any non whitelisted property will cause the server to return an error response.
        // This works in conjunction with the `whitelist` property
        forbidNonWhitelisted: true,

        // Transform payloads to be objects typed according to their DTO classes automatically
        transform: true,
      }),
    )
    .listen(3000);
}
bootstrap();
