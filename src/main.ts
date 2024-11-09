import { readFileSync } from 'node:fs';
import { resolve as pathResolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { parse as parseYAML } from 'yaml';
import { AppModule } from './app/app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const file = readFileSync(pathResolve('./doc/api.yaml'), 'utf8');
  const document = parseYAML(file);
  SwaggerModule.setup('/api', app, document);

  await app.listen(PORT, () =>
    console.log(`Server has been started on port: ${PORT}`),
  );
}

bootstrap();
