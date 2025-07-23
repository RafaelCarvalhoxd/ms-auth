import { IJwtLib } from '@/interfaces/lib/jwt';
import jwt from 'jsonwebtoken';

export class JwtLib implements IJwtLib {
  constructor(private secret: string) {}

  async generateToken(payload: object): Promise<string> {
    return new Promise((resolve, reject) =>
      jwt.sign(payload, this.secret, { algorithm: 'HS256', expiresIn: '1h' }, (err, token) => {
        if (err || !token) return reject(err ?? new Error('Token não gerado'));
        resolve(token);
      }),
    );
  }

  async verifyToken(token: string): Promise<unknown> {
    return new Promise((resolve, reject) =>
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      }),
    );
  }
}
