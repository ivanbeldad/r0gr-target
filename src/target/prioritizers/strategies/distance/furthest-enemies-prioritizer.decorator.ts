import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';

export class FurthestEnemiesPrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    this.scans
      .sort((scanA, scanB) => scanA.coordinates.distance - scanB.coordinates.distance)
      .forEach((scan, i, arr) => (scan.score += (i / (arr.length - 1)) * this.weight));
  }
}
