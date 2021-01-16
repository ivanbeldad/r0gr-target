import { Injectable } from '@nestjs/common';
import { Coordinates } from 'src/target/models/coordinates';
import { Protocol } from 'src/target/models/protocol.enum';
import { Scan } from 'src/target/models/scan';
import { PrioritizerService } from 'src/target/prioritizers/prioritizer.service';

@Injectable()
export class TargetService {
  constructor(private prioritizerService: PrioritizerService) {}

  nextTarget(protocols: Protocol[], scans: Scan[]): Coordinates {
    const prioritizer = this.prioritizerService.getComposedPrioritizer(protocols);
    prioritizer.scans = scans;
    prioritizer.prioritize();
    return this.getNextTarget(prioritizer.scans)?.coordinates;
  }

  private getNextTarget(scans: Scan[]): Scan {
    return scans.filter(this.discardUseless).sort(this.compareByScore)?.[0];
  }

  private discardUseless(scan: Scan): boolean {
    return scan.score !== -Infinity;
  }

  private compareByScore(scanA: Scan, scanB: Scan): number {
    return scanB.score - scanA.score;
  }
}
