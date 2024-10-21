import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger();
  const port = envs.port;

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  app.setGlobalPrefix('api', {
    //This exclusion helps to avoid seeting the prefix /api with the @Get method, so in the end you jus do: localhost:3000 instead of localhost3000/api    exclude: 
    exclude: [{
      path: '',
      method: RequestMethod.GET,
    }]
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  

  await app.listen(port);


  console.log('Health Check Configured');
  

  logger.verbose(`Client Gateway running on port: ${port}`);
}
bootstrap();
