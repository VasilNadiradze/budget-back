import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('სერვერული ხარვეზი');
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (user) {
        return user;
      }

      throw new NotFoundException('მომხმარებელი ვერ მოიძებნა');
    } catch (error) {
      throw new NotFoundException('მომხმარებელი ვერ მოიძებნა');
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      newUser.password = hashedPassword;
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('სერვერული ხარვეზი');
    }
  }

  async deleteById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        return null; 
      }

      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      throw new NotFoundException('ვერ მოხერხდა მომხმარებლის წაშლა');
    }
  }
}
