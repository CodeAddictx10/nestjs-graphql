import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RecordNotFoundFilter } from './core/filters/record-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  app.useGlobalFilters(new RecordNotFoundFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('PORT') ?? 3000);
}

void bootstrap();
