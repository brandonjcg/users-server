import { Router } from 'express';
import postRoutes from './post.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
