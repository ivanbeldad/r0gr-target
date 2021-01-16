import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';
import { BasePrioritizer } from 'src/target/prioritizers/strategies/base-prioritizer';
import { createScansMock } from 'src/target/prioritizers/mocks/scans.mock';
import { OutOfRangePrioritizerDecorator } from './out-of-range-prioritizer.decorator';

describe('FurthestEnemiesPrioritizerDecorator', () => {
  let prioritizer: Prioritizable;

  beforeAll(() => {
    prioritizer = new OutOfRangePrioritizerDecorator(new BasePrioritizer());
    prioritizer.scans = createScansMock();
    prioritizer.prioritize();
  });

  it('should be defined', () => {
    expect(prioritizer).toBeDefined();
  });

  it('should decrease the score of the target out of range', () => {
    expect(prioritizer.scans[2].score).toBe(-Infinity);
  });

  it('should not change the score of the targets within range', () => {
    expect(prioritizer.scans[0].score).toBe(0);
    expect(prioritizer.scans[1].score).toBe(0);
    expect(prioritizer.scans[3].score).toBe(0);
  });
});
