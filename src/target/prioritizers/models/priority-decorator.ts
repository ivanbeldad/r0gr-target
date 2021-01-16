import { Scan } from 'src/target/models/scan';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';

/**
 * Augment an existent prioritizer
 */
export abstract class PriorityDecorator implements Prioritizable {
  constructor(private prioritizer: Prioritizable) {}

  /**
   * Modify the priority of each scan based on a specific algorithm
   *
   * @example
   *  this.scans.forEach((scan) => (scan.score += Math.random() * this.weight))
   */
  abstract prioritizeStrategy(): void;

  /**
   * Execute the complete chain of prioritizers
   */
  prioritize() {
    this.prioritizer.prioritize();
    this.prioritizeStrategy();
  }

  /**
   * Used to increase the importance of this prioritizer
   *
   * @default 1
   *
   * @example
   *  // Half priority
   *  this.weight = 0.5;
   *
   * @example
   *  // Double priority
   *  this.weight = 2;
   */
  weight = 1;

  get scans() {
    return this.prioritizer.scans;
  }

  set scans(scans: Scan[]) {
    this.prioritizer.scans = scans;
  }
}
