import { EnemyType } from 'src/target/models/enemy-type.enum';
import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';

export class AvoidMechPrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    this.scans
      .filter((scan) => scan.enemyGroup.type === EnemyType.MECH)
      .forEach((scan) => (scan.score -= Infinity));
  }
}
