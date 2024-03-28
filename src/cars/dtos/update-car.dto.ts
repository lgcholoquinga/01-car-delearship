import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString({ message: 'The field brand must have a string value' })
  @IsOptional()
  brand?: string;

  @IsString({ message: 'The field model must have a string value' })
  @IsOptional()
  model?: string;
}
