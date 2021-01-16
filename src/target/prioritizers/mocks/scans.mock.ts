import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { EnemyType } from 'src/target/models/enemy-type.enum';
import { Scan } from 'src/target/models/scan';

export const createScansMock = (): Scan[] =>
  plainToClass(Scan, [
    {
      coordinates: {
        x: 5,
        y: 5,
      },
      enemies: {
        size: 10,
        type: EnemyType.SOLDIER,
      },
      score: 0,
    },
    {
      coordinates: {
        x: 6,
        y: 1,
      },
      enemies: {
        size: 20,
        type: EnemyType.MECH,
      },
      allies: 4,
      score: 0,
    },
    {
      coordinates: {
        x: 90,
        y: 120,
      },
      enemies: {
        size: 10,
        type: EnemyType.SOLDIER,
      },
      score: 0,
    },
    {
      coordinates: {
        x: 4,
        y: 10,
      },
      enemies: {
        size: 5,
        type: EnemyType.MECH,
      },
      allies: 2,
      score: 0,
    },
  ]);
