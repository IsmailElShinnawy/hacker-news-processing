import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { STORIES_CREATED_EVENT } from './constants';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(STORIES_CREATED_EVENT)
  test(...data: Array<any>) {
    console.log(data);
  }
}
