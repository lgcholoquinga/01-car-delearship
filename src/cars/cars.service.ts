import { Injectable, NotFoundException } from '@nestjs/common';

import { ICar } from './models/car.interface';

import { CarCreateDto } from './models/car-create-dto';
import { CarUpdateDto } from './models/car-update-dto';

@Injectable()
export class CarsService {
  private _cars: ICar[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Mazda' },
    { id: 3, name: 'Honda' },
  ];

  getAll(): ICar[] {
    return this._cars;
  }

  finOneById(id: number): ICar {
    const car = this._cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id: ${id} not found.`);
    return car;
  }

  create(car: CarCreateDto) {
    this._cars.push(car);
    return {
      ok: true,
      message: 'Car created.',
    };
  }

  update(id: number, car: CarUpdateDto) {
    const existCar = this._cars.find((c) => c.id === id);
    if (!existCar) throw new NotFoundException(`Car with id: ${id} not found`);

    this._cars = this._cars.map((c) => {
      if (c.id === id) {
        return { id, name: car.name };
      } else {
        return c;
      }
    });

    return { ok: true, message: 'Car updated.' };
  }

  delete(id: number) {
    const car = this._cars.find((c) => c.id === id);
    if (!car) throw new NotFoundException(`Car with id: ${id} not found`);
    this._cars.filter((c) => c.id === id);
    return { ok: true, message: 'Car deleted' };
  }
}
