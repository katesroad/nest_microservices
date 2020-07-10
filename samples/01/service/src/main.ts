import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Address Services');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8080
      }
    },
  );
  app.listen(() => {
    logger.log(`\n\n
      Serivces started...
    `);
  });
}
bootstrap();
