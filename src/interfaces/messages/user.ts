export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  phone_number: string;
  gender: 'M' | 'F';
}

export interface GetUserByEmailRequest {
  email: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
}
