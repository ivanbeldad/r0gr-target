import { Scan } from 'src/target/models/scan';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';
import { BasePrioritizer } from 'src/target/prioritizers/strategies/base-prioritizer';
import { ClosestEnemiesPrioritizerDecorator } from './closest-enemies-prioritizer.decorator';
import { createScansMock } from 'src/target/prioritizers/mocks/scans.mock';

describe('ClosestEnemiesPrioritizerDecorator', () => {
  let prioritizer: Prioritizable;
  let scansSorted: Scan[];

  beforeAll(() => {
    prioritizer = new ClosestEnemiesPrioritizerDecorator(new BasePrioritizer());
    prioritizer.scans = createScansMock();
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
    expect(scansSorted[3].score).toBe(0);
  });
});
