import { Expose } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { EnemyType } from 'src/target/models/enemy-type.enum';

export class EnemyGroup {
  @IsEnum(EnemyType)
  readonly type: EnemyType;

  @Expose({ name: 'number' })
  @IsInt()
  readonly size: number;
}
