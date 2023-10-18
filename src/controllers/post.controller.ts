import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';
import {
  buildFilters, buildPagination, getResultsAndPageFromQuery,
  sendGenericError, sendGenericSuccess,
} from '../utils';

export const postMessages = {
  notFound: 'Post not found',
};

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
    const { page, results } = getResultsAndPageFromQuery(req);
    const { offset, limit } = buildPagination(page, results);
    const where = buildFilters(req.query);

    const data = await Post.findAndCountAll({
      offset,
      limit,
      where,
    });

    return sendGenericSuccess(res, {
      data: data.rows,
      info: {
        page,
        results: limit,
        total: data.count,
      },
    });
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
      return sendGenericSuccess(res, { message: postMessages.notFound });
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
      return sendGenericSuccess(res, { message: postMessages.notFound });
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
      return sendGenericSuccess(res, { message: postMessages.notFound });
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
