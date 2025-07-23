import { BadRequestError } from '@/config/errors/http-error';
import { LoginDto, RegisterDto } from '@/dto/auth';
import { User } from '@/entity/user';
import { AuthService } from '@/service/auth';
import { LoginSchema, RegisterSchema } from '@/validator/auth';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(dto: RegisterDto): Promise<User> {
    const result = RegisterSchema.safeParse(dto);
    if (!result.success) {
      throw new BadRequestError(
        `Validation failed: ${result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
      );
    }
    return await this.authService.register(
      result.data.name,
      result.data.email,
      result.data.password,
      result.data.birthDate,
      result.data.phoneNumber,
      result.data.gender,
    );
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const result = LoginSchema.safeParse(dto);
    if (!result.success) {
      throw new BadRequestError(
        `Validation failed: ${result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
      );
    }
    return await this.authService.login(result.data.email, result.data.password);
  }
}
