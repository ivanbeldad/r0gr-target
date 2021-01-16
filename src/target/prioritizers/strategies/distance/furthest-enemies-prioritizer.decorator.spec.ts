import { Scan } from 'src/target/models/scan';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';
import { BasePrioritizer } from 'src/target/prioritizers/strategies/base-prioritizer';
import { FurthestEnemiesPrioritizerDecorator } from 'src/target/prioritizers/strategies/distance/furthest-enemies-prioritizer.decorator';
import { createScansMock } from 'src/target/prioritizers/mocks/scans.mock';

describe('FurthestEnemiesPrioritizerDecorator', () => {
  let prioritizer: Prioritizable;
  let scansSorted: Scan[];

  beforeAll(() => {
    prioritizer = new FurthestEnemiesPrioritizerDecorator(new BasePrioritizer());
    prioritizer.scans = createScansMock();
    prioritizer.prioritize();
    scansSorted = prioritizer.scans.sort((scanA, scanB) => scanB.score - scanA.score);
  });

  it('should be defined', () => {
    expect(prioritizer).toBeDefined();
  });

  it('should increase the score of the furthest more than the others', () => {
    expect(scansSorted[0].coordinates.x).toBe(90);
    expect(scansSorted[0].coordinates.y).toBe(120);
  });

  it('should not change the score of closest one', () => {
    expect(scansSorted[3].score).toBe(0);
  });
});
