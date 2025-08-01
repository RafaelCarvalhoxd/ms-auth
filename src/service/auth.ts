import { ConflictError, NotFoundError, UnauthorizedError } from '@/config/errors/http-error';
import { User } from '@/entity/user';
import { IUserClient } from '@/interfaces/client/user';
import { IBcryptLib } from '@/interfaces/lib/bcrypt';
import { IJwtLib } from '@/interfaces/lib/jwt';

export class AuthService {
  constructor(
    private readonly userClient: IUserClient,
    private readonly tokenLib: IJwtLib,
    private readonly hashLib: IBcryptLib,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    birthDate: Date,
    phoneNumber: string,
    gender: 'M' | 'F',
  ): Promise<User> {
    const existingUser = await this.userClient.findUserByEmail({ email: email });
    if (existingUser) {
      throw new ConflictError('User email already exists.');
    }
    const hashedPassword = await this.hashLib.hashPassword(password);
    const user = await this.userClient.createUser({
      name: name,
      email: email,
      password: hashedPassword,
      birth_date: birthDate.toISOString().split('T')[0],
      phone_number: phoneNumber,
      gender: gender,
    });
    return new User(user.name, user.email);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userClient.findUserByEmail({ email: email });
    if (!user) {
      throw new NotFoundError('User not found.');
    }
    const isPasswordValid = await this.hashLib.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid password.');
    }
    const token = await this.tokenLib.generateToken({ userId: user.id });
    return { token };
  }

  async validToken(token: string): Promise<{ userId: string }> {
    const decoded = await this.tokenLib.verifyToken(token);
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded) || !decoded.userId) {
      throw new UnauthorizedError('Invalid token.');
    }
    return { userId: decoded.userId as string };
  }
}
