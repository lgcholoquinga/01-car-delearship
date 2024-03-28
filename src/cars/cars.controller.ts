import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ICar } from './models/car.interface';
import { CarCreateDto } from './models/car-create-dto';
import { CarUpdateDto } from './models/car-update-dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars(): ICar[] {
    return this.carService.getAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.finOneById(id);
  }

  @Post()
  createCar(@Body() car: CarCreateDto) {
    return this.carService.create(car);
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() car: CarUpdateDto) {
    return this.carService.update(id, car);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return this.carService.delete(id);
  }
}
