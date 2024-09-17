import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateCustomerDto {
    @Expose()
    @IsString()
    name:string;
    @Expose()
    @IsString()
    phone:string
    @Expose()
    @IsEmail()
    email:string;
    @Expose()
    @IsString()
    birthday:string
}
