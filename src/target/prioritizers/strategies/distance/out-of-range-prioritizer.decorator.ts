import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';

export class OutOfRangePrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    this.scans
      .filter((scan) => scan.coordinates.distance > 100)
      .forEach((scan) => (scan.score -= Infinity));
  }
}
