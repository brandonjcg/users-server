import express from 'express';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../controllers/post.controller';

const router = express.Router();

router.delete('/:id', deletePost);
router.get('/:id', getPostById);
router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);

export default router;
