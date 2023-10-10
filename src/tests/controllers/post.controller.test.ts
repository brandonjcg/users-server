import { mockRequest, mockResponse } from 'jest-mock-req-res';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../../controllers/post.controller';
import Post from '../../models/post.model';

jest.mock('../../models/post.model', () => ({}));
jest.mock('../../models/user.model', () => ({}));

describe('Unit test create post controller', () => {
  it('Happy path, return created post', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.create = jest.fn().mockResolvedValue({
      title: 'First post',
      content: 'Main description',
      idUser: 1,
    });

    await createPost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Post created successfully',
      info: {},
      data: {
        title: 'First post',
        content: 'Main description',
        idUser: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error in create post', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.create = jest.fn().mockRejectedValue({
      message: 'Error creating post',
    });

    await createPost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error creating post',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Unit test get posts controller', () => {
  it('Happy path, return rows of posts', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.findAndCountAll = jest.fn().mockResolvedValue({
      rows: [
        {
          title: 'First post',
          content: 'Main description',
          idUser: 1,
        },
      ],
      count: 1,
    });

    await getPosts(req, res);

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
          title: 'First post',
          content: 'Main description',
          idUser: 1,
        },
      ],
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.findAndCountAll = jest.fn().mockRejectedValue({
      message: 'Error creating post',
    });

    await getPosts(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error creating post',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Unit test get post by id controller', () => {
  it('Happy path, return success response', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue({
      title: 'First post',
      content: 'Main description',
      idUser: 1,
    });

    await getPostById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: '',
      info: {},
      data: {
        title: 'First post',
        content: 'Main description',
        idUser: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.findByPk = jest.fn().mockRejectedValue({
      message: 'Error creating post',
    });

    await getPostById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error creating post',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('Edge case, post not found', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue(null);

    await getPostById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Post not found',
      info: {},
      data: {},
    });
  });
});

describe('Unit test update post controller', () => {
  it('Happy path, return success response', async () => {
    const req = mockRequest({
      params: { id: 1 },
      body: {
        title: 'First post',
        content: 'New description',
        idUser: 1,
      },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue({
      title: 'First post',
      content: 'Main description',
      idUser: 1,
      update: jest.fn().mockResolvedValue(true),
    });

    await updatePost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Post updated successfully',
      info: {},
      data: expect.any(Object),
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, post not found', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue(null);

    await updatePost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Post not found',
      info: {},
      data: {},
    });
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.findByPk = jest.fn().mockRejectedValue({
      message: 'Error in update',
    });

    await updatePost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error in update',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Unit test delete post controller', () => {
  it('Happy path, return success response', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue({
      title: 'First post',
      content: 'Main description',
      idUser: 1,
      destroy: jest.fn().mockResolvedValue(true),
    });

    await deletePost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Post deleted successfully',
      info: {},
      data: expect.any(Object),
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, post not found', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue(null);

    await deletePost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Post not found',
      info: {},
      data: {},
    });
  });

  it('Edge case, catch error if there is an error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.findByPk = jest.fn().mockRejectedValue({
      message: 'Error in delete',
    });

    await deletePost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Error in delete',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
