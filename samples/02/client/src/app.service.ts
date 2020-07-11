import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.interface';

@Injectable()
export class AppService {
  private logger = new Logger('AppService');

  constructor(
    @Inject('ADDRESS_BALANCE_SERVICE') private readonly client: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  setAddressBalanceToUpdate(msg: Message) {
    return this.client.send('balance', JSON.stringify(msg));
  }
}
