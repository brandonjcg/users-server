import { mockRequest, mockResponse } from 'jest-mock-req-res';
import {
  createUser, deleteUser, getUserById, getUsers, updateUser,
} from '../../controllers/user.controller';
import User from '../../models/user.model';

jest.mock('../../models/post.model', () => ({ }));
jest.mock('../../models/user.model', () => ({ }));

describe('Unit test create user controller', () => {
  it('Happy path, return success response', async () => {
    const req = mockRequest();
    const res = mockResponse();

    User.create = jest.fn().mockResolvedValue({
      name: 'John Smith',
      email: 'jsmith@gmail.com',
    });

    await createUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'User created successfully',
      info: {},
      data: {
        name: 'John Smith',
        email: 'jsmith@gmail.com',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    User.create = jest.fn().mockRejectedValue({
      message: 'Error creating user',
    });

    await createUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error creating user',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Unit test get users controller', () => {
  it('Happy path, return success response', async () => {
    const req = mockRequest();
    const res = mockResponse();

    User.findAndCountAll = jest.fn().mockResolvedValue({
      rows: [
        {
          name: 'John Smith',
          email: 'jsmith@gmail.com',
        },
      ],
      count: 1,
    });

    await getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: '',
      info: {
        page: 1,
        results: 10,
        total: 1,
      },
      data: [
        {
          name: 'John Smith',
          email: 'jsmith@gmail.com',
        },
      ],
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    User.findAndCountAll = jest.fn().mockRejectedValue({
      message: 'Error creating user',
    });

    await getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error creating user',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Unit test get user by id controller', () => {
  it('Happy path, return all user data', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    User.findOne = jest.fn().mockResolvedValue({
      name: 'Dominic Toretto',
      email: 'dtoretto@gmail.com',
    });

    await getUserById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: '',
      info: {},
      data: {
        name: 'Dominic Toretto',
        email: 'dtoretto@gmail.com',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    User.findOne = jest.fn().mockRejectedValue({
      message: 'Error creating user',
    });

    await getUserById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error creating user',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('Edge case, user not found', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    User.findOne = jest.fn().mockResolvedValue(null);

    await getUserById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'User not found',
      info: {},
      data: {},
    });
  });
});

describe('Unit test update user controller', () => {
  it('Happy path, return success response', async () => {
    const req = mockRequest({
      params: { id: 1 },
      body: {
        name: 'Dominic Toretto',
        email: 'new-email@gmail.com',
      },
    });
    const res = mockResponse();

    User.findByPk = jest.fn().mockResolvedValue({
      name: 'Dominic Toretto',
      email: 'dtoretto@gmail.com',
      update: jest.fn().mockResolvedValue(true),
    });

    await updateUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'User updated successfully',
      info: {},
      data: expect.any(Object),
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, user not found', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    User.findByPk = jest.fn().mockResolvedValue(null);

    await updateUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'User not found',
      info: {},
      data: {},
    });
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    User.findByPk = jest.fn().mockRejectedValue({
      message: 'Error in update',
    });

    await updateUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error in update',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Unit test delete user controller', () => {
  it('Happy path, return success response', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    User.findByPk = jest.fn().mockResolvedValue({
      name: 'Dominic Toretto',
      email: 'dtoretto@gmail.com',
      destroy: jest.fn().mockResolvedValue(true),
    });

    await deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'User deleted successfully',
      info: {},
      data: expect.any(Object),
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, user not found', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    User.findByPk = jest.fn().mockResolvedValue(null);

    await deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'User not found',
      info: {},
      data: {},
    });
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    User.findByPk = jest.fn().mockRejectedValue({
      message: 'Error in delete',
    });

    await deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error in delete',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
