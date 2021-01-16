import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { EnemyType } from 'src/target/models/enemy-type.enum';
import { Scan } from 'src/target/models/scan';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';
import { BasePrioritizer } from 'src/target/prioritizers/strategies/base-prioritizer';
import { ClosestEnemiesPrioritizerDecorator } from './closest-enemies-prioritizer.decorator';

describe('ClosestEnemiesPrioritizerDecorator', () => {
  let prioritizer: Prioritizable;
  let scansSorted: Scan[];

  beforeAll(() => {
    prioritizer = new ClosestEnemiesPrioritizerDecorator(new BasePrioritizer());
    prioritizer.scans = plainToClass(Scan, [
      {
        coordinates: {
          x: 5,
          y: 5,
        },
        enemies: {
          size: 10,
          type: EnemyType.MECH,
        },
        score: 0,
      },
      {
        coordinates: {
          x: 6,
          y: 1,
        },
        enemies: {
          size: 10,
          type: EnemyType.MECH,
        },
        score: 0,
      },
      {
        coordinates: {
          x: 4,
          y: 10,
        },
        enemies: {
          size: 10,
          type: EnemyType.SOLDIER,
        },
        score: 0,
      },
    ]);
    prioritizer.prioritize();
    scansSorted = prioritizer.scans.sort((scanA, scanB) => scanB.score - scanA.score);
  });

  it('should be defined', () => {
    expect(prioritizer).toBeDefined();
  });

  it('should increase the score of the closest more than the others', () => {
    expect(scansSorted[0].coordinates.x).toBe(6);
    expect(scansSorted[0].coordinates.y).toBe(1);
  });

  it('should not change the score of furthest one', () => {
    expect(scansSorted[2].score).toBe(0);
  });
});
