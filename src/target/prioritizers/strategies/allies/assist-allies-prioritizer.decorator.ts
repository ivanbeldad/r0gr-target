import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';

export class AssistAlliesPrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    this.scans.filter((scan) => scan.allies).forEach((scan) => (scan.score += this.weight));
  }
}
