import { CreateUserRequest, GetUserByEmailRequest, UserResponse } from '../messages/user';

export interface IUserClient {
  createUser(request: CreateUserRequest): Promise<UserResponse>;
  findUserByEmail(request: GetUserByEmailRequest): Promise<UserResponse | null>;
}
