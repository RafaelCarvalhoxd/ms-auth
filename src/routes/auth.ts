import { LoginDto, RegisterDto } from '@/dto/auth';
import { makeAuth } from '@/factories/auth';
import { Router } from 'express';

export const authRoutes = Router();
const authController = makeAuth();

authRoutes.post('/login', async (req, res, next) => {
  try {
    const dto: LoginDto = req.body;
    const user = await authController.login(dto);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/register', async (req, res, next) => {
  try {
    const dto: RegisterDto = req.body;
    const user = await authController.register(dto);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
