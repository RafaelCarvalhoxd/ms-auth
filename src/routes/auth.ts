import { LoginDto, RegisterDto, ValidTokenDto } from '@/dto/auth';
import { makeAuth } from '@/factories/auth';
import { Router } from 'express';
import { loginSchema, registerSchema, validTokenSchema } from '@/validator/auth';

export const authRoutes = Router();
const authController = makeAuth();

authRoutes.post('/login', async (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json({ message: `Validation failed: ${message}` });
  }

  try {
    const dto: LoginDto = result.data;
    const user = await authController.login(dto);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/register', async (req, res, next) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json({ message: `Validation failed: ${message}` });
  }

  try {
    const dto: RegisterDto = result.data;
    const user = await authController.register(dto);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/valid-token', async (req, res, next) => {
  const result = validTokenSchema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json({ message: `Validation failed: ${message}` });
  }

  try {
    const dto: ValidTokenDto = result.data;
    const resultData = await authController.validToken(dto);
    res.json(resultData);
  } catch (error) {
    next(error);
  }
});
