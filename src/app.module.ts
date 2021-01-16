import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HealthController } from 'src/health/health.controller';
import { LoggerMiddleware } from 'src/logger.middleware';
import { PrioritizerDefinition } from 'src/target/prioritizers/prioritizer-definition';
import { PrioritizerService } from 'src/target/prioritizers/prioritizer.service';
import { TargetService } from 'src/target/target.service';
import { RadarController } from './target/radar.controller';

@Module({
  imports: [],
  controllers: [RadarController, HealthController],
  providers: [TargetService, PrioritizerDefinition, PrioritizerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
