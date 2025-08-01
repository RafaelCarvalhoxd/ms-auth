import { LoginDto, RegisterDto, ValidTokenDto } from '@/dto/auth';
import { User } from '@/entity/user';
import { AuthService } from '@/service/auth';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(dto: RegisterDto): Promise<User> {
    return await this.authService.register(
      dto.name,
      dto.email,
      dto.password,
      dto.birthDate,
      dto.phoneNumber,
      dto.gender,
    );
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(dto.email, dto.password);
  }

  async validToken(dto: ValidTokenDto): Promise<{ userId: string }> {
    return await this.authService.validToken(dto.token);
  }
}
