import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

interface ApiResponse {
  token?: string;
  message?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ApiResponse> {    
    return await this.authService.signUp(signUpDto);    
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse> {
    return await this.authService.login(loginDto);
  }
}
