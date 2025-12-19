import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return { message: 'API is running', health: '/health' };
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
