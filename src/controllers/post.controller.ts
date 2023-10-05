import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';
import { buildPagination, sendGenericError, sendGenericSuccess } from '../utils';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, idUser } = req.body;
    const post = await Post.create({ title, content, idUser });

    return sendGenericSuccess(res, {
      data: post,
      message: 'Post created successfully',
    });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { results, page } = req.query;
    const { offset, limit } = buildPagination(Number(page), Number(results));
    const data = await Post.findAll({
      offset,
      limit,
    });

    return sendGenericSuccess(res, { data });
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
    return sendGenericSuccess(res, { data: post });
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

    return sendGenericSuccess(res, {
      data: post,
      message: 'Post updated successfully',
    });
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

    return sendGenericSuccess(res, {
      data: post,
      message: 'Post deleted successfully',
    });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};
