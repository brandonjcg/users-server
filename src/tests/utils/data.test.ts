import { mockRequest } from 'jest-mock-req-res';
import { buildFilters, buildPagination, getModels } from '../../utils';

describe('Unit test getModels fn', () => {
  it('Should return an array of strings, without index.ts', () => {
    const modelFiles = [
      'index.ts',
      'file1.ts',
      'file2.ts',
      'file3.ts',
    ];
    const result = getModels(modelFiles);

    const expected = [
      'file1.ts',
      'file2.ts',
      'file3.ts',
    ];

    expect(result).toEqual(expected);
  });

  it('Should return an empty array, if missing input', () => {
    const result = getModels();

    const expected: string[] = [];

    expect(result).toEqual(expected);
  });
});

describe('Unit test buildPagination fn', () => {
  it('Should return an object with offset and limit', () => {
    const currentPage = 2;
    const totalPages = 20;
    const result = buildPagination(currentPage, totalPages);

    const expected = {
      offset: 20,
      limit: 20,
    };

    expect(result).toEqual(expected);
  });

  it('Should return default values, if missing params', () => {
    const result = buildPagination(Number(), Number());

    const expected = {
      offset: 0,
      limit: 10,
    };

    expect(result).toEqual(expected);
  });
});

describe('Unit test buildFilters fn', () => {
  it('Should return an object with filters', () => {
    const req = mockRequest({
      query: {
        'user.email': 'user_one@gmail.com',
        page: 1,
        results: 10,
      },
    });
    const result = buildFilters(req.query);

    const expected = {
      '$user.email$': 'user_one@gmail.com',
    };

    expect(result).toEqual(expected);
  });

  it('Should return empty object filters, if missing params', () => {
    const result = buildFilters();

    const expected = {};

    expect(result).toEqual(expected);
  });
});
