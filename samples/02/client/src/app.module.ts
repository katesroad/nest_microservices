import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const SERVICE_NAME = '';
const url = '';
const queue = '';

@Module({
  imports: [
    ClientsModule.register([{
      name: SERVICE_NAME,
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue,
        queueOptions: {
          durable: true,
          noAck: false,
          prefetchCount: 1
        },
      },
    },])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
