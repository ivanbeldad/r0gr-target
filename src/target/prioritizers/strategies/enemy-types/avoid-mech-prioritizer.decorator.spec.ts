import { EnemyType } from 'src/target/models/enemy-type.enum';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';
import { BasePrioritizer } from 'src/target/prioritizers/strategies/base-prioritizer';
import { AvoidMechPrioritizerDecorator } from './avoid-mech-prioritizer.decorator';

describe('AvoidMechPrioritizerDecorator', () => {
  let prioritizer: Prioritizable;

  beforeAll(() => {
    prioritizer = new AvoidMechPrioritizerDecorator(new BasePrioritizer());
    prioritizer.scans = [
      {
        coordinates: {
          x: 1,
          y: 2,
        },
        enemyGroup: {
          size: 10,
          type: EnemyType.MECH,
        },
        score: 0,
      },
      {
        coordinates: {
          x: 1,
          y: 2,
        },
        enemyGroup: {
          size: 10,
          type: EnemyType.SOLDIER,
        },
        score: 0,
      },
    ];
    prioritizer.prioritize();
  });

  it('should be defined', () => {
    expect(prioritizer).toBeDefined();
  });

  it('should reduce the score of mech enemies', () => {
    prioritizer.prioritize();
    expect(prioritizer.scans[0].score).toBe(-Infinity);
  });

  it('should not change the score of other enemy types', () => {
    prioritizer.prioritize();
    expect(prioritizer.scans[1].score).toBe(0);
  });
});
