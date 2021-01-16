import { Injectable } from '@nestjs/common';
import { Coordinates } from 'src/target/models/coordinates';
import { Protocol } from 'src/target/models/protocol.enum';
import { Scan } from 'src/target/models/scan';

@Injectable()
export class TargetService {
  nextTarget(protocols: Protocol[], scans: Scan[]): Coordinates {
    return scans?.[0]?.coordinates;
  }
}
