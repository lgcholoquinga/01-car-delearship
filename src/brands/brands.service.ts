import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './dto';

@Injectable()
export class BrandsService {
  private _brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createAt: new Date().getTime(),
    };

    this._brands.push(brand);
    return 'Brand created successfully.';
  }

  findAll() {
    return this._brands;
  }

  findOne(id: string) {
    const brand = this._brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id: ${id} not found.`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    this._brands = this._brands.map((brand) => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      }
      return brand;
    });
    return { existError: false, message: `Brand with id: ${id} updated.` };
  }

  remove(id: string) {
    this.findOne(id);
    this._brands = this._brands.filter((x) => x.id !== id);
    return { existError: false, message: `Brand with id ${id} deleted.` };
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this._brands = brands;
  }
}
