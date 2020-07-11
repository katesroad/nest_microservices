import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.setAddressBalanceToUpdate({
      address: '0x53781221c8a0b40d0f7d9b52a75409dbeffda634',
      asset:
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      type: 'balance',
    });
  }
}
