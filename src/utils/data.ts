export const getModels = (
    modelFiles: string[]
) => modelFiles.filter((file) => file !== 'index.ts');
