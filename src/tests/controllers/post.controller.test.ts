import { mockRequest, mockResponse } from 'jest-mock-req-res';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  postMessages,
  updatePost,
} from '../../controllers/post.controller';
import Post from '../../models/post.model';

jest.mock('../../models/post.model', () => ({}));
jest.mock('../../models/user.model', () => ({}));

const errorPost = 'Error creating post';

describe('Unit test create post controller', () => {
  it('Happy path, return created post', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const newPost = {
      title: 'First post',
      content: 'First description',
      idUser: 1,
    };

    Post.create = jest.fn().mockResolvedValue(newPost);

    await createPost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Post created successfully',
      info: {},
      data: newPost,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error in create post', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.create = jest.fn().mockRejectedValue({
      message: errorPost,
    });

    await createPost(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: errorPost,
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
          title: 'Second post',
          content: 'Second description',
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
          title: 'Second post',
          content: 'Second description',
          idUser: 1,
        },
      ],
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error if there is an error in get posts', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.findAndCountAll = jest.fn().mockRejectedValue({
      message: errorPost,
    });

    await getPosts(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: errorPost,
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Unit test get post by id controller', () => {
  it('Happy path, return success response in get post by id', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    const post = {
      title: 'First post',
      content: 'First description',
      idUser: 1,
    };

    Post.findByPk = jest.fn().mockResolvedValue(post);

    await getPostById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: '',
      info: {},
      data: post,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, catch error if there is an error in create posts', async () => {
    const req = mockRequest();
    const res = mockResponse();

    Post.findByPk = jest.fn().mockRejectedValue({
      message: errorPost,
    });

    await getPostById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: errorPost,
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('Edge case, post not found in get post by id', async () => {
    const req = mockRequest({
      params: { id: 1 },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue(null);

    await getPostById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: postMessages.notFound,
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
        title: 'BP post',
        content: 'New description',
        idUser: 1,
      },
    });
    const res = mockResponse();

    Post.findByPk = jest.fn().mockResolvedValue({
      title: 'BP post',
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
      message: postMessages.notFound,
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
      title: 'CK post',
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
      message: postMessages.notFound,
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
