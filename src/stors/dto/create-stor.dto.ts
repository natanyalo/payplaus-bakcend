import { Coordinates } from '../entities/stor.entity';
import { IsString, IsNumber, IsArray, IsObject } from 'class-validator';


export class CoordinatesDto {
    @IsString()
    lat:string
    @IsString()
    lon:string
}

export class CreateStorDto {
  @IsString()
  idUser: string;
  @IsString()
  name: string;

  category: string;
  @IsNumber()
  score: number;
  @IsObject()
  address: Coordinates;
  @IsArray()
  timeAvailable: [number, number];
}
