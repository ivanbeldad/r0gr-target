import { Controller, Get } from '@nestjs/common';

@Controller('/healthz')
export class HealthController {
  @Get()
  health(): { status: string } {
    return { status: 'ok' };
  }
}
