import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

const logger = new Logger("Address  Balance Services");
const url = '';
const queue = '';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        url
      ],
      queue,
      queueOptions: {
        durable: true,
        noAck: false,
        prefetchCount: 1
      }
    }
  });
  app.listen(() => {
    logger.log(`Address balance service started...`);
  });
}
bootstrap();
