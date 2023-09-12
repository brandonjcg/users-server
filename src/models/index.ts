import instanceSequelize from '../config/sequelize.config';

import fs from 'fs';
import path from 'path';

const modelsDir = path.join(__dirname, '.');
const modelFiles = fs.readdirSync(modelsDir);

const getModels = () => modelFiles.filter((file) => file.endsWith('.model.ts'));

const getModel = (file: string) => require(path.join(modelsDir, file)).default;

getModels().forEach((file) => {
  const model = getModel(file);
  model.initialize(instanceSequelize);
});

getModels().forEach((file) => {
  const model = getModel(file);
  if (model.associate) {
    model.associate(instanceSequelize.models);
  }
});

if (process.env.ENVIROMENT === 'dev') instanceSequelize.sync();

export default instanceSequelize;
