import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';

export class AvoidCrossfirePrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    this.scans.filter((scan) => scan.allies).forEach((scan) => (scan.score -= Infinity));
  }
}
