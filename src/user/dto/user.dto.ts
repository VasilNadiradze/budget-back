import { 
    IsEmail, 
    IsNotEmpty, 
    MinLength 
} from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateUserDto {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}
