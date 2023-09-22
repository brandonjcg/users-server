const getModels = (
  modelFiles: string[] = [],
) => modelFiles.filter((file) => file !== 'index.ts');

export {
  // eslint-disable-next-line import/prefer-default-export
  getModels,
};
