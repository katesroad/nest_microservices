import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  logMsg(msg) {
    console.log(JSON.stringify(msg));
  }
}
