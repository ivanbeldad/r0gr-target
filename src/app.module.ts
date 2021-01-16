import { Module } from '@nestjs/common';
import { PrioritizerDefinition } from 'src/target/prioritizers/prioritizer-definition';
import { TargetService } from 'src/target/target.service';
import { RadarController } from './target/radar.controller';

@Module({
  imports: [],
  controllers: [RadarController],
  providers: [TargetService, PrioritizerDefinition],
})
export class AppModule {}
