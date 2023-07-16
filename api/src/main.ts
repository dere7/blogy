import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { config, options } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('/api');

  SwaggerModule.setup(
    '/doc',
    app,
    SwaggerModule.createDocument(app, config),
    options,
  );

  await app.listen(3000);
  console.log('Server is started successfully', await app.getUrl());
}
bootstrap();
