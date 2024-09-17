import { IsNotEmpty } from "class-validator";

export class CreateAuthDtoLogin {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;   

}
