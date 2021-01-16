import { Scan } from 'src/target/models/scan';

/**
 * Interface able to modify scores of each scan based on certain rules
 */
export interface Prioritizable {
  /**
   * Calculates the priority of each target based on strategy rules,
   * updating the score of each scan.
   */
  prioritize(): void;

  /**
   * Scans to operate on
   */
  scans: Scan[];
}
