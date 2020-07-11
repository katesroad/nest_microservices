import { Controller, Logger } from "@nestjs/common";
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext
} from "@nestjs/microservices";

@Controller()
export class AppController {
  private logger = new Logger("AppController");

  @MessagePattern("balance")
  getHello(@Payload() data: number[], @Ctx() context: RmqContext) {
    this.logger.log(data);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log(channel, originalMsg);

    return data;
  }
}
