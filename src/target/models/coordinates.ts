import { IsNumber } from 'class-validator';

export class Coordinates {
  @IsNumber()
  readonly x: number;

  @IsNumber()
  readonly y: number;
}
