import { UserClient } from '@/config/grpc/clients/user';
import env from '@/config/env/env';
import { AuthController } from '@/controller/auth';
import { BcryptLib } from '@/lib/bcrypt';
import { JwtLib } from '@/lib/jwt';
import { AuthService } from '@/service/auth';

export const makeAuth = () => {
  return new AuthController(new AuthService(new UserClient(), new JwtLib(env.jwt.secret), new BcryptLib()));
};
