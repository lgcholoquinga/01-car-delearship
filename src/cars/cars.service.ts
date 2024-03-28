import { Injectable, NotFoundException } from '@nestjs/common';

import { ICar } from './interfaces/car.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
  private _cars: ICar[] = [
    { id: uuidv4(), brand: 'Toyota', model: 'Carolla' },
    { id: uuidv4(), brand: 'Mazda', model: 'CX2' },
    { id: uuidv4(), brand: 'Honda', model: 'Kicks' },
  ];

  getAll(): ICar[] {
    return this._cars;
  }

  finOneById(id: string): ICar {
    const car = this._cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id: ${id} not found.`);
    return car;
  }

  create(car: CreateCarDto) {
    const objCar = { id: uuidv4(), ...car };
    this._cars.push(objCar);

    return {
      ok: true,
      message: 'Car created.',
    };
  }

  update(id: string, car: UpdateCarDto) {
    let carDB = this.finOneById(id);

    this._cars = this._cars.map((c) => {
      if (c.id === id) {
        carDB = {
          ...carDB,
          ...car,
          id,
        };
        return carDB;
      } else {
        return c;
      }
    });

    return { ok: true, message: 'Car updated.' };
  }

  delete(id: string) {
    const car = this._cars.find((c) => c.id === id);
    if (!car) throw new NotFoundException(`Car with id: ${id} not found`);
    this._cars = this._cars.filter((c) => c.id !== id);
    return { ok: true, message: 'Car deleted' };
  }
}
