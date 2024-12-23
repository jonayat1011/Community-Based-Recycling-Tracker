import { Controller, Post, Body, Get ,Headers, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { Recycler } from '../recycler/entities/recycler/recycler.entity';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<Recycler> {
    return this.authService.register(registerDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const result = await this.authService.validateUser(email, password);
    return {
      access_token: result.token,  // Send the generated JWT token
      role: result.role,           // Optionally return the role for the client
    };
  }
  @Get('id')
  getData(@Headers ('authorization') authorization: string) {
    console.log('Authorization header:', authorization);
    if (authorization) {
      // Process token
    } else {
      // Handle missing token
      throw new UnauthorizedException('Authorization header is missing');
    }
  }
}
