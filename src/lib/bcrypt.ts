import { IBcryptLib } from '@/interfaces/lib/bcrypt';
import bcrypt from 'bcrypt';

export class BcryptLib implements IBcryptLib {
  constructor() {}
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
