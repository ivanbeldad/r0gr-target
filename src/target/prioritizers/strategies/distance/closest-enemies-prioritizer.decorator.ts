import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';

export class ClosestEnemiesPrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    this.scans
      .sort((scanA, scanB) => scanB.coordinates.distance - scanA.coordinates.distance)
      .forEach((scan, i, arr) => (scan.score += (i / (arr.length - 1)) * this.weight));
  }
}
