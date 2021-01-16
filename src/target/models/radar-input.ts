import { Type } from 'class-transformer';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';
import { Protocol } from 'src/target/models/protocol.enum';
import { Scan } from 'src/target/models/scan';

export class RadarInput {
  @IsEnum(Protocol, { each: true })
  readonly protocols: Protocol[];

  @ValidateNested({ each: true })
  @Type(() => Scan)
  @IsDefined()
  readonly scan: Scan[];
}
