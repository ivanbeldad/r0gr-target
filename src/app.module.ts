import { Module } from '@nestjs/common';
import { TargetService } from 'src/target/target.service';
import { RadarController } from './target/radar.controller';

@Module({
  imports: [],
  controllers: [RadarController],
  providers: [TargetService],
})
export class AppModule {}
