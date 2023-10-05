import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';
import { buildPagination, sendGenericError, sendGenericSuccess } from '../utils';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { results, page } = req.query;
    const { offset, limit } = buildPagination(Number(page), Number(results));
    const users = await User.findAll({
      offset,
      limit,
    });

    return sendGenericSuccess(res, { data: users });
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
      return sendGenericSuccess(res, { message: 'User not found' });
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
      return sendGenericSuccess(res, { message: 'User not found' });
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
      return sendGenericSuccess(res, { message: 'User not found' });
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
