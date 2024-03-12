import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MinLength 
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'მომხმარებლის ელ-ფოსტა',
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'მომხმარებლის პაროლი',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
