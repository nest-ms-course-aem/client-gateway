import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger();
  const port = envs.port;

  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api');

  await app.listen(port);

  logger.verbose(`Client Gateway running on port: ${port}`);
}
bootstrap();
