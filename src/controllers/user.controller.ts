import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';
import {
  buildFilters, buildPagination, getResultsAndPageFromQuery,
  sendGenericError, sendGenericSuccess,
} from '../utils';

export const userMessages = {
  notFound: 'User not found',
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page, results } = getResultsAndPageFromQuery(req);
    const { offset, limit } = buildPagination(page, results);
    const where = buildFilters(req.query);

    const data = await User.findAndCountAll({
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

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Post,
          as: 'posts',
        },
      ],
    });
    if (!user) {
      return sendGenericSuccess(res, { message: userMessages.notFound });
    }
    return sendGenericSuccess(res, { data: user });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, email } = req.body;
  try {
    const user = await User.create({ name, email });

    return sendGenericSuccess(res, {
      data: user,
      message: 'User created successfully',
    });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return sendGenericSuccess(res, { message: userMessages.notFound });
    }

    await user.update(req.body);

    return sendGenericSuccess(res, {
      data: user,
      message: 'User updated successfully',
    });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return sendGenericSuccess(res, { message: userMessages.notFound });
    }
    await user.destroy();

    return sendGenericSuccess(res, {
      data: user,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    return sendGenericError(res, error);
  }
};
