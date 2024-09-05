import { IsString,IsNumber } from "class-validator"
export class CreateMealDto {
    @IsString()
    name:string
    @IsString()
    description:string
    @IsNumber()
    price:number
    @IsString()
    image:string 
}
