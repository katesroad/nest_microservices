import {
  Server,
  CustomTransportStrategy,
  MessageHandler,
} from '@nestjs/microservices';
import { EMPTY, Observable } from 'rxjs';
import Web3 from 'web3/types';


export class Web3Server extends Server implements CustomTransportStrategy {
  private subscription: any;
  private wssUrl: string;

  constructor(wssUrl: string) {
    super();
    this.wssUrl = wssUrl;
  }

  public async listen(cb: () => void) {
    await this.init();
    cb();
  }

  public close(): void {
    this.subscription.unsubscribe();
  }

  private call(pattern: string, data: any): Promise<Observable<any>> {
    const handler: MessageHandler | undefined = this.messageHandlers.get(
      pattern,
    );

    if (!handler) return Promise.resolve(EMPTY);

    return handler(data);
  }

  private async init() {
    const provider = new Web3.providers.WebsocketProvider(this.wssUrl);
    const web3 = new Web3(provider);
    this.subscription = web3.eth.subscribe(
      'newBlockHeaders',
      (error: Error, blockHeader: any) => {
        if (error) {
          this.logger.error(JSON.stringify(error));
          return;
        }
        web3.eth
          .getBlock(blockHeader.number)
          .then(async (block: any) => this.call('network:block', block));
      },
    );
  }
}
