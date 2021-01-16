import { IsNumber } from 'class-validator';

export class Coordinates {
  @IsNumber()
  readonly x: number;

  @IsNumber()
  readonly y: number;

  get distance(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
