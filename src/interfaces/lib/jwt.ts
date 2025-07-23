export interface IJwtLib {
  generateToken(payload: object): Promise<string>;
  verifyToken(token: string): Promise<unknown>;
}
