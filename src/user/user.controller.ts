import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

interface ApiResponse {
  user?: User; 
  users?: User[]; 
  message?: string; 
}

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ApiResponse> {
    try {
      const result = await this.userService.getAllUsers();
      return { users: result }; 
    } catch (error) {
      return { message: 'სერვერული ხარვეზი' };
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const result = await this.userService.getUserById(Number(id));
      return { user: result }; 
    } catch (error) {
      return { message: 'მომხმარებელი ვერ მოიძებნა' };
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    try {
      const result = await this.userService.createUser(createUserDto);
      return { user: result }; 
    } catch (error) {
      return { message: 'სერვერული ხარვეზი' };
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const result = await this.userService.deleteById(Number(id));
      if (result === null) {
        return { message: 'მომხმარებელი ვერ მოიძებნა' };
      }
      return { user: result }; 
    } catch (error) {
      return { message: 'სერვერული ხარვეზი' };
    }
  }
}
