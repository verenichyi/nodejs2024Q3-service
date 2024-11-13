import { readFileSync } from 'node:fs';
import { resolve as pathResolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { parse as parseYAML } from 'yaml';
import { AppModule } from './app/app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggingService } from './logging/logging.service';
import { ExceptionFilter } from './exceptions/exception.filter';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggingService);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());

  const file = readFileSync(pathResolve('./doc/api.yaml'), 'utf8');
  const document = parseYAML(file);
  SwaggerModule.setup('/api', app, document);

  await app.listen(PORT, () =>
    console.log(`Server has been started on port: ${PORT}`),
  );
}

bootstrap();
