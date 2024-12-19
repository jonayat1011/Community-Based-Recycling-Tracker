
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dtos/register.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials (email)');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials(pass)');

    const payload = { id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { name, email, password, confirmPassword, role } = registerDto;
    if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

  
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to register user');
    }
  }
}
