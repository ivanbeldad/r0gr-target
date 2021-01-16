import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Coordinates } from 'src/target/models/coordinates';
import { RadarInput } from 'src/target/models/radar-input';
import { TargetService } from 'src/target/target.service';

@Controller('/radar')
export class RadarController {
  constructor(private targetService: TargetService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  nextTarget(@Body() radarInput: RadarInput): Coordinates {
    return this.targetService.nextTarget(radarInput.protocols, radarInput.scan);
  }
}
