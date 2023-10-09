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
