import {
    describe, expect, it,
} from '@jest/globals';
import { mockResponse } from 'jest-mock-req-res';
import { TypeResponse, sendGenericError, sendGenericSuccess } from '../../utils';

describe('Unit test sendGenericSuccess fn', () => {
  it('Happy path, return success response', () => {
    const res = mockResponse();
    const input = {
      message: 'Second unit test 🚀',
    } as TypeResponse;

    sendGenericSuccess(res, input);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'Second unit test 🚀',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Edge case, return default values of success response', () => {
    const res = mockResponse();

    sendGenericSuccess(res);

    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: '',
      data: {},
      info: {},
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('Unit test sendGenericError fn', () => {
  it('Happy path, return error response', () => {
    const res = mockResponse();
    const input = {
      message: 'Third unit test 🚀',
    } as TypeResponse;

    sendGenericError(res, input);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Third unit test 🚀',
      info: {},
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('Edge case, return default values of error response', () => {
    const res = mockResponse();

    sendGenericError(res);

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      info: {},
      message: '',
      data: {},
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
