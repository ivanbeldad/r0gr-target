import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/healthz')
  health(): { status: string } {
    return { status: 'ok' };
  }
}
