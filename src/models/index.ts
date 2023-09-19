import instanceSequelize from '../config/sequelize.config';

import fs from 'fs';
import path from 'path';
import { getModels } from '../utils';

const modelsDir = path.join(__dirname, '.');
const modelFiles = fs.readdirSync(modelsDir);


const getModel = (file: string) => require(path.join(modelsDir, file)).default;

getModels(modelFiles).forEach((file) => {
  const model = getModel(file);
  model.initialize(instanceSequelize);
});

getModels(modelFiles).forEach((file) => {
  const model = getModel(file);
  if (model.associate) {
    model.associate(instanceSequelize.models);
  }
});

if (process.env.ENVIROMENT === 'dev') instanceSequelize.sync();

export default instanceSequelize;
