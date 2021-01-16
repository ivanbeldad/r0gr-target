import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';

export class PassthroughPrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    return;
  }
}
