import { Request } from 'express';
import { WhereOptions } from 'sequelize';

const PAGINATION_LIMIT = 10;

export const getModels = (
  modelFiles: string[] = [],
) => modelFiles.filter((file) => file !== 'index.ts');

export const buildPagination = (
  currentPage: number,
  totalPages: number = PAGINATION_LIMIT,
) => {
  const offset = (currentPage - 1) * totalPages || 0;
  const limit = totalPages || PAGINATION_LIMIT;

  return {
    offset,
    limit,
  };
};

export const buildFilters = (query: Request['query'] = {}): WhereOptions => {
  const filters: WhereOptions = {};

  const queryKeys = Object.keys(query);

  queryKeys.forEach((key) => {
    if (['page', 'results'].includes(key)) return;

    filters[`$${key}$`] = query[key];
  });

  return filters;
};
