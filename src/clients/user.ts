import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { IUserClient } from '@/interfaces/client/user';
import { CreateUserRequest, GetUserByEmailRequest, UserResponse } from '@/interfaces/messages/user';
import env from '@/config/env/env';

const PROTO_PATH = path.join('proto', 'user_service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userService = (protoDescriptor.user as any).UserService;

const client = new userService(`${env.grpc.user.host}:${env.grpc.user.port}`, grpc.credentials.createInsecure());

export class UserClient implements IUserClient {
  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      client.Create(request, (error: grpc.ServiceError | null, response: UserResponse) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(response);
      });
    });
  }

  async findUserByEmail(request: GetUserByEmailRequest): Promise<UserResponse | null> {
    return new Promise((resolve, reject) => {
      client.FindByEmail(request, (error: grpc.ServiceError | null, response: UserResponse) => {
        if (error) {
          if (error.code === grpc.status.NOT_FOUND) {
            resolve(null);
            return;
          }
          reject(error);
          return;
        }
        resolve(response);
      });
    });
  }
}
