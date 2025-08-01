export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  phoneNumber: string;
  gender: 'M' | 'F';
};

export type ValidTokenDto = {
  token: string;
};
