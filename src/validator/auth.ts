import z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
    birthDate: z.coerce.date({ message: 'Invalid date format' }),
    phoneNumber: z.string().regex(/^\+?[\d\s-]{10,}$/, { message: 'Invalid phone number' }),
    gender: z.enum(['M', 'F'], { message: 'Gender must be M or F' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const validTokenSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
});

export type ValidTokenInput = z.infer<typeof validTokenSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
