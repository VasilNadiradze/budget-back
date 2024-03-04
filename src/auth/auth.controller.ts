import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Request, 
  UseGuards 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('მომხმარებლის არე')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'რეგისტრაცია',
  })
  @ApiResponse({
    status: 201,
    description: 'მომხმარებელთა რეგისტრაცია',
    type: SignUpDto,
  })
  @ApiResponse({
    status: 400,
    description: 'არასწორი პარამეტრები',
  })
  @ApiResponse({
    status: 500,
    description: 'სერვერული ხარვეზი',
  })
  @Post('/register')
  async signUp(@Body() signUpDto: SignUpDto) {    
    return await this.authService.signUp(signUpDto);    
  }

  @ApiOperation({
    summary: 'აუტენტიფიკაცია',
  })
  @ApiResponse({
    status: 201,
    description: 'მომხმარებელთა აუტენტიფიკაცია',
    type: LoginDto,
  })
  @ApiResponse({
    status: 400,
    description: 'არასწორი პარამეტრები',
  })
  @ApiResponse({
    status: 500,
    description: 'სერვერული ხარვეზი',
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'პროფილი',
  })
  @ApiResponse({
    status: 200,
    description: 'მომხმარებლის კაბინეტი',
  })
  @ApiResponse({
    status: 401,
    description: 'გაიარეთ ავტორიზაცია',
  })
  @ApiResponse({
    status: 500,
    description: 'სერვერული ხარვეზი',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
