import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';
import { Coordinates } from 'src/target/models/coordinates';
import { EnemyGroup } from 'src/target/models/enemy-group';

export class Scan {
  @ValidateNested()
  @Type(() => Coordinates)
  @IsNotEmptyObject()
  readonly coordinates: Coordinates;

  @ValidateNested()
  @Type(() => EnemyGroup)
  @IsNotEmptyObject()
  @Expose({ name: 'enemies' })
  readonly enemyGroup: EnemyGroup;

  @IsInt()
  @IsOptional()
  readonly allies: number;

  score: number;
}
