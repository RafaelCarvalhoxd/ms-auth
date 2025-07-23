import { Router } from 'express';
import { healthCheck } from '../../routes/health-check';
import { authRoutes } from '@/routes/auth';

export const router = Router();

export function setupRoutes() {
  router.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  router.get('/health', healthCheck);
  router.use('/auth', authRoutes);

  return router;
}
