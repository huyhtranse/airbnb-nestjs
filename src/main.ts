import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('NestJS Airbnb Project')
    .setDescription('This Airbnb API Project')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('User')
    .addTag('Room')
    .addTag('Location')
    .addTag('Booking')
    .addTag('Review')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(express.static('.'));

  await app.listen(8080, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
