import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars(): ICar[] {
    return this.carService.getAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.finOneById(id);
  }

  @Post()
  createCar(@Body() car: CreateCarDto) {
    return this.carService.create(car);
  }

  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() car: UpdateCarDto) {
    return this.carService.update(id, car);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.delete(id);
  }
}
