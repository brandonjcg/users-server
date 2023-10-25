import fs from 'fs';
import path from 'path';
import instanceSequelize from '../config/sequelize.config';
import { getModels } from '../utils';

const modelsDir = path.join(__dirname, '.');
const modelFiles = fs.readdirSync(modelsDir);

const getModel = async (file: string) => {
  const module = await import(path.join(modelsDir, file));
  return module.default;
};

const promises = getModels(modelFiles).map(async (file) => getModel(file));

Promise.all(promises).then((models) => {
  models.forEach((model) => {
    if (model.associate) {
      model.associate(instanceSequelize.models);
    }
  });
}).then(() => {
  if (process.env.BD_SYNC === 'true') instanceSequelize.sync({ alter: true });
});

export default instanceSequelize;
