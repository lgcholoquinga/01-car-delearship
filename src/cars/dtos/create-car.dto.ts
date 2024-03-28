import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: 'The field brand must have a string value' })
  @IsNotEmpty({ message: 'The field brand is required' })
  readonly brand: string;

  @IsString({ message: 'The field model must have a string value' })
  @IsNotEmpty({ message: 'The field model is required' })
  readonly model: string;
}
