import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { firstName, lastName, email, password } = signUpDto;

      const existingUser = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) throw new ConflictException('ელ-ფოსტა დაკავებულია');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await this.userRepository.save(newUser);

      const token = this.jwtService.sign({ id: newUser.id });

      return { token };
    } catch (error) {
      throw error; 
    }
  }

  async login(loginDto: LoginDto): Promise<{ token?: string; success?: boolean; message?: string }> {
    try {
      const { email, password } = loginDto;
  
      const user = await this.userRepository.findOne({
        where: { email },
      });
  
      if (!user) throw new UnauthorizedException('არასწორი ელ-ფოსტა ან პაროლი');
  
      const isPasswordMatched = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatched) throw new UnauthorizedException('არასწორი ელ-ფოსტა ან პაროლი');
  
      const token = this.jwtService.sign({ id: user.id });
  
      return { success: true, token };
    } catch (error) {
      throw error;
    }
  }  
}
