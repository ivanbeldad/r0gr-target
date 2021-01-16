import { createScansMock } from 'src/target/prioritizers/mocks/scans.mock';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';
import { BasePrioritizer } from 'src/target/prioritizers/strategies/base-prioritizer';
import { AssistAlliesPrioritizerDecorator } from './assist-allies-prioritizer.decorator';

describe('AvoidMechPrioritizerDecorator', () => {
  let prioritizer: Prioritizable;

  beforeAll(() => {
    prioritizer = new AssistAlliesPrioritizerDecorator(new BasePrioritizer());
    prioritizer.scans = createScansMock();
    prioritizer.prioritize();
  });

  it('should be defined', () => {
    expect(prioritizer).toBeDefined();
  });

  it('should increase the score of targets with allies on it', () => {
    expect(prioritizer.scans[1].score).toBeGreaterThan(0);
    expect(prioritizer.scans[3].score).toBeGreaterThan(0);
  });

  it('should not change the score of targets without allies', () => {
    expect(prioritizer.scans[0].score).toBe(0);
    expect(prioritizer.scans[2].score).toBe(0);
  });
});
