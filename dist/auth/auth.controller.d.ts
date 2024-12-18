import { AuthService } from './auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { User } from 'src/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<any>;
    register(registerDto: RegisterDto): Promise<User>;
}
