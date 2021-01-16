import { Coordinates } from './coordinates';
import { plainToClass } from 'class-transformer';

describe('Coordinates', () => {
  it('should be defined', () => {
    expect(new Coordinates()).toBeDefined();
  });

  it('distance should be calculated based on x and y', () => {
    const c = { x: 0, y: 1 };
    let coords = plainToClass(Coordinates, c);
    expect(coords.distance).toBe(1);
    c.y = -1;
    coords = plainToClass(Coordinates, c);
    expect(coords.distance).toBe(1);
  });
});
