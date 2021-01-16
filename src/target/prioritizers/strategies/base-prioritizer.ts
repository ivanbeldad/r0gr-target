import { Injectable } from '@nestjs/common';
import { Scan } from 'src/target/models/scan';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';

@Injectable()
export class BasePrioritizer implements Prioritizable {
  scans: Scan[] = [];

  prioritize() {
    this.scans.forEach((scan) => (scan.score = 0));
  }
}
