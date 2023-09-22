import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';
import { sendGenericError, sendGenericSuccess } from '../utils';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, idUser } = req.body;
    const post = await Post.create({ title, content, idUser });

    return sendGenericSuccess(res, { data: post });

  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    
    return sendGenericSuccess(res, { data: posts });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!post) {
      return sendGenericSuccess(res, { message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findByPk(id);
    if (!post) {
      return sendGenericSuccess(res, { message: 'Post not found' });
    }


    await post.update(req.body);
    
    return sendGenericSuccess(res, { data: post });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return sendGenericSuccess(res, { message: 'Post not found' });
    }

    await post.destroy();
    
    return sendGenericSuccess(res, { data: post });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};
